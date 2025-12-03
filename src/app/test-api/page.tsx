export const dynamic = 'force-dynamic';

export default async function TestApiPage() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic a2V5XzkxZGFhNTIyZjU1ZjZiNDFiYzdlZmE3Mzk1MWY4ZDU2OnNlY3JldF9lNjJmYTc2MDNlNjFhN2ZkM2YyZWQ1NWJmZjdkNDExZmUxZmE2MzU5MWNlY2ZmZWFlYjU1ZDg5NDkwYzk1MzEy");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as const
  };

  let result = null;
  let status = 0;

  try {
    const response = await fetch("https://course.learnwithcap.com/wp-json/tutor/v1/courses/", requestOptions);
    status = response.status;
    const text = await response.text();
    
    // Thử parse JSON để hiển thị đẹp hơn
    try {
      result = JSON.parse(text);
    } catch {
      result = text;
    }
  } catch (error: any) {
    result = { error: error.message || String(error) };
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-2">Kết quả Raw API</h1>
      <div className="mb-6 text-sm text-gray-600 space-y-1">
        <p>URL: <code>https://course.learnwithcap.com/wp-json/tutor/v1/courses/</code></p>
        <p>Status: <span className={status === 200 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{status}</span></p>
      </div>
      
      <div className="bg-gray-950 text-green-400 p-6 rounded-xl overflow-x-auto shadow-2xl border border-gray-800 max-h-[80vh]">
        <pre className="font-mono text-xs sm:text-sm leading-relaxed">
          {typeof result === 'object' ? JSON.stringify(result, null, 2) : result}
        </pre>
      </div>
    </div>
  );
}