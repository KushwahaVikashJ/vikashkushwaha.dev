import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "./ui/toaster";

export default function ContainerBlock({ children, ...customMeta }) {
  const router = useRouter();
  const meta = {
    title: "Vikash Kushwaha - Full Stack Developer",
    description: `I've been developing websites for 3 years straight. Get in touch with me to know more.`,
    image: "/avatar.jpeg",
    type: "website",
    ...customMeta,
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://www.vikashkushwaha.dev${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://www.vikashkushwaha.dev${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Vikash Kushwaha" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <main className="dark:bg-gray-800 w-full">
        <Navbar />
        <div>{children}</div>
        <Toaster />
        <Analytics mode={"production"} />
        <Footer />
      </main>
    </div>
  );
}
