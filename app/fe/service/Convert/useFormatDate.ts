import { useCallback } from "react";

// Date型を引数にyyyy/mm/ddまでのString型にフォーマットする機能
export const useFormatDate = () => {
  // console.log("useFormatDate");

  const formatDateTypeToDate = useCallback((date: Date): Date => {
    // 引数はDate型しか来ないのだが、not a functionになることがあるので再定義している
    const reFormatDate = new Date(date);

    const formatDate =
      reFormatDate.getFullYear() +
      "/" +
      (reFormatDate.getMonth() + 1) +
      "/" +
      reFormatDate.getDay();

    const newFormatDate = new Date(formatDate);

    return newFormatDate;
  }, []);

  return formatDateTypeToDate;
};
