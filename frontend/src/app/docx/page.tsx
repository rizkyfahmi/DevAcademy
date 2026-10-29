import { Metadata } from "next";
import { DocxDashboardView } from "@/components/docx/DocxDashboardView";

export const metadata: Metadata = {
  title: "Docx — HTML Tutorial",
  description: "Comprehensive tutorials and documentation for HTML, CSS, JavaScript, and modern tech on DevAcademy — ad-free.",
};

export default function DocxPage() {
  return <DocxDashboardView />;
}
