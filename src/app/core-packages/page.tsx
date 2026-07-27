import fs from "fs";
import path from "path";
import "./landing.css";

export default function CorePackagesPage() {
  const bodyPath = path.join(
    process.cwd(),
    "src",
    "app",
    "core-packages",
    "landing-body.html"
  );
  const bodyHtml = fs.readFileSync(bodyPath, "utf-8");

  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
