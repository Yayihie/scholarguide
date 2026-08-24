import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { apiRequest } from "../lib/api";

interface GrowthRecord {
  id: number; studentId: number; subject: string; quarter: number;
  beforeStatus: string; afterStatus: string; trendData: string | null; createdAt: string;
}

export default function GrowthDashboard() {
  const [growthData, setGrowthData] = useState<GrowthRecord[]>([]);
  const [studentName, setStudentName] = useState("Student");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const students = await apiRequest("/students");
        if (students.length > 0) {
          setStudentName(students[0].firstName);
          const growth = await apiRequest(`/students/${students[0].id}/growth`);
          setGrowthData(growth);
          if (growth.length > 0) setSelectedSubject(growth[0].subject);
        }
      } catch {
        setGrowthData([
          { id: 1, studentId: 1, subject: "Reading", quarter: 1, beforeStatus: "Below Grade Level", afterStatus: "On Track", trendData: null, createdAt: new Date().toISOString() },
          { id: 2, studentId: 1, subject: "Reading", quarter: 2, beforeStatus: "On Track", afterStatus: "On Track", trendData: null, createdAt: new Date().toISOString() },
          { id: 3, studentId: 1, subject: "Reading", quarter: 3, beforeStatus: "On Track", afterStatus: "Above Grade Level", trendData: null, createdAt: new Date().toISOString() },
        ]);
        setSelectedSubject("Reading");
        setStudentName("Emma");
      }
    }
    load();
  }, []);

  const subjects = [...new Set(growthData.map((g) => g.subject))];
  const subjectData = growthData.filter((g) => g.subject === selectedSubject);

  function renderGrowthCard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = 1080, H = 1080;
    canvas.width = W; canvas.height = H;

    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#533afd");
    grad.addColorStop(1, "#7c3aed");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(60, 60, W - 120, H - 120, 30);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Growth Story", W / 2, 160);

    ctx.font = "bold 72px sans-serif";
    ctx.fillText(studentName, W / 2, 280);

    ctx.font = "36px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText(selectedSubject, W / 2, 340);

    if (subjectData.length === 0) { ctx.fillText("No data yet", W / 2, H / 2); return; }

    const first = subjectData[0];
    const last = subjectData[subjectData.length - 1];

    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "#fca5a5";
    ctx.textAlign = "left";
    ctx.fillText("Before:", 150, 480);
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(first.beforeStatus, 150, 530);

    ctx.textAlign = "right";
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "#86efac";
    ctx.fillText("Now:", W - 150, 480);
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(last.afterStatus, W - 150, 530);

    if (subjectData.length > 1) {
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      const startX = 200, endX = W - 200;
      const stepX = (endX - startX) / (subjectData.length - 1);
      const baseY = 700, amplitude = 80;
      subjectData.forEach((record, i) => {
        const x = startX + i * stepX;
        let y = baseY;
        if (record.afterStatus.includes("Below")) y = baseY + amplitude;
        else if (record.afterStatus.includes("Above")) y = baseY - amplitude;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.fillStyle = "white";
      subjectData.forEach((record, i) => {
        const x = startX + i * stepX;
        let y = baseY;
        if (record.afterStatus.includes("Below")) y = baseY + amplitude;
        else if (record.afterStatus.includes("Above")) y = baseY - amplitude;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    ctx.font = "28px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.textAlign = "center";
    ctx.fillText("Tracked with ScholarGuide", W / 2, H - 100);

    canvas.toBlob((blob) => {
      if (blob) setDownloadUrl(URL.createObjectURL(blob));
    }, "image/png");
  }

  function handleDownload() {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${studentName}-${selectedSubject}-growth.png`;
    a.click();
  }

  return (
    <>
      <Helmet>
        <title>Growth Dashboard — ScholarGuide</title>
        <meta name="description" content="Track your child's quarter-over-quarter growth across subjects." />
      </Helmet>
      <div className="sg-container" style={{ padding: "32px 16px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "24px", color: "var(--text)" }}>Growth Dashboard</h1>

        {subjects.length > 0 && (
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            {subjects.map((s) => (
              <button key={s} onClick={() => setSelectedSubject(s)}
                className="clay-card clay-card-hover"
                style={{
                  padding: "8px 16px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
                  background: selectedSubject === s ? "var(--primary)" : "#fff",
                  color: selectedSubject === s ? "#fff" : "var(--text)",
                }}>{s}</button>
            ))}
          </div>
        )}

        {subjectData.length > 0 ? (
          <div className="clay-card" style={{ padding: "24px", marginBottom: "24px", overflowX: "auto" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px", color: "var(--text)" }}>
              {studentName}'s {selectedSubject} Growth
            </h2>
            <table style={{ width: "100%", fontSize: "14px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid var(--border)" }}>
                  <th style={{ padding: "8px 0" }}>Quarter</th>
                  <th style={{ padding: "8px 0" }}>Before</th>
                  <th style={{ padding: "8px 0" }}>After</th>
                </tr>
              </thead>
              <tbody>
                {subjectData.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "8px 0", fontWeight: 600 }}>Q{r.quarter}</td>
                    <td style={{ padding: "8px 0" }}>
                      <span className="badge-pill" style={{ background: "rgba(234,34,97,0.1)", color: "var(--ruby)", fontSize: "12px", padding: "4px 10px" }}>{r.beforeStatus}</span>
                    </td>
                    <td style={{ padding: "8px 0" }}>
                      <span className="badge-pill" style={{
                        background: r.afterStatus.includes("Above") ? "var(--accent-blue)" : r.afterStatus.includes("Below") ? "rgba(234,34,97,0.1)" : "var(--accent-mint)",
                        color: r.afterStatus.includes("Above") ? "var(--primary)" : r.afterStatus.includes("Below") ? "var(--ruby)" : "var(--success-text)",
                        fontSize: "12px", padding: "4px 10px",
                      }}>{r.afterStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>No growth data yet. Take a diagnostic to start tracking.</p>
        )}

        <div className="clay-card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", color: "var(--text)" }}>Shareable Growth Story</h2>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px" }}>
            Download a shareable image showing {studentName}'s growth. First name only — no personal data leaves the app.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={renderGrowthCard} className="btn-primary" style={{ fontSize: "15px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Generate Image
            </button>
            {downloadUrl && (
              <button onClick={handleDownload} className="btn-secondary" style={{ fontSize: "15px" }}>
                Download PNG
              </button>
            )}
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      </div>
    </>
  );
}
