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
      
      // Create a temporary wrapper with forced styles
      const wrapper = document.createElement('div');
      wrapper.style.position = 'absolute';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '0';
      wrapper.style.width = certificateElement.offsetWidth + 'px';
      wrapper.style.height = certificateElement.offsetHeight + 'px';
      wrapper.style.backgroundColor = '#ffffff';
      wrapper.style.color = '#000000';
      
      // Clone the certificate
      const clone = certificateElement.cloneNode(true) as HTMLElement;
      
      // Strip ALL classes and force inline styles
      const stripAndStyle = (element: HTMLElement) => {
        // Remove all classes
        element.className = '';
        
        // Force basic styles
        const computed = window.getComputedStyle(element);
        
        // Only set essential positioning and sizing
        if (element.style.position) element.style.position = computed.position;
        if (element.style.top) element.style.top = computed.top;
        if (element.style.left) element.style.left = computed.left;
        if (element.style.right) element.style.right = computed.right;
        if (element.style.bottom) element.style.bottom = computed.bottom;
        if (element.style.width) element.style.width = computed.width;
        if (element.style.height) element.style.height = computed.height;
        if (element.style.transform) element.style.transform = computed.transform;
        
        // Force white/black colors only
        if (computed.backgroundColor && computed.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          element.style.backgroundColor = '#ffffff';
        }
        element.style.color = '#000000';
        
        // Remove all CSS variables
        Array.from(element.style).forEach(prop => {
          if (prop.startsWith('--')) {
            element.style.removeProperty(prop);
          }
        });
        
        // Recursively process children
        Array.from(element.children).forEach(child => {
          stripAndStyle(child as HTMLElement);
        });
      };
      
      stripAndStyle(clone);
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);
      
      // Render with minimal options
      const canvas = await html2canvas(wrapper, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        removeContainer: false,
        imageTimeout: 0,
        foreignObjectRendering: false,
        onclone: (doc) => {
          // Final sanitization pass
          const allEls = doc.querySelectorAll('*');
          allEls.forEach((el: Element) => {
            const htmlEl = el as HTMLElement;
            htmlEl.className = '';
            htmlEl.style.backgroundColor = '#ffffff';
            htmlEl.style.color = '#000000';
            
            // Remove any remaining CSS variables
            Array.from(htmlEl.style).forEach(prop => {
              if (prop.startsWith('--') || prop.includes('lab') || prop.includes('oklch')) {
                htmlEl.style.removeProperty(prop);
              }
            });
          });
        }
      });

      document.body.removeChild(wrapper);

      // Convert to blob and download
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
