import { ImageResponse } from "next/og";

export const alt = "Sumalya Patnala · AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c100e",
          color: "#f3efe6",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#e0b07a" }}>
          San Francisco Bay Area
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, lineHeight: 1.05 }}>Sumalya Patnala</div>
          <div style={{ marginTop: 18, fontSize: 28, color: "#c9844a" }}>
            AI/ML Engineer · Research Engineering · AI Systems
          </div>
          <div style={{ marginTop: 28, fontSize: 28, maxWidth: 900, color: "#b7b3a6" }}>
            I build the measurement and routing layers that keep agentic systems honest.
          </div>
          <div style={{ marginTop: 16, fontSize: 22, maxWidth: 900, color: "#4a8a6c" }}>
            Advance intelligence. Respect its footprint. Improve what comes next.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
