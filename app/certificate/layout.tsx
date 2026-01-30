import { Suspense } from "react";

export default function CertificateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Loading certificate...</div>}>{children}</Suspense>;
}