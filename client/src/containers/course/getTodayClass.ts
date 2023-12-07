export const getToday = (dateString: string): string => {
  const dateObject = new Date(dateString);
  const dayOfWeekString = dateObject.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    weekday: "long",
  });
  return dayOfWeekString;
};
