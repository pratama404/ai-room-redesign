import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const outfit = Outfit({
  subsets: ["latin"],
});


export const metadata = {
  title: "AI Room Redesign – Transform Your Space with AI",
  description: "Upload your room image, choose your style, and let our AI do the magic. Redesign your room in seconds with AI.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
        <Provider>
        {children}
        </Provider>

      </body>
    </html>
    </ClerkProvider>
  );
}
