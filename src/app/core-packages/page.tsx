import fs from "fs";
import path from "path";
import LandingContent from "./landing-content";
import "./landing.css";

export default function CorePackagesPage() {
  const bodyHtml = fs.readFileSync(
    path.join(process.cwd(), "src", "app", "core-packages", "landing-body.html"),
    "utf-8"
  );
  const scriptCode = fs.readFileSync(
    path.join(process.cwd(), "src", "app", "core-packages", "landing-script.js"),
    "utf-8"
  );

  return <LandingContent bodyHtml={bodyHtml} scriptCode={scriptCode} />;
}
