"use client";

import { useState } from "react";
import { WP_API_ENDPOINTS } from "@/lib/endpoints";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const BASE_URL = "https://course.learnwithcap.com";

export default function ApiTestPage() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const callApi = async (url: string, method: string) => {
    let finalUrl = url;
    
    // Basic placeholder replacement
    if (url.includes("{id}")) {
      const id = prompt("Enter ID for the endpoint:", "1");
      if (!id) return;
      finalUrl = url.replace("{id}", id);
    }
     if (url.includes("{user_id}")) {
      const id = prompt("Enter User ID:", "1");
      if (!id) return;
      finalUrl = url.replace("{user_id}", id);
    }
    // Add more replacements as needed

    const fullUrl = BASE_URL + finalUrl;
    setLoading(true);
    setResponse("");

    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      
      // Add Authorization header if token exists
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(fullUrl, {
        method,
        headers,
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setResponse(e.toString());
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">LearnWithCap – API Test Console</h1>
      <p className="text-gray-600 mb-8">Click on an endpoint to test it.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {WP_API_ENDPOINTS.map((group) => (
          <div key={group.group} className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">{group.group}</h2>
            <div className="space-y-2">
              {group.endpoints.map((ep) => (
                <Button
                  key={ep.name}
                  onClick={() => callApi(ep.url, ep.method)}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                >
                  <span className={`font-mono text-xs mr-3 px-1.5 py-0.5 rounded ${ep.method === 'POST' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {ep.method}
                  </span>
                  <span className="flex-1">{ep.name}</span>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Kết Quả:</h2>
        {loading && <div className="text-gray-500">⏳ Loading...</div>}
        <pre className="bg-gray-950 text-green-400 p-6 rounded-xl overflow-x-auto shadow-lg border border-gray-800 max-h-[500px] mt-4 text-sm">
          {response || "API response will be shown here..."}
        </pre>
      </div>
    </div>
  );
}