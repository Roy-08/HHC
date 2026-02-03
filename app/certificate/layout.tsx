"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CertificatePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Participant";
  const date = searchParams.get("date") || new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDownload = () => {
    const certificateElement = document.getElementById("certificate-container");
    if (!certificateElement) return;

    // Use html2canvas to capture the certificate
    import("html2canvas").then((html2canvas) => {
      html2canvas.default(certificateElement, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `certificate-${name.replace(/\s+/g, "-")}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-2">
            Your Certificate of Participation
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Right-click on the certificate to save, or use the download button below
          </p>
        </div>

        {/* Certificate Container */}
        <div
          id="certificate-container"
          className={`relative w-full bg-white rounded-lg shadow-2xl overflow-hidden transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            aspectRatio: "1.414/1", // A4 ratio
          }}
        >
          {/* Certificate Background Image */}
          <img
            src="/certificate.png"
            alt="Certificate Background"
            className="absolute inset-0 w-full h-full object-fill"
            crossOrigin="anonymous"
          />

          {/* Name Overlay */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ top: "-15%" }}>
            <div className="text-center px-8 sm:px-8 w-full">
              <p
                className="font-serif font-bold text-sm sm:text-xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 break-words"
                style={{
                  fontFamily: "'Footlight MT Light', 'Apple Chancery', cursive",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {name}
              </p>
            </div>
          </div>

          {/* Date Overlay - Simple left positioning without flex or justify-center */}
        </div>

        {/* Download Button */}
        <div className="text-center mt-4 sm:mt-8 px-2">
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            📥 Download Certificate
          </button>
          <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
            Click the button above to download your certificate as an image
          </p>
        </div>
      </div>
    </div>
  );
}