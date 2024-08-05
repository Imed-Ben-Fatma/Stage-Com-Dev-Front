import { Inter } from "next/font/google";
import "./globals.css";
import { footer} from "./components/footer";

import dynamic from "next/dynamic";
import Modal from "./components/modal";

const NavBar = dynamic(() => import('./components/navBar'), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div><NavBar /></div>
      <div className="bg-slate-100 dark:bg-gray-800 pt-14 ">
        <div className="min-h-screen" >
      {children}
      </div>
      </div>
      <div>{footer()}</div>
      <Modal/>
      </body>
    </html>
  );
}
