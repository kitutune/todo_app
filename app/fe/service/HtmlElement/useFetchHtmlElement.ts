import { useCallback } from "react";

export const useFetchHtmlElement = () => {
  // elementのidを渡すかエラーをスロー
  const fetchMapId = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.getAttribute("data-id");
    // nullの可能性を排除
    if (!id) {
      // nullならエラーをスロー
      throw "idに値がありません";
    }
    // 取得したidを返す
    return id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return fetchMapId;
};
