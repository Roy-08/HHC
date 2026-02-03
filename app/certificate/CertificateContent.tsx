"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CertificateContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Participant";

  const [isLoaded, setIsLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      const certificateElement = document.getElementById("certificate-container");
      if (!certificateElement) {
        throw new Error("Certificate element not found");
      }

      const clonedElement = certificateElement.cloneNode(true) as HTMLElement;
      clonedElement.style.position = "absolute";
      clonedElement.style.left = "-9999px";
      clonedElement.style.top = "0";
      document.body.appendChild(clonedElement);

      // Convert all colors to RGB to avoid lab() color function issues
      const allElements = clonedElement.querySelectorAll("*");
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const computedStyle = window.getComputedStyle(htmlEl);
        
        // Force RGB color format
        if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          htmlEl.style.backgroundColor = computedStyle.backgroundColor;
        }
        if (computedStyle.color) {
          htmlEl.style.color = computedStyle.color;
        }
        if (computedStyle.borderColor) {
          htmlEl.style.borderColor = computedStyle.borderColor;
        }
        
        // Remove any CSS variables or lab() functions
        htmlEl.style.removeProperty("color-scheme");
      });

      const html2canvas = (await import("html2canvas")).default;
      
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        allowTaint: true,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          const clonedBody = clonedDoc.body;
          const allClonedElements = clonedBody.querySelectorAll("*");
          allClonedElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.removeProperty("color-scheme");
            // Force standard color formats
            const bgColor = htmlEl.style.backgroundColor;
            if (bgColor && bgColor.includes('lab')) {
              htmlEl.style.backgroundColor = '#ffffff';
            }
          });
        }
      });

      document.body.removeChild(clonedElement);

      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error("Failed to create image");
        }
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const fileName = `certificate-${name.replace(/\s+/g, "-")}-${Date.now()}.png`;
        link.download = fileName;
        link.href = url;
        link.style.display = "none";
        
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          setIsDownloading(false);
          setShowSuccessModal(true);
        }, 100);
        
      }, "image/png", 1.0);
      
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download certificate. Please try again or right-click on the certificate to save it.");
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-white">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-[#de0f3f]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Congratulations, <span style={{ fontFamily: "'Dancing Script', cursive" }}>{name}</span>!
          </h1>
        </div>

        {/* Certificate Container */}
        <div
          id="certificate-container"
          className={`relative w-full rounded-lg overflow-hidden transition-opacity duration-700 shadow-lg ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            aspectRatio: "1.414/1",
            backgroundColor: "#ffffff"
          }}
        >
          <img
            src="/images/photo1770120668.jpg"
            alt="Certificate Background"
            className="absolute inset-0 w-full h-full object-fill"
            crossOrigin="anonymous"
          />

          <div 
            className="absolute left-0 right-0 flex items-center justify-center"
            style={{ 
              top: "40.5%",
              transform: "translateY(-50%)"
            }}
          >
            <div className="text-center px-4 sm:px-8 w-full">
              <p
                className="font-serif font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl break-words leading-tight"
                style={{
                  fontFamily: "'Footlight MT Light', 'Apple Chancery', 'Brush Script MT', cursive",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  letterSpacing: "0.02em",
                  color: "#1f2937"
                }}
              >
                {name}
              </p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-[#de0f3f] text-white font-semibold py-4 px-12 rounded-lg transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 shadow-md"
          >
            {isDownloading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Preparing Download...
              </span>
            ) : (
              "Download Certificate"
            )}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-60"
          style={{ backdropFilter: "blur(4px)" }}
          onClick={() => setShowSuccessModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-8 sm:p-10 max-w-lg w-full relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-32 opacity-10 bg-gradient-to-br from-[#de0f3f] to-white"></div>

            <div className="text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#de0f3f]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Downloaded Successfully!
              </h2>
              
              <p className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 break-words" style={{ fontFamily: "'Dancing Script', cursive" }}>
                {name}
              </p>
              
              <div className="w-16 sm:w-24 h-1 bg-[#de0f3f] mx-auto mb-6 rounded-full"></div>

              <p className="text-base sm:text-lg mb-8 text-gray-600 leading-relaxed">
                Your certificate has been downloaded successfully!<br />
                <span className="font-semibold text-[#de0f3f]">Share your achievement on social media!</span>
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 sm:py-4 rounded-lg font-semibold text-white bg-[#de0f3f] hover:opacity-90 transition-all shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Dancing+Script:wght@700&display=swap');
      `}</style>
    </div>
  );
}
