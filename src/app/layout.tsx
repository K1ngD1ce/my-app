import type { Metadata } from "next";
import { ReduxProvider } from "./providers/ReduxProvider";
import "../../src/shared/styles/base/globals.scss";
import "../../src/shared/styles/variables/fonts.scss";
import "../../src/shared/styles/variables/vars.scss";


export const metadata: Metadata = {
  title: "App by Maxim Thorshin",
  description: "Welcome to my app! Enjoy your stay.",
  keywords: "frontend, developer, designer, web development",
  openGraph: {
    title: "Home - Maxim Thorshin",
    description: "Welcome to my portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/favicon.svg" />
      </head>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

