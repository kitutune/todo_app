import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout/Layout";
import { Center } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Center style={{ width: 400, height: 200 }}>
    <Center >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Center>
  );
}

export default MyApp;
