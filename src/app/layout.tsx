import type { Metadata } from "next";
import "../../src/shared/styles/base/globals.scss";
import "../../src/shared/styles/variables/fonts.scss";
import "../../src/shared/styles/variables/vars.scss";
import { ReduxProvider } from "./providers/ReduxProvider";


export const metadata: Metadata = {
  title: "App by Maxim Thorshin",
  description: "Welcome to my app! Enjoy your stay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/favicon.svg"></link>
      </head>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

