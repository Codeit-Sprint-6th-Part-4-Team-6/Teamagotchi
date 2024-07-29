import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

import '@styles/globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={pretendard.className}>
      <Component {...pageProps} />
    </main>
  );
}
