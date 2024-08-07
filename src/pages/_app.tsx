import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import UserInfo from "@components/auth/UserInfo";
import ModalWrapper from "@components/commons/modal/ModalWrapper";
import "@styles/globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={pretendard.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserInfo />
          <ModalWrapper />
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
