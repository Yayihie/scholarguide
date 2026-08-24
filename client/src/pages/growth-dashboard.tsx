// client/src/pages/growth-dashboard.tsx — Growth dashboard with shareable growth story graphic
// Priority 2b: Canvas-based image export showing quarter-over-quarter growth.
// Privacy: first-name-only, no last name, no birthdate, no school/district.
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { apiRequest } from "../lib/api";

interface GrowthRecord {
  id: number;
  studentId: number;
  subject: string;
  quarter: number;
  beforeStatus: string;
  afterStatus: string;
  trendData: string | null;
  createdAt: string;
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
        // Not logged in or no data — show demo data
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

  // Render the shareable growth story card to canvas
  function renderGrowthCard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#4f46e5");
    grad.addColorStop(1, "#7c3aed");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Card background
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.roundRect(60, 60, W - 120, H - 120, 30);
    ctx.fill();

    // Title
    ctx.fillStyle = "white";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Growth Story", W / 2, 160);

    // Student first name only — privacy
    ctx.font = "bold 72px sans-serif";
    ctx.fillText(studentName, W / 2, 280);

    // Subject
    ctx.font = "36px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText(selectedSubject, W / 2, 340);

    if (subjectData.length === 0) {
      ctx.font = "28px sans-serif";
      ctx.fillText("No data yet", W / 2, H / 2);
      return;
    }

    // Before/after badges
    const first = subjectData[0];
    const last = subjectData[subjectData.length - 1];

    // Before
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "#fca5a5";
    ctx.textAlign = "left";
    ctx.fillText("Before:", 150, 480);
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(first.beforeStatus, 150, 530);

    // After
    ctx.textAlign = "right";
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "#86efac";
    ctx.fillText("Now:", W - 150, 480);
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(last.afterStatus, W - 150, 530);

    // Trend line — simple sparkline showing quarters
    if (subjectData.length > 1) {
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      const startX = 200;
      const endX = W - 200;
      const stepX = (endX - startX) / (subjectData.length - 1);
      const baseY = 700;
      const amplitude = 80;

      subjectData.forEach((record, i) => {
        const x = startX + i * stepX;
        // Map status to y position: below = high y, above = low y
        let y = baseY;
        if (record.afterStatus.includes("Below")) y = baseY + amplitude;
        else if (record.afterStatus.includes("Above")) y = baseY - amplitude;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Dots
      ctx.fillStyle = "white";
      subjectData.forEach((record, i) => {
        const x = startX + i * stepX;
        let y = baseY;
        if (record.afterStatus.includes("Below")) y = baseY + amplitude;
        else if (record.afterStatus.includes("Above")) y = baseY - amplitude;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Quarter label
        ctx.font = "24px sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.7)";
      });
    }

    // Footer
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.textAlign = "center";
    ctx.fillText("Tracked with ScholarGuide", W / 2, H - 100);

    // Convert to download URL
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
      }
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

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Growth Dashboard</h1>

        {/* Subject selector */}
        {subjects.length > 0 && (
          <div className="flex gap-2 mb-6">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedSubject === s ? "bg-indigo-600 text-white" : "bg-white border border-gray-300"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Growth table */}
        {subjectData.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">{studentName}'s {selectedSubject} Growth</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-2">Quarter</th>
                  <th className="pb-2">Before</th>
                  <th className="pb-2">After</th>
                </tr>
              </thead>
              <tbody>
                {subjectData.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100">
                    <td className="py-2">Q{r.quarter}</td>
                    <td className="py-2">
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700">{r.beforeStatus}</span>
                    </td>
                    <td className="py-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${r.afterStatus.includes("Above") ? "bg-blue-100 text-blue-700" : r.afterStatus.includes("Below") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{r.afterStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">No growth data yet. Take a diagnostic to start tracking.</p>
        )}

        {/* Shareable growth story graphic — Priority 2b */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Shareable Growth Story</h2>
          <p className="text-sm text-gray-500 mb-4">
            Download a shareable image showing {studentName}'s growth. First name only — no personal data leaves the app.
          </p>
          <button
            onClick={renderGrowthCard}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 mb-4"
          >
            Generate Image
          </button>
          {downloadUrl && (
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 ml-2"
            >
              Download PNG
            </button>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </>
  );
}
