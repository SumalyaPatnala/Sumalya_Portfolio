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
          background: "#FFF7F0",
          color: "#292039",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
          }}
        >
          <div style={{ width: 72, height: 12, background: "#F5A0B8" }} />
          <div style={{ width: 72, height: 12, background: "#EF795F" }} />
          <div style={{ width: 72, height: 12, background: "#9A8BEA" }} />
          <div style={{ width: 72, height: 12, background: "#4CB9B1" }} />
          <div style={{ width: 72, height: 12, background: "#F6CA60" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#EF795F" }}>
            Sumalya Patnala · San Francisco Bay Area
          </div>
          <div style={{ marginTop: 18, fontSize: 58, lineHeight: 1.05, maxWidth: 980 }}>
            Building AI that can see, reason, and create.
          </div>
          <div style={{ marginTop: 22, fontSize: 24, color: "#5c5368", maxWidth: 920 }}>
            AI/ML Engineering · Computer Vision · Multimodal AI · Reliable Intelligent Systems
          </div>
          <div style={{ marginTop: 22, fontSize: 22, maxWidth: 920, color: "#292039" }}>
            I build the measurement and routing layers that keep agentic systems honest.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
