import type { Metadata } from "next";
import { notFound } from "next/navigation";
import pagesData from "../_content/pages.json";

type Page = { title: string; description: string; html: string; dataCategory?: string; templated?: boolean };
const pages = pagesData as Record<string, Page>;

export function generateStaticParams() {
  return Object.keys(pages)
    .filter((slug) => slug !== "index")
    .map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function CatchAll({ params }: { params: Params }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return <main dangerouslySetInnerHTML={{ __html: page.html }} />;
}
