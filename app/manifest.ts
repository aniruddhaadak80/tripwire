import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tripwire — an atlas of everything that could go wrong",
    short_name: "Tripwire",
    description:
      "Every failure mode tracked in public: warning signs, precautions, and the mitigations actually working.",
    start_url: "/",
    display: "standalone",
    background_color: "#050506",
    theme_color: "#050506",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}