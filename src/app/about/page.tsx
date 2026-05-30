import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "About",
  description: "About Andrew Riley, also known as Riles.",
};

export default function AboutPage() {
  redirect("/#about");
}
