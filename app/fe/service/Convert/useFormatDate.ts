// Date型を引数にyyyy/mm/ddまでのString型にフォーマットする機能
export const useFormatDate = () => {
  const formatDateTypeToDate = (date: Date) => {
    // 引数はDate型しか来ないのだが、not a functionになることがあるので再定義している
    const reFormatDate = new Date(date);
    const formatedDate =
      reFormatDate.getFullYear() +
      "/" +
      (reFormatDate.getMonth() + 1) +
      "/" +
      reFormatDate.getDay();
    return formatedDate;
  };

  return formatDateTypeToDate;
};
