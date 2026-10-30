import fs from "fs";
import path from "path";
import LandingContent from "./landing-content";
import "./landing.css";

export default function Page() {
  const bodyHtml = fs.readFileSync(
    path.join(process.cwd(), "src", "app", "operations-efficiency-audit", "landing-body.html"),
    "utf-8"
  );
  const scriptCode = fs.readFileSync(
    path.join(process.cwd(), "src", "app", "operations-efficiency-audit", "landing-script.js"),
    "utf-8"
  );

  return <LandingContent bodyHtml={bodyHtml} scriptCode={scriptCode} />;
}
