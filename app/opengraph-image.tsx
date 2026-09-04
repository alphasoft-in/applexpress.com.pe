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
            padding: "12px 32px",
            borderRadius: "9999px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            fontSize: "24px",
            fontWeight: "600",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#a1a1aa",
            marginBottom: "40px",
          }}
        >
          Importados de EE.UU.
        </div>

        {/* Main Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "120px",
              fontWeight: "900",
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
              background: "linear-gradient(180deg, #ffffff 40%, #a1a1aa 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Apple Express
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: "700",
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Perú
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: "500",
            color: "#86868b",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: "1.4",
            marginBottom: "40px",
          }}
        >
          MacBook Pro · iPhone 15 · iPad Pro · AirPods
        </div>

        {/* Bottom footer bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "24px",
            color: "#52525b",
          }}
        >
          <span>appleexpress.com.pe</span>
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