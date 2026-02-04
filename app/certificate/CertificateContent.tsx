"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";

export default function CertificateContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nameParam = searchParams.get("name");
    const dateParam = searchParams.get("date");
    
    if (nameParam) {
      setName(decodeURIComponent(nameParam));
    }
    if (dateParam) {
      setDate(decodeURIComponent(dateParam));
    }
  }, [searchParams]);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    setIsDownloading(true);

    try {
      // Wait for fonts and images to load
      await new Promise(resolve => setTimeout(resolve, 800));

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('certificate-container');
          if (clonedElement) {
            // Force all colors to RGB to avoid lab() function errors
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              const computedStyle = window.getComputedStyle(htmlEl);
              
              // Convert any lab() colors to RGB
              if (computedStyle.color && computedStyle.color.includes('lab(')) {
                htmlEl.style.color = '#800020';
              }
              if (computedStyle.backgroundColor && computedStyle.backgroundColor.includes('lab(')) {
                htmlEl.style.backgroundColor = '#ffffff';
              }
            });
          }
        }
      });

      const link = document.createElement("a");
      link.download = `Certificate_${name.replace(/\s+/g, "_")}/images/photo1770181771.jpg`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();

      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download certificate. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      backgroundColor: "#ffffff"
    }}>
      {/* Congratulations Header */}
      <div style={{
        textAlign: "center",
        marginBottom: "3rem",
        animation: "fadeIn 0.7s ease-in"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#800020",
          marginBottom: "1rem"
        }}>
          Congratulations!
        </h1>
        <p style={{
          fontSize: "2rem",
          fontWeight: "600",
          color: "#333333"
        }}>
          {name || "Participant"}
        </p>
      </div>

      {/* Certificate Container */}
      <div 
        ref={certificateRef}
        id="certificate-container"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          marginBottom: "2rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#ffffff"
        }}
      >
        {/* Certificate Background Image */}
        <img
          src="/images/photo1770181771.jpg"
          alt="Certificate of Participation"
          style={{
            width: "100%",
            height: "auto",
            display: "block"
          }}
          crossOrigin="anonymous"
        />

        {/* Name Overlay - Positioned in center */}
        <div style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none"
        }}>
          <div style={{
            textAlign: "center",
            marginTop: "2%"
          }}>
            <p style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: "bold",
              fontSize: "3.5rem",
              color: "#800020",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              letterSpacing: "0.05em",
              margin: "0"
            }}>
              {name || "Your Name"}
            </p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        style={{
          fontSize: "1.125rem",
          padding: "1rem 2rem",
          fontWeight: "600",
          backgroundColor: "#800020",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          cursor: isDownloading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 12px rgba(128,0,32,0.3)",
          transition: "all 0.3s ease",
          opacity: isDownloading ? 0.7 : 1
        }}
        onMouseEnter={(e) => {
          if (!isDownloading) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(128,0,32,0.4)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(128,0,32,0.3)";
        }}
      >
        {isDownloading ? "⏳ Preparing Download..." : "📥 Download Certificate"}
      </button>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          animation: "fadeIn 0.3s ease-in"
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "2.5rem",
            maxWidth: "500px",
            width: "90%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            textAlign: "center",
            animation: "scaleIn 0.3s ease-out"
          }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#800020",
              marginBottom: "1rem"
            }}>
              🎉 Certificate Downloaded!
            </h2>
            
            <p style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#333333",
              marginBottom: "1.5rem"
            }}>
              Your certificate has been successfully downloaded.
            </p>

            <div style={{
              padding: "1.5rem",
              backgroundColor: "#fff5f5",
              borderRadius: "8px",
              marginBottom: "1.5rem"
            }}>
              <p style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#800020",
                marginBottom: "0.75rem"
              }}>
                📢 Share Your Achievement!
              </p>
              <p style={{
                fontSize: "0.875rem",
                color: "#666666",
                lineHeight: "1.6"
              }}>
                We'd love for you to share your Happiness Index journey on social media. 
                Inspire others to take the first step towards emotional wellness!
              </p>
            </div>

            <button
              onClick={() => setShowSuccessPopup(false)}
              style={{
                width: "100%",
                padding: "0.875rem",
                fontSize: "1rem",
                fontWeight: "600",
                backgroundColor: "#800020",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#660019";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#800020";
              }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
          p {
            font-size: 1.5rem !important;
          }
          button {
            font-size: 1rem !important;
            padding: 0.875rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
