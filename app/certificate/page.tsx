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
      document.body.appendChild(clonedElement);

      const allElements = clonedElement.querySelectorAll("*");
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const computedStyle = window.getComputedStyle(htmlEl);
        
        if (computedStyle.backgroundColor) {
          htmlEl.style.backgroundColor = computedStyle.backgroundColor;
        }
        if (computedStyle.color) {
          htmlEl.style.color = computedStyle.color;
        }
        if (computedStyle.borderColor) {
          htmlEl.style.borderColor = computedStyle.borderColor;
        }
      });

      const html2canvas = (await import("html2canvas")).default;
      
      const canvas = await html2canvas(clonedElement, {
        scale: 3,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const clonedBody = clonedDoc.body;
          const allClonedElements = clonedBody.querySelectorAll("*");
          allClonedElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.removeProperty("color-scheme");
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
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative"
      style={{
        backgroundColor: "rgb(255, 255, 255)"
      }}
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ 
              color: "rgb(222, 15, 63)",
              fontFamily: "'Playfair Display', serif"
            }}
          >
            Congratulations, <span style={{ fontFamily: "'Dancing Script', cursive" }}>{name}</span>!
          </h1>
          <p 
            className="text-lg sm:text-xl"
            style={{ color: "rgb(75, 85, 99)", fontFamily: "'Times New Roman', cursive" }}
            
          >
            Your certificate is ready to download
          </p>
        </div>

        {/* Certificate Container */}
        <div
          id="certificate-container"
          className={`relative w-full rounded-lg overflow-hidden transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            aspectRatio: "1.414/1",
            backgroundColor: "rgb(255, 255, 255)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          }}
        >
          <img
            src="certificate.png"
            alt="Certificate Background"
            className="absolute inset-0 w-full h-full object-fill"
            
            crossOrigin="anonymous"
          />

<div 
  className="absolute left-0 right-0 flex items-center justify-center"
  style={{ 
    top: "39.7%",  // Adjust this value to position the name correctly
    transform: "translateY(-50%)"
  }}
>            <div className="text-center px-4 sm:px-8 w-full">
              <p
                className="font-serif font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl break-words leading-tight"
                style={{
                  fontFamily: "'Footlight MT Light', 'Apple Chancery', 'Brush Script MT', cursive",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  letterSpacing: "0.02em",
                  color: "rgb(31, 41, 55)"
                }}
              >
                {name}
              </p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="text-white font-semibold py-4 px-12 rounded-lg transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isDownloading ? "rgb(156, 163, 175)" : "rgb(222, 15, 63)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}
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

          <p className="text-sm mt-4" style={{ color: "rgb(107, 114, 128)" }}>
            Right-click on the certificate to save directly
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ 
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)"
          }}
          onClick={() => setShowSuccessModal(false)}
        >
          <div 
            className="rounded-2xl p-10 max-w-lg w-full relative overflow-hidden"
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Background Pattern */}
            <div 
              className="absolute top-0 left-0 w-full h-32 opacity-10"
              style={{
                background: "linear-gradient(135deg, rgb(222, 15, 63) 0%, rgb(255, 255, 255) 100%)"
              }}
            ></div>

            <div className="text-center relative z-10">
              <h2 
                className="text-5xl sm:text-6xl font-bold mb-6"
                style={{ 
                  color: "rgb(222, 15, 63)",
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: "-0.02em"
                }}
              >
                Congratulations!
              </h2>
              
              <p 
                className="text-3xl sm:text-4xl font-bold mb-8"
                style={{ 
                  color: "rgb(31, 41, 55)",
                  fontFamily: "'Dancing Script', cursive"
                }}
              >
                {name}
              </p>
              
              <div 
                className="w-24 h-1 mx-auto mb-8 rounded-full"
                style={{ backgroundColor: "rgb(222, 15, 63)" }}
              ></div>

              <p 
                className="text-lg mb-10"
                style={{ 
                  color: "rgb(107, 114, 128)",
                  lineHeight: "1.8"
                }}
              >
                Your certificate has been downloaded successfully.<br />
                Share your achievement with the world!
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <button 
                    className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                    style={{ backgroundColor: "rgb(14, 165, 233)" }}
                  >
                    Share on LinkedIn
                  </button>
                  <button 
                    className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                    style={{ backgroundColor: "rgb(29, 161, 242)" }}
                  >
                    Share on Twitter
                  </button>
                  <button 
                    className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                    style={{ backgroundColor: "rgb(24, 119, 242)" }}
                  >
                    Share on Facebook
                  </button>
                </div>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: "rgb(222, 15, 63)",
                    boxShadow: "0 4px 6px -1px rgba(222, 15, 63, 0.3)"
                  }}
                >
                  Close
                </button>
              </div>
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








