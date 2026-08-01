import Script from "next/script";
import ScrollToTop from "@/components/ScrollToTop";
import "../scss/main.scss";

export const metadata = {
  title: "Shivam's Portfolio",
  description:
    "Shivam Gupta — Full Stack Developer. Building modern web applications that are fast, scalable, and built to last.",
  icons: { icon: "/Shivam.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var storedTheme = localStorage.getItem("theme");
            var theme = storedTheme ? storedTheme : "dark";
            document.documentElement.setAttribute("data-theme", theme);
          } catch (e) {}
        `}} />
        <script dangerouslySetInnerHTML={{ __html: `
          if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
          }
          try {
            var navEntries = performance.getEntriesByType && performance.getEntriesByType("navigation");
            var isReload = navEntries && navEntries[0]
              ? navEntries[0].type === "reload"
              : performance.navigation && performance.navigation.type === 1;
            if (isReload) {
              if (window.location.hash) {
                history.replaceState(null, "", window.location.pathname + window.location.search);
              }
              window.scrollTo(0, 0);
              window.addEventListener("load", function () {
                window.scrollTo(0, 0);
              });
            }
          } catch (e) {}
        `}} />
      </head>
      <body>
        {children}
        <ScrollToTop />
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://kit.fontawesome.com/9fa51d37bd.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
