import type { Metadata } from "next";
import { Rubik } from 'next/font/google'
import "./globals.css";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Header from "@/components/header";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Quiz app using trivia api",
};

const RootLayout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html>
      <body className={rubik.className}>

        <AntdRegistry>
          <Header />
          <main className="mx-auto max-w-screen-md lg:max-w-screen-lg w-full mt-20 px-2 lg:mt-28">
            {children}
          </main>
        </AntdRegistry>
      </body>
    </html>
  );
}

export default RootLayout;
