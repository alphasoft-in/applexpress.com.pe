import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Apple Express Perú — Importadora de Tecnología Apple";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Leemos la imagen estática subida para inyectarla en la respuesta dinámica
  const logoPath = join(process.cwd(), "public", "logo.png");
  const logoBuffer = readFileSync(logoPath);
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

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
        }}
      >
        <img 
          src={logoSrc} 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "contain" 
          }} 
        />
      </div>
    ),
    {
      ...size,
    }
  );
}