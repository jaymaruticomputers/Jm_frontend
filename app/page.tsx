import type { Metadata } from "next";
import pages from "./_content/pages.json";
import ElfsightWidget from "./_components/ElfsightWidget";

const page = (pages as Record<string, { title: string; description: string; html: string }>)["index"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function Home() {
  return (
    <>
      <main dangerouslySetInnerHTML={{ __html: page.html }} />
      <ElfsightWidget appId="90dc775a-cb05-4142-b129-fb23511f9096" targetId="trustindex-mount" />
    </>
  );
}
