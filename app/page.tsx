import type { Metadata } from "next";
import pages from "./_content/pages.json";

const page = (pages as Record<string, { title: string; description: string; html: string }>)["index"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Home() {
  return <main dangerouslySetInnerHTML={{ __html: page.html }} />;
}
