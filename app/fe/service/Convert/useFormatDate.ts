import { useCallback } from "react";

// Date型を引数にyyyy/mm/ddまでのString型にフォーマットする機能
export const useFormatDate = () => {
  // console.log("useFormatDate");

  const dateToStr = useCallback((dateData: Date): string => {
    // 引数はDate型しか来ないのだが、not a functionになることがあるので再定義している
    const tmpDate = new Date(dateData);

    const strDate =
      tmpDate.getFullYear() +
      "-" +
      (tmpDate.getMonth() + 1) +
      "-" +
      tmpDate.getDate();

    return strDate;
  }, []);

  const formatDateTypeToDate = useCallback(
    (dateData: Date): Date => {
      const strDate = dateToStr(dateData);

      const newFormatDate = new Date(strDate);

      return newFormatDate;
    },
    [dateToStr]
  );

  return { formatDateTypeToDate, dateToStr };
};
