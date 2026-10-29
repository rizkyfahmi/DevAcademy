import { Metadata } from "next";
import { DocxDashboardView } from "@/components/docx/DocxDashboardView";

export const metadata: Metadata = {
  title: "Docx — HTML & Web Development Tutorial",
  description: "Dokumentasi dan tutorial lengkap HTML, CSS, JavaScript di DevAcademy — bebas iklan.",
};

export default function DashboardPage() {
  return <DocxDashboardView />;
}
