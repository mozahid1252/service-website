// Image quality enhancement script.
// - No AI generation/editing. Pure traditional image processing via libvips.
// - Upscale 2x with Lanczos3 (high-quality interpolation, no hallucination).
// - Reduce JPEG compression artifacts via subtle median denoise.
// - Refine detail with gentle unsharp mask (no halos).
// - Re-encode at higher quality than the original AI-generated JPEGs.
// - Preserve aspect ratio, filename, and displayed dimensions (CSS unchanged).
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '..', 'public', 'images');

const TARGETS = [
  // JPEGs — AI-generated backgrounds, currently 1344x768, ~q80 compression
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    file: `qp-bg-${n}.jpg`,
    type: 'jpeg',
    scale: 2,
    jpegQuality: 92,
    denoise: true,
    sharpenSigma: 0.6,
    sharpenAmount: 0.55,
  })),
  // PNG — About section photo (672x1209, RGBA)
  {
    file: 'photo1.png',
    type: 'png',
    scale: 2,
    pngCompression: 9,
    pngPalette: false,
    denoise: true,
    sharpenSigma: 0.7,
    sharpenAmount: 0.5,
  },
  // PNG — Logo (512x512 colormap). Only mild sharpen — upscaling a flat
  // colormap won't add detail but will keep it crisp on retina. No denoise
  // (already lossless).
  {
    file: 'logo.png',
    type: 'png',
    scale: 2,
    pngCompression: 9,
    pngPalette: true,
    pngQuality: 100,
    denoise: false,
    sharpenSigma: 0.4,
    sharpenAmount: 0.3,
  },
];

async function enhance(target) {
  const src = path.join(IMG_DIR, target.file);
  const tmp = path.join(IMG_DIR, target.file + '.enhanced.tmp');

  const meta = await sharp(src).metadata();
  const newW = meta.width * target.scale;
  const newH = meta.height * target.scale;

  let pipeline = sharp(src, { sequentialRead: true });

  // Step 1 — upscale 2x with Lanczos3 (best sinc-based interpolation, no AI)
  pipeline = pipeline.resize({
    width: newW,
    height: newH,
    fit: 'fill',
    kernel: 'lanczos3',
    withoutEnlargement: false,
  });

  // Step 2 — reduce compression/AI artifacts (subtle 3x3 median smoothing)
  if (target.denoise) {
    pipeline = pipeline.median(1);
  }

  // Step 3 — gentle unsharp mask (clarity/detail) tuned to avoid halos
  pipeline = pipeline.sharpen({
    sigma: target.sharpenSigma,
    m1: 0.5,  // amount for flat areas (subtle)
    m2: target.sharpenAmount,  // amount for edges/jagged areas
    l1: 0.02,
    l2: 0.04,
  });

  // Step 4 — re-encode at high quality
  if (target.type === 'jpeg') {
    pipeline = pipeline.jpeg({
      quality: target.jpegQuality,
      progressive: true,
      mozjpeg: true,  // better compression + quality than libjpeg
      chromaSubsampling: '4:2:0',  // standard, keeps color fidelity
    });
  } else {
    pipeline = pipeline.png({
      compressionLevel: target.pngCompression,
      palette: target.pngPalette || false,
      quality: target.pngQuality || 90,
      effort: 10,
    });
  }

  await pipeline.toFile(tmp);

  // Validate output before swapping
  const outMeta = await sharp(tmp).metadata();
  if (outMeta.width !== newW || outMeta.height !== newH) {
    throw new Error(`Dimension mismatch for ${target.file}: expected ${newW}x${newH}, got ${outMeta.width}x${outMeta.height}`);
  }
  fs.renameSync(tmp, src);

  return { file: target.file, oldSize: meta.width + 'x' + meta.height, newSize: outMeta.width + 'x' + outMeta.height };
}

(async () => {
  console.log('=== Image Enhancement (traditional processing, no AI) ===\n');
  for (const t of TARGETS) {
    try {
      const before = fs.statSync(path.join(IMG_DIR, t.file)).size;
      const r = await enhance(t);
      const after = fs.statSync(path.join(IMG_DIR, t.file)).size;
      console.log(`  ✓ ${r.file}: ${r.oldSize} → ${r.newSize}  |  ${before} → ${after} bytes`);
    } catch (e) {
      console.error(`  ✗ ${t.file}: ${e.message}`);
      process.exit(1);
    }
  }
  console.log('\n=== All images enhanced ===');
})();
