import { ImageResponse } from "next/og";

export const alt = "Apple Express Perú — Importadora de Tecnología Apple";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage: "radial-gradient(circle at 50% 30%, #1a1a2e 0%, #000000 70%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Subtle border glow */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            borderRadius: "32px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        />

        {/* Top pill badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 20px",
            borderRadius: "9999px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#86868b",
            marginBottom: "28px",
          }}
        >
          Importados desde EE.UU. · Garantía Total
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            textAlign: "center",
            lineHeight: "1.08",
            marginBottom: "20px",
            background: "linear-gradient(180deg, #ffffff 40%, #a1a1aa 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Apple Express Perú
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: "500",
            color: "#86868b",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: "1.4",
            marginBottom: "40px",
          }}
        >
          MacBook Pro · iPhone 15 · iPad Pro · Apple Watch · AirPods
        </div>

        {/* Bottom footer bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "15px",
            color: "#52525b",
          }}
        >
          <span>applexpress-com-pe.vercel.app</span>
          <span>•</span>
          <span>Lima, Perú</span>
          <span>•</span>
          <span>Envíos a todo el país</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}