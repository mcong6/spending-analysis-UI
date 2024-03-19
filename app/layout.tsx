import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Bank Statement",
  description: "Bank Statement",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Navbar />
          {children}
          {/* <Footer /> */}
        </SessionProvider>
      </body>
    </html>
  );
}
