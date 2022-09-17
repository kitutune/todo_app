import { useCallback } from "react";

export const useFetchHtmlElement = () => {
  // console.log("useFetchHtmlElement");

  const fetchMapId = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.getAttribute("data-id");
    // nullの可能性を排除
    if (!id) {
      // nullならエラーをスロー
      throw "idに値がありません";
    }
    // 取得したidを返す
    return id;
  }, []);

  return fetchMapId;
};
