import { useState, useRef, useEffect } from "react";

const MOCK_RECORDINGS = [
  {
    id: 1,
    title: "Kundali Analysis – Rahul Sharma",
    astrologer: "Pt. Vikram Joshi",
    client: "Rahul Sharma",
    date: "2025-06-08",
    duration: "38:12",
    topic: "Career & Finance",
    tags: ["career", "saturn-transit"],
    transcript: "Good morning Rahul ji. Let us begin with your Kundali chart. Your Lagna is Mesh (Aries) and Saturn currently transits your 10th house, which explains the career pressures you're facing. The period until August 2025 will be challenging but after that a strong Jupiter aspect will bring relief...",
    summary: "Saturn transit causing career delays. Jupiter relief after August 2025. Recommended red coral gemstone.",
    status: "transcribed",
    fileUrl: null,
  },
  {
    id: 2,
    title: "Marriage Compatibility – Priya & Arjun",
    astrologer: "Pandit Radheshyam Das",
    client: "Priya Kapoor",
    date: "2025-06-05",
    duration: "52:44",
    topic: "Marriage & Relationships",
    tags: ["marriage", "guna-milan"],
    transcript: "Namaste Priya ji. I have matched the horoscopes carefully. The Guna Milan score is 28 out of 36 which is excellent. However there is a mangal dosha in Arjun's chart at the 7th house. This can be remedied through proper puja rituals before marriage...",
    summary: "28/36 guna milan score. Mangal dosha present - remedy recommended. Auspicious marriage dates suggested.",
    status: "transcribed",
    fileUrl: null,
  },
  {
    id: 3,
    title: "Health Consultation – Sunita Devi",
    astrologer: "Pt. Vikram Joshi",
    client: "Sunita Devi",
    date: "2025-06-01",
    duration: "25:30",
    topic: "Health & Wellbeing",
    tags: ["health", "rahu-ketu"],
    transcript: "Sunita ji, looking at your chart I can see Rahu in the 6th house which often indicates chronic health concerns. The current Rahu dasha is activating these energies...",
    summary: "Rahu in 6th house causing health concerns. Diet and lifestyle changes suggested alongside remedies.",
    status: "transcribed",
    fileUrl: null,
  },
  {
    id: 4,
    title: "Business Muhurta – Tech Startup Launch",
    astrologer: "Jyotish Acharya Mahesh",
    client: "Amit Verma",
    date: "2025-05-28",
    duration: "41:05",
    topic: "Business & Finance",
    tags: ["muhurta", "business"],
    transcript: "",
    summary: "",
    status: "pending",
    fileUrl: null,
  },
];

const ASTROLOGERS = ["All Astrologers", "Pt. Vikram Joshi", "Pandit Radheshyam Das", "Jyotish Acharya Mahesh"];
const TOPICS = ["All Topics", "Career & Finance", "Marriage & Relationships", "Health & Wellbeing", "Business & Finance"];

function StatusBadge({ status }) {
  const styles = {
    transcribed: { background: "#e9f8f0", color: "#1a7a4a", label: "✓ Transcribed" },
    pending: { background: "#fff4e5", color: "#b45309", label: "⏳ Pending" },
    processing: { background: "#eff6ff", color: "#1d4ed8", label: "⚙ Processing" },
  };
  const s = styles[status] || styles.pending;
  return (
    <span style={{ background: s.background, color: s.color, fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20, letterSpacing: 0.2 }}>
      {s.label}
    </span>
  );
}

function TranscriptModal({ recording, onClose, onTranscribe }) {
  const [transcribing, setTranscribing] = useState(false);
  const [localTranscript, setLocalTranscript] = useState(recording.transcript);
  const [localSummary, setLocalSummary] = useState(recording.summary);

  const handleTranscribe = async () => {
    setTranscribing(true);
    await onTranscribe(recording.id);
    setTranscribing(false);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 680, maxHeight: "85vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 48px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f0ede8", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "#1a1612" }}>{recording.title}</h2>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#7c7568" }}>{recording.astrologer} · {recording.date} · {recording.duration}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9c9488", lineHeight: 1, padding: "0 4px" }}>×</button>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: 24 }}>
          {recording.status !== "transcribed" ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎙</div>
              <p style={{ color: "#7c7568", marginBottom: 20 }}>No transcript yet for this recording.</p>
              <button onClick={handleTranscribe} disabled={transcribing} style={{ background: "#c8411a", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: transcribing ? "not-allowed" : "pointer", opacity: transcribing ? 0.7 : 1 }}>
                {transcribing ? "Transcribing with AI..." : "Generate Transcript with AI"}
              </button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#9c7a2a", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>AI Summary</h3>
                <div style={{ background: "#fffbf0", border: "1px solid #f5e4b0", borderRadius: 10, padding: "14px 16px", fontSize: 14, lineHeight: 1.7, color: "#4a3a12" }}>
                  {localSummary || "No summary available."}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#9c7a2a", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Full Transcript</h3>
                <div style={{ background: "#fafaf8", border: "1px solid #ece9e2", borderRadius: 10, padding: "14px 16px", fontSize: 14, lineHeight: 1.8, color: "#2a2520", fontFamily: "Georgia, serif" }}>
                  {localTranscript}
                </div>
              </div>
            </>
          )}
        </div>
        <div style={{ padding: "14px 24px", borderTop: "1px solid #f0ede8", display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #d8d3cc", borderRadius: 8, padding: "8px 18px", fontSize: 13, cursor: "pointer", color: "#4a4440" }}>Close</button>
          {recording.status === "transcribed" && (
            <button style={{ background: "#c8411a", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Export PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function UploadModal({ onClose, onUpload }) {
  const [form, setForm] = useState({ title: "", astrologer: "", client: "", topic: "Career & Finance", tags: "" });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleSubmit = async () => {
    if (!form.title || !form.astrologer || !form.client) return alert("Please fill all required fields.");
    setUploading(true);
    await new Promise(r => setTimeout(r, 1200));
    onUpload({ ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean), file });
    setUploading(false);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520, overflow: "hidden", boxShadow: "0 24px 48px rgba(0,0,0,0.15)" }}>
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f0ede8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>Upload New Recording</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9c9488" }}>×</button>
        </div>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <div onClick={() => fileRef.current.click()} style={{ border: "2px dashed #d8cfc4", borderRadius: 10, padding: "28px", textAlign: "center", cursor: "pointer", background: file ? "#f0fdf4" : "#fafaf8" }}>
            <input ref={fileRef} type="file" accept="audio/*,video/*" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
            <div style={{ fontSize: 32 }}>{file ? "🎧" : "📁"}</div>
            <p style={{ margin: "8px 0 0", fontSize: 13, color: file ? "#166534" : "#7c7568" }}>
              {file ? file.name : "Click to upload audio or video file"}
            </p>
          </div>
          {[
            { key: "title", label: "Session Title *", placeholder: "e.g. Career Consultation – Amit Sharma" },
            { key: "astrologer", label: "Astrologer Name *", placeholder: "e.g. Pt. Vikram Joshi" },
            { key: "client", label: "Client Name *", placeholder: "e.g. Rahul Verma" },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#7c7568", display: "block", marginBottom: 4 }}>{f.label}</label>
              <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                style={{ width: "100%", padding: "9px 12px", border: "1px solid #d8d3cc", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#7c7568", display: "block", marginBottom: 4 }}>Topic</label>
            <select value={form.topic} onChange={e => setForm(p => ({ ...p, topic: e.target.value }))}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #d8d3cc", borderRadius: 8, fontSize: 14, background: "#fff" }}>
              {["Career & Finance", "Marriage & Relationships", "Health & Wellbeing", "Business & Finance", "Education", "Spirituality"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#7c7568", display: "block", marginBottom: 4 }}>Tags (comma-separated)</label>
            <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="e.g. saturn-transit, career, gemstone"
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #d8d3cc", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
        <div style={{ padding: "14px 24px", borderTop: "1px solid #f0ede8", display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #d8d3cc", borderRadius: 8, padding: "9px 18px", fontSize: 13, cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSubmit} disabled={uploading} style={{ background: uploading ? "#e89070" : "#c8411a", color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: uploading ? "not-allowed" : "pointer" }}>
            {uploading ? "Uploading..." : "Upload & Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RecordingCard({ rec, onClick }) {
  const topicColors = {
    "Career & Finance": "#fff4e5",
    "Marriage & Relationships": "#fdf2f8",
    "Health & Wellbeing": "#f0fdf4",
    "Business & Finance": "#eff6ff",
  };
  return (
    <div onClick={onClick} style={{ background: "#fff", border: "1px solid #ece9e2", borderRadius: 12, padding: "16px 20px", cursor: "pointer", transition: "box-shadow 0.15s", position: "relative" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#1a1612", lineHeight: 1.4, flex: 1, paddingRight: 12 }}>{rec.title}</h3>
        <StatusBadge status={rec.status} />
      </div>
      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#7c7568", marginBottom: 10 }}>
        <span>🕉 {rec.astrologer}</span>
        <span>👤 {rec.client}</span>
        <span>📅 {rec.date}</span>
        <span>⏱ {rec.duration}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ background: topicColors[rec.topic] || "#f5f5f5", color: "#4a4440", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{rec.topic}</span>
        {rec.tags.map(tag => (
          <span key={tag} style={{ background: "#f0ede8", color: "#6b6258", fontSize: 11, padding: "3px 8px", borderRadius: 20 }}>#{tag}</span>
        ))}
      </div>
      {rec.summary && (
        <p style={{ margin: "10px 0 0", fontSize: 12, color: "#7c7568", lineHeight: 1.5, borderTop: "1px solid #f5f2ed", paddingTop: 10 }}>
          {rec.summary.slice(0, 120)}...
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [recordings, setRecordings] = useState(MOCK_RECORDINGS);
  const [search, setSearch] = useState("");
  const [filterAstrologer, setFilterAstrologer] = useState("All Astrologers");
  const [filterTopic, setFilterTopic] = useState("All Topics");
  const [selected, setSelected] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [activeTab, setActiveTab] = useState("recordings");

  const filtered = recordings.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.title.toLowerCase().includes(q) || r.client.toLowerCase().includes(q) || r.astrologer.toLowerCase().includes(q) || r.tags.some(t => t.includes(q));
    const matchAstro = filterAstrologer === "All Astrologers" || r.astrologer === filterAstrologer;
    const matchTopic = filterTopic === "All Topics" || r.topic === filterTopic;
    return matchSearch && matchAstro && matchTopic;
  });

  const stats = {
    total: recordings.length,
    transcribed: recordings.filter(r => r.status === "transcribed").length,
    pending: recordings.filter(r => r.status === "pending").length,
    astrologers: [...new Set(recordings.map(r => r.astrologer))].length,
  };

  const handleUpload = (data) => {
    const newRec = {
      id: Date.now(),
      title: data.title,
      astrologer: data.astrologer,
      client: data.client,
      date: new Date().toISOString().slice(0, 10),
      duration: "00:00",
      topic: data.topic,
      tags: data.tags,
      transcript: "",
      summary: "",
      status: "pending",
      fileUrl: data.file ? URL.createObjectURL(data.file) : null,
    };
    setRecordings(prev => [newRec, ...prev]);
    setShowUpload(false);
  };

  const handleTranscribe = async (id) => {
    await new Promise(r => setTimeout(r, 2000));
    setRecordings(prev => prev.map(r => r.id === id ? {
      ...r,
      status: "transcribed",
      transcript: "AI-generated transcript: The consultation began with an analysis of the client's Kundali. The astrologer identified key planetary positions and their influences. Specific remedies and timing recommendations were discussed in detail.",
      summary: "AI-generated summary: Key findings discussed. Planetary remedies recommended. Follow-up consultation suggested in 3 months."
    } : r));
    setSelected(prev => prev ? { ...prev, status: "transcribed", transcript: "AI-generated transcript: The consultation began with an analysis of the client's Kundali...", summary: "AI-generated summary: Key findings discussed." } : null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f4f0", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#1a1612", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>🕉</span>
          <div>
            <span style={{ color: "#f0e8d8", fontWeight: 700, fontSize: 16, letterSpacing: 0.3 }}>Humara Pandit</span>
            <span style={{ color: "#7c6e5a", fontSize: 12, marginLeft: 8 }}>Consultation Manager</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["recordings", "analytics"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab === tab ? "#c8411a" : "transparent", color: activeTab === tab ? "#fff" : "#9c8e7c", border: "none", borderRadius: 8, padding: "6px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", textTransform: "capitalize" }}>
              {tab}
            </button>
          ))}
        </div>
        <button style={{ background: "#5a5048", color: "#cfc6ba", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "not-allowed", display: "flex", alignItems: "center", gap: 6 }}>
          + Upload Recording (Coming Soon)
        </button>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 24px" }}>
        {activeTab === "recordings" ? (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Total Recordings", value: stats.total, color: "#c8411a" },
                { label: "Transcribed", value: stats.transcribed, color: "#166534" },
                { label: "Pending", value: stats.pending, color: "#b45309" },
                { label: "Astrologers", value: stats.astrologers, color: "#1e40af" },
              ].map(s => (
                <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", border: "1px solid #ece9e2" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#7c7568", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Search & Filters */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by client, astrologer, topic, tag..."
                style={{ flex: 1, padding: "10px 14px", border: "1px solid #d8d3cc", borderRadius: 10, fontSize: 14, background: "#fff", outline: "none" }} />
              <select value={filterAstrologer} onChange={e => setFilterAstrologer(e.target.value)}
                style={{ padding: "10px 14px", border: "1px solid #d8d3cc", borderRadius: 10, fontSize: 13, background: "#fff", cursor: "pointer" }}>
                {ASTROLOGERS.map(a => <option key={a}>{a}</option>)}
              </select>
              <select value={filterTopic} onChange={e => setFilterTopic(e.target.value)}
                style={{ padding: "10px 14px", border: "1px solid #d8d3cc", borderRadius: 10, fontSize: 13, background: "#fff", cursor: "pointer" }}>
                {TOPICS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Recordings List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#9c9488" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                  <p>No recordings found. Try adjusting your filters.</p>
                </div>
              ) : filtered.map(rec => (
                <RecordingCard key={rec.id} rec={rec} onClick={() => setSelected(rec)} />
              ))}
            </div>
          </>
        ) : (
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #ece9e2", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
            <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600, color: "#1a1612" }}>Analytics — Under Construction</h2>
            <p style={{ color: "#7c7568", fontSize: 13 }}>This section is still being built. Check back in a future update.</p>
          </div>
        )}
      </div>

      {selected && <TranscriptModal recording={selected} onClose={() => setSelected(null)} onTranscribe={handleTranscribe} />}
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onUpload={handleUpload} />}
    </div>
  );
}
