import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import {AuthProvider} from "@/Context/AuthContext";
import {Providers} from "@/Redux/Provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Biskits",
    description: "Refactored From ReactJS",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <Providers>
            <AuthProvider>
                <body
                    className={inter.className + " relative bg-violet-950 flex overflow-clip text-white flex-col min-h-screen max-w-screen "}>{children}</body>
            </AuthProvider>
        </Providers>
        </html>
    );
}
