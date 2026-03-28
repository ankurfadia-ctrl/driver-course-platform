import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Driver Course Platform",
    short_name: "Driver Course",
    description:
      "Online driver improvement courses with enrollment, progress tracking, final exam completion, and certificate delivery.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}
