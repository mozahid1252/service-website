export default function Page() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: 500, padding: '40px' }}>
        <div style={{ width: 56, height: 56, background: '#FEF3C7', color: '#D97706', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 24 }}>
          <i className="fa-solid fa-microscope" />
        </div>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>Deep Health Check Audit</h1>
        <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.6, marginBottom: 24 }}>Comprehensive Business Diagnostic. Full details for this page are being prepared.</p>
        <a href="/health-check" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#059669', color: '#FFF', borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
          <i className="fa-solid fa-arrow-left" /> Back to Health Check
        </a>
      </div>
    </div>
  );
}
