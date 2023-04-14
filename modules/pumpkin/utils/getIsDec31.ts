export const getIsDec31 = (date: Date) => {
  return date.getMonth() === 11 && date.getDate() === 31
}
