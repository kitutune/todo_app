import { showNotification } from "@mantine/notifications";

import axios from "axios";
import { useCallback } from "react";

export const useErrorHandle = () => {
  const axiosError = useCallback((error: unknown): void => {
    if (!axios.isAxiosError(error)) return;
    showNotification({
      id: "hello-there",
      disallowClose: true,
      onClose: () => console.log("unmounted"),
      onOpen: () => console.log("mounted"),
      autoClose: 10000, //10秒
      title: ` DBへのアクセスでエラーが発生しました、${error.message}`,
      message: `message:${error.config.url}
        method:${error.config.method}
        code:${error.code}
        `,
      // color: "red",
      // icon: <IconX />,
      // style: { backgroundColor: "red" },
      sx: { backgroundColor: "white" },
      loading: false,
    });
    return;
  }, []);

  return axiosError;
};
