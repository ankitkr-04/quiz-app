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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
  <body className={`${rubik.className} relative overflow-hidden`}>
    <AntdRegistry>
      <Header />
      <main className="min-h-screen bg-purple-200 px-4 py-8 relative overflow-hidden">
        {/* Blobs */}
        <div className="hidden md:absolute -top-12 -left-8 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="hidden md:absolute top-0 -right-24 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-2 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-24 right-12 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2500"></div>
        <div className="absolute top-24 -right-24 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-3500"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-3000"></div>
        <div className="absolute -bottom-32 -right-8 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-1500"></div>

        {/* Main Content */}
        <div className="absolute top-16 left-0 right-0 w-full z-10 md:mt-8 backdrop-blur-sm">
          <div className="md:rounded-lg h-screen py-3 px-2 md:mt-2 mx-auto lg:max-w-screen-lg max-w-screen-md">
            {/* Render children components or content here */}
            {children}
          </div>
        </div>
      </main>
    </AntdRegistry>
  </body>
</html>

  );
}

export default RootLayout;
