"use client";

import { useState } from "react";
import { WP_API_ENDPOINTS } from "@/lib/wp-api-endpoints";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy } from "lucide-react";
import { toast } from "sonner";

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
        const value = prompt(`Nhập giá trị cho "${key}":`);
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

  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      toast.success("Đã sao chép kết quả vào clipboard!");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-cap-dark-blue">LearnWithCap – API Test Console</h1>
        <p className="text-gray-500">Giao diện để kiểm tra các API endpoint của WordPress.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {WP_API_ENDPOINTS.map((group) => (
          <Card key={group.group} className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-cap-navy">{group.group}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {group.endpoints.map((ep) => (
                <Button
                  key={ep.name}
                  onClick={() => callApi(ep.url, ep.method)}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  disabled={loading}
                >
                  <span className={`mr-2 font-mono text-xs px-1.5 py-0.5 rounded ${ep.method === 'GET' ? 'bg-sky-100 text-sky-800' : 'bg-purple-100 text-purple-800'}`}>
                    {ep.method}
                  </span>
                  <span className="flex-1 text-sm truncate">{ep.name}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-cap-dark-blue mb-4">Kết Quả API</h2>
        {loading && (
          <div className="flex items-center text-gray-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Đang tải...
          </div>
        )}
        {currentUrl && !loading && (
          <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded-md mb-4 break-all">
            <span className="font-semibold">URL:</span> <code>{currentUrl}</code>
          </p>
        )}
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 font-mono text-sm p-6 rounded-lg overflow-auto max-h-[600px] w-full">
            <code>{response || "Kết quả sẽ được hiển thị ở đây..."}</code>
          </pre>
          {response && (
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="absolute top-3 right-3 text-gray-400 hover:text-white hover:bg-gray-700"
              aria-label="Copy response"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}