"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function AnalyticsComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && window.gtag) {
      window.gtag("config", "G-XXXXXXXXXX", {
        page_path: pathname + (searchParams ? "?" + searchParams.toString() : ""),
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `,
        }}
      />
    </>
  );
}

// ✅ Suspense para evitar errores en SSR
export default function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsComponent />
    </Suspense>
  );
}
