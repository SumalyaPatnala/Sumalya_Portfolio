import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c100e",
          color: "#4a8a6c",
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        SP
      </div>
    ),
    size,
  );
}
