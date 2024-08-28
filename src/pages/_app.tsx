import { useEffect, useState } from "react";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@components/Header";
import Loading from "@components/commons/LottieAnimation/Loading";
import Toast from "@components/commons/Toast";
import ModalWrapper from "@components/commons/modal/ModalWrapper";
import "@styles/globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true, // 전역 설정
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <title>티마고치</title>
        <meta name="description" content="팀원들과 함께 팀을 키우고 관리하는 재미를 느껴보세요!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <main className={pretendard.className}>
          {loading && (
            <div className="fixed z-50 h-full w-screen bg-[#111]">
              <Loading />
            </div>
          )}
          <HydrationBoundary state={pageProps.dehydratedState}>
            <Header />
            <ModalWrapper />
            <Toast />
            <Component {...pageProps} />
          </HydrationBoundary>
        </main>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
}
