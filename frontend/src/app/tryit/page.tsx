import { Suspense } from "react";
import { TryitEditorClient } from "@/components/tryit/TryitEditorClient";

export const metadata = {
  title: "Try it Yourself Editor — DevAcademy",
  description: "Interactive online code editor for HTML, CSS, JavaScript, Python, SQL, Java, C, C++, PHP, and more.",
};

export default function TryitPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0f172a",
            color: "#38bdf8",
            fontFamily: "monospace",
          }}
        >
          Loading DevAcademy Tryit Editor...
        </div>
      }
    >
      <TryitEditorClient />
    </Suspense>
  );
}
