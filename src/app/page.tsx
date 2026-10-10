import { redirect } from "next/navigation";

/** Fallback if the root rewrite is unavailable; the actual V3 UI is public/index.html. */
export default function HomePage() {
  redirect("/index.html");
}
