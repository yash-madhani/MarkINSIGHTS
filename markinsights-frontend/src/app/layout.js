import { Inter } from "next/font/google";
import Header from "./header/header";
import Footer from "./footer/footer";
import Bot from "./Bot/Bot";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mark insights",
  description: "Created by Rahul , Yash , Srinath , Surabhi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
      <Header />
        {children}<Footer />
        <Bot /></body>
        
    </html>
  );
}
