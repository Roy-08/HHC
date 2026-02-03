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

      // Import html2canvas
      const html2canvas = (await import("html2canvas")).default;
      
      // Create canvas with explicit settings to avoid lab() colors
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        allowTaint: true,
        imageTimeout: 0,
        removeContainer: true,
        onclone: (clonedDoc) => {
          // Force all elements to use RGB colors only
          const allElements = clonedDoc.querySelectorAll("*");
          allElements.forEach((el: Element) => {
            const htmlEl = el as HTMLElement;
            
            // Remove all Tailwind classes that might use lab() colors
            const classes = Array.from(htmlEl.classList);
            classes.forEach(cls => {
              if (cls.startsWith('bg-') || cls.startsWith('text-') || cls.startsWith('border-')) {
                htmlEl.classList.remove(cls);
              }
            });
            
            // Force inline RGB styles
            const computedStyle = window.getComputedStyle(htmlEl);
            
            if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
              htmlEl.style.backgroundColor = '#ffffff';
            }
            
            if (computedStyle.color) {
              htmlEl.style.color = '#1f2937';
            }
            
            // Remove CSS variables
            htmlEl.style.removeProperty("color-scheme");
            const styleProps = Array.from(htmlEl.style);
            styleProps.forEach(prop => {
              if (prop.startsWith('--')) {
                htmlEl.style.removeProperty(prop);
              }
            });
          });
        }
      });

      // Convert canvas to blob and download
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
      alert("Failed to download certificate. Please try again.");
      setIsDownloading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ 
              color: "#de0f3f",
              fontFamily: "'Playfair Display', serif"
            }}
          >
            Congratulations, <span style={{ fontFamily: "'Dancing Script', cursive" }}>{name}</span>!
          </h1>
        </div>

        {/* Certificate Container */}
        <div
          id="certificate-container"
          className={`relative w-full rounded-lg overflow-hidden transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            aspectRatio: "1.414/1",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        >
          <img
            src="/images/photo1770121784.jpg"
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
            className="font-semibold py-4 px-12 rounded-lg transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            style={{
              backgroundColor: isDownloading ? "#9ca3af" : "#de0f3f",
              color: "#ffffff",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
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
            className="rounded-2xl p-8 sm:p-10 max-w-lg w-full relative overflow-hidden"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="absolute top-0 left-0 w-full h-32 opacity-10"
              style={{
                background: "linear-gradient(135deg, #de0f3f 0%, #ffffff 100%)"
              }}
            ></div>

            <div className="text-center relative z-10">
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ 
                  color: "#de0f3f",
                  fontFamily: "'Playfair Display', serif"
                }}
              >
                Downloaded Successfully!
              </h2>
              
              <p 
                className="text-2xl sm:text-3xl font-bold mb-6 break-words"
                style={{ 
                  color: "#1f2937",
                  fontFamily: "'Dancing Script', cursive"
                }}
              >
                {name}
              </p>
              
              <div 
                className="w-16 sm:w-24 h-1 mx-auto mb-6 rounded-full"
                style={{ backgroundColor: "#de0f3f" }}
              ></div>

              <p 
                className="text-base sm:text-lg mb-8 leading-relaxed"
                style={{ color: "#6b7280" }}
              >
                Your certificate has been downloaded successfully!<br />
                <span className="font-semibold" style={{ color: "#de0f3f" }}>Share your achievement on social media!</span>
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 sm:py-4 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{
                  backgroundColor: "#de0f3f",
                  color: "#ffffff",
                  boxShadow: "0 4px 6px -1px rgba(222, 15, 63, 0.3)"
                }}
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
