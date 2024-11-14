import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/sidebar";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator',
  description: 'A beautiful tool to format and validate JSON data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" data-theme="dim">
         <body className={inter.className}>
             <SidebarProvider>
                 <AppSidebar />
                 <main className="w-full">
                     {children}
                 </main>
                 <Toaster />
             </SidebarProvider>
         </body>
      </html>
  );
}