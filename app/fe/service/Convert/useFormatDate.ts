// Date型を引数にyyyy/mm/ddまでのString型にフォーマットする機能
export const useFormatDate = () => {
  const formatDateTypeToDate = (date: Date) => {
    const formatedDate =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDay();
    return formatedDate;
  };

  return formatDateTypeToDate;
};
