"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

/* ---------------- CONTENT ---------------- */

function CertificateContent() {
  const searchParams = useSearchParams();

  const [name, setName] = useState("Participant");
  const [date, setDate] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setName(searchParams.get("name") || "Participant");
    setDate(
      searchParams.get("date") ||
        new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
    );
    setIsLoaded(true);
  }, [searchParams]);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const element = document.getElementById("certificate-container");
      if (!element) throw new Error("Certificate not found");

      const html2canvas = (await import("html2canvas")).default;

      const canvas = await html2canvas(element, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificate-${name.replace(/\s+/g, "-")}.png`;
        a.click();

        URL.revokeObjectURL(url);
        setIsDownloading(false);
        setShowSuccessModal(true);
      });
    } catch (err) {
      console.error(err);
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <h1 className="text-4xl font-bold mb-6 text-red-600">
        Congratulations, {name} 🎉
      </h1>

      <div
        id="certificate-container"
        className={`w-full max-w-4xl aspect-[1.414/1] relative transition-opacity ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="/certificate.png"
          alt="Certificate"
          className="absolute inset-0 w-full h-full object-fill"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-4xl font-bold text-gray-800">{name}</p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="mt-8 px-10 py-4 bg-red-600 text-white rounded-lg disabled:opacity-50"
      >
        {isDownloading ? "Preparing..." : "Download Certificate"}
      </button>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-2">Downloaded ✅</h2>
            <p className="mb-4">{name}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-red-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <CertificateContent />
    </Suspense>
  );
}
