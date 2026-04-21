import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/auth-context";
import { ThemeProvider } from "../context/theme-context";
import { ApolloWrapper } from "../components/apollo-wrapper";

export const metadata: Metadata = {
  title: "Slooze | Commodity Command Center",
  description: "Advanced industrial commodity management and tracking dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 min-h-screen">
        <ApolloWrapper>
          <ThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
