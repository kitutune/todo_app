import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout/Layout";
import { Center } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationsProvider>
      <Center>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Center>
    </NotificationsProvider>
  );
}

export default MyApp;
