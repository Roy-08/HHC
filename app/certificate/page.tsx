"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/* ---------------- COLOR SAFETY FIX ---------------- */
function isSupportedColor(color: string) {
  if (!color) return false;
  return (
    color.startsWith("rgb") ||
    color.startsWith("#") ||
    color === "transparent"
  );
}

export default function CertificatePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Participant";
  const date =
    searchParams.get("date") ||
    new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  /* ---------------- DOWNLOAD HANDLER ---------------- */
  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const certificateElement = document.getElementById(
        "certificate-container"
      );
      if (!certificateElement) {
        throw new Error("Certificate element not found");
      }

      const clonedElement = certificateElement.cloneNode(true) as HTMLElement;
      clonedElement.style.position = "absolute";
      clonedElement.style.left = "-9999px";
      clonedElement.style.top = "0";
      document.body.appendChild(clonedElement);

      /* ---- FIX unsupported colors (lab / oklab) ---- */
      const allElements = clonedElement.querySelectorAll("*");
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const computedStyle = window.getComputedStyle(htmlEl);

        const bg = computedStyle.backgroundColor;
        const color = computedStyle.color;
        const border = computedStyle.borderColor;

        if (isSupportedColor(bg)) htmlEl.style.backgroundColor = bg;
        if (isSupportedColor(color)) htmlEl.style.color = color;
        if (isSupportedColor(border)) htmlEl.style.borderColor = border;

        htmlEl.style.removeProperty("color-scheme");
        htmlEl.style.removeProperty("filter");
      });

      const html2canvas = (await import("html2canvas")).default;

      const canvas = await html2canvas(clonedElement, {
        scale: 3,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          const all = clonedDoc.querySelectorAll("*");
          all.forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.removeProperty("color-scheme");
            htmlEl.style.removeProperty("filter");
          });
        },
      });

      document.body.removeChild(clonedElement);

      canvas.toBlob(
        (blob) => {
          if (!blob) throw new Error("Image generation failed");

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `certificate-${name.replace(/\s+/g, "-")}.png`;
          document.body.appendChild(link);
          link.click();

          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setIsDownloading(false);
            setShowSuccessModal(true);
          }, 100);
        },
        "image/png",
        1
      );
    } catch (err) {
      console.error(err);
      alert("Download failed. Please try again.");
      setIsDownloading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-5xl font-bold mb-4"
            style={{
              color: "rgb(222, 15, 63)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Congratulations{" "}
            <span style={{ fontFamily: "'Dancing Script', cursive" }}>
              {name}
            </span>
            !
          </h1>
          <p style={{ color: "rgb(75,85,99)" }}>
            Your certificate is ready 🎉
          </p>
        </div>

        {/* Certificate */}
        <div
          id="certificate-container"
          className={`relative w-full rounded-lg overflow-hidden transition-opacity duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            aspectRatio: "1.414 / 1",
            backgroundColor: "#ffffff",
            boxShadow:
              "0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)",
          }}
        >
          <img
            src="certificate.png"
            alt="Certificate"
            className="absolute inset-0 w-full h-full object-fill"
            crossOrigin="anonymous"
          />

          {/* Name */}
          <div
            className="absolute left-0 right-0 flex justify-center"
            style={{ top: "30%", transform: "translateY(-50%)" }}
          >
            <p
              className="text-5xl font-bold text-center"
              style={{
                fontFamily:
                  "'Footlight MT Light','Brush Script MT',cursive",
                color: "rgb(31,41,55)",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {name}
            </p>
          </div>
        </div>

        {/* Download */}
        <div className="text-center mt-10">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-12 py-4 rounded-lg text-white font-semibold text-lg"
            style={{
              backgroundColor: isDownloading
                ? "rgb(156,163,175)"
                : "rgb(222,15,63)",
            }}
          >
            {isDownloading ? "Preparing..." : "Download Certificate"}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="bg-white rounded-xl p-10 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "rgb(222,15,63)" }}
            >
              Downloaded 🎉
            </h2>
            <p className="mb-6">{name}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-8 py-3 rounded-lg text-white"
              style={{ backgroundColor: "rgb(222,15,63)" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Dancing+Script:wght@700&display=swap");
      `}</style>
    </div>
  );
}
