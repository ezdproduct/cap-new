"use client";

import { useState } from "react";
import { WP_API_ENDPOINTS } from "@/lib/wp-api-endpoints";

export default function ApiTestPage() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const callApi = async (url: string, method: string) => {
    setLoading(true);
    setResponse("");
    
    let processedUrl = url;
    const placeholders = url.match(/{\w+}/g);

    if (placeholders) {
      for (const placeholder of placeholders) {
        const key = placeholder.replace(/[{}]/g, "");
        const value = prompt(`Enter value for "${key}":`);
        if (value === null) {
          setLoading(false);
          return;
        }
        processedUrl = processedUrl.replace(placeholder, value);
      }
    }

    const fullUrl = "https://course.learnwithcap.com" + processedUrl;
    setCurrentUrl(fullUrl);

    const AUTH_HEADER = "Basic a2V5XzkxZGFhNTIyZjU1ZjZiNDFiYzdlZmE3Mzk1MWY4ZDU2OnNlY3JldF9lNjJmYTc2MDNlNjFhN2ZkM2YyZWQ1NWJmZjdkNDExZmUxZmE2MzU5MWNlY2ZmZWFlYjU1ZDg5NDkwYzk1MzEy";

    try {
      const res = await fetch(fullUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": AUTH_HEADER,
        },
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setResponse(e.toString());
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", color: "#333" }}>
      <h1 style={{ borderBottom: "1px solid #eee", paddingBottom: 10 }}>LearnWithCap – API Test Console</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {WP_API_ENDPOINTS.map((group) => (
          <div key={group.group} style={{ background: "#f9f9f9", padding: 20, borderRadius: 8, border: "1px solid #eee" }}>
            <h2 style={{ marginTop: 0, borderBottom: "1px solid #ddd", paddingBottom: 8, marginBottom: 16 }}>{group.group}</h2>
            {group.endpoints.map((ep) => (
              <button
                key={ep.name}
                onClick={() => callApi(ep.url, ep.method)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  margin: "8px 0",
                  padding: "10px 15px",
                  background: "#002A4C",
                  color: "white",
                  borderRadius: 6,
                  cursor: "pointer",
                  border: "none",
                  fontSize: 14,
                }}
              >
                <span style={{ background: ep.method === 'GET' ? '#59B4E9' : '#671D9D', padding: '2px 6px', borderRadius: 4, marginRight: 8, fontSize: 12 }}>{ep.method}</span>
                {ep.name}
              </button>
            ))}
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40 }}>Kết Quả:</h2>
      {loading && <div>⏳ Loading...</div>}
      {currentUrl && !loading && <p style={{ fontSize: 12, color: '#666', wordBreak: 'break-all' }}>URL: <code>{currentUrl}</code></p>}
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 20,
          borderRadius: 10,
          marginTop: 10,
          maxHeight: 600,
          overflow: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all"
        }}
      >
        {response || "Response will be shown here..."}
      </pre>
    </div>
  );
}