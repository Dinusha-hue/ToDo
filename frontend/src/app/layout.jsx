"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from 'react-redux';
import store from '../store/store';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: 'Todo Application',
//   description: 'Manage your tasks efficiently.',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Provider store={store}>
          {/* <header className="p-4 bg-blue-500 text-white text-center font-bold">
            Todo App
          </header> */}
          <main className="p-4">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
