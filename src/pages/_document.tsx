import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
