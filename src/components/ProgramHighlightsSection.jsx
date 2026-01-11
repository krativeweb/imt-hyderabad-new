"use client";

export default function ProgramHighlightsSection({ highlightsHtml }) {
  if (!highlightsHtml) return null;

  return (
    <section className="py-5" style={{ background: "#0f265a" }}>
      <div className="container">
        {/* Section Title – keep static */}
        <h2 className="text-center fw-bold mb-5 text-warning">
          PROGRAM HIGHLIGHTS
        </h2>

        {/* ✅ CMS-controlled highlights */}
        <div
          dangerouslySetInnerHTML={{ __html: highlightsHtml }}
        />
      </div>
    </section>
  );
}
