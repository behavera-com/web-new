import { ImageResponse } from "next/og";

export const alt =
  "Behavera + StartupJobs — AI transformace neselhává kvůli technologii. Selhává kvůli adopci.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fbfafd",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#1c1237",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background:
              "linear-gradient(90deg, #2d1b69 0%, #8b5cf6 60%, #2ddba6 100%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#1c1237",
              display: "flex",
            }}
          >
            Behavera
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#6b6680",
              display: "flex",
            }}
          >
            ×
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "#1c1237",
              display: "flex",
            }}
          >
            StartupJobs
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#6b6680",
              display: "flex",
              marginLeft: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            · AI Readiness
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              color: "#1c1237",
              maxWidth: 1040,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>AI transformace neselhává</span>
            <span style={{ color: "#2d1b69" }}>
              kvůli technologii. Selhává kvůli adopci.
            </span>
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#4b5563",
              lineHeight: 1.35,
              maxWidth: 940,
              display: "flex",
            }}
          >
            Zjistěte, kdo AI používá, kdo tápá a kde už dnes vytváří hodnotu —
            než utratíte další korunu za licence.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: "1px solid #e5e1f2",
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#1c1237",
              fontWeight: 600,
              display: "flex",
            }}
          >
            startupjobs.behavera.com/ai-readiness
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              background: "#1c1237",
              color: "#fbfafd",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Domluvit konzultaci →
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
