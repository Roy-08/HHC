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
      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        imageTimeout: 15000,
        removeContainer: true,
        foreignObjectRendering: false,
        // This prevents lab() color function errors
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('#certificate-container');
          if (clonedElement) {
            // Force all elements to use RGB colors only
            const allElements = clonedElement.querySelectorAll('*');
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.color = htmlEl.style.color || 'rgb(128, 0, 32)';
              htmlEl.style.backgroundColor = htmlEl.style.backgroundColor || 'rgb(255, 255, 255)';
            });
          }
        }
      });

      const link = document.createElement("a");
      const fileName = `Certificate_${name.replace(/\s+/g, "_")}/images/photo1770182098.jpg`;
      link.download = fileName;
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
    <>
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
        backgroundColor: "rgb(255, 255, 255)",
        fontFamily: "Arial, sans-serif"
      }}>
        {/* Congratulations Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "48px"
        }}>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "rgb(128, 0, 32)",
            marginBottom: "16px",
            margin: "0 0 16px 0"
          }}>
            Congratulations!
          </h1>
          <p style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "rgb(51, 51, 51)",
            margin: "0"
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
            marginBottom: "32px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "rgb(255, 255, 255)"
          }}
        >
          {/* Certificate Background Image */}
          <img
            src="/images/photo1770182100.jpg"
            alt="Certificate of Participation"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              backgroundColor: "rgb(255, 255, 255)"
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
                fontSize: "56px",
                color: "rgb(128, 0, 32)",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                letterSpacing: "0.05em",
                margin: "0",
                padding: "0"
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
            fontSize: "18px",
            padding: "16px 32px",
            fontWeight: "600",
            backgroundColor: isDownloading ? "rgb(102, 0, 25)" : "rgb(128, 0, 32)",
            color: "rgb(255, 255, 255)",
            border: "none",
            borderRadius: "8px",
            cursor: isDownloading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgba(128, 0, 32, 0.3)",
            transition: "all 0.3s ease",
            opacity: isDownloading ? 0.7 : 1
          }}
          onMouseEnter={(e) => {
            if (!isDownloading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(128, 0, 32, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(128, 0, 32, 0.3)";
          }}
        >
          {isDownloading ? "⏳ Preparing Download..." : "📥 Download Certificate"}
        </button>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: "12px",
            padding: "40px",
            maxWidth: "500px",
            width: "90%",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            textAlign: "center"
          }}>
            <h2 style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "rgb(128, 0, 32)",
              marginBottom: "16px",
              margin: "0 0 16px 0"
            }}>
              🎉 Certificate Downloaded!
            </h2>
            
            <p style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "rgb(51, 51, 51)",
              marginBottom: "24px",
              margin: "0 0 24px 0"
            }}>
              Your certificate has been successfully downloaded.
            </p>

            <div style={{
              padding: "24px",
              backgroundColor: "rgb(255, 245, 245)",
              borderRadius: "8px",
              marginBottom: "24px"
            }}>
              <p style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "rgb(128, 0, 32)",
                marginBottom: "12px",
                margin: "0 0 12px 0"
              }}>
                📢 Share Your Achievement!
              </p>
              <p style={{
                fontSize: "14px",
                color: "rgb(102, 102, 102)",
                lineHeight: "1.6",
                margin: "0"
              }}>
                We'd love for you to share your Happiness Index journey on social media. 
                Inspire others to take the first step towards emotional wellness!
              </p>
            </div>

            <button
              onClick={() => setShowSuccessPopup(false)}
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "16px",
                fontWeight: "600",
                backgroundColor: "rgb(128, 0, 32)",
                color: "rgb(255, 255, 255)",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(102, 0, 25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(128, 0, 32)";
              }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
