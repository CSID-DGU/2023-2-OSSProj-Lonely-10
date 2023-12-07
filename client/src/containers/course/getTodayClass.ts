interface scheduleProps {
  time: string;
  classroom: string;
  days: string;
}

interface courseProps {
  course_name: string;
  professor: string;
  schedules: scheduleProps[];
}

interface todayClassProps {
  courseName: string;
  professor: string;
  time: string;
  classroom: string;
}

export const getToday = (
  dateString: string,
  allClass: courseProps[]
): todayClassProps[] => {
  const dateObject = new Date(dateString);
  const dayOfWeekString = dateObject.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    weekday: "long",
  });
  const today = dayOfWeekString.replace("요일", "");

  const todayClass = allClass.filter((course) => {
    const hasToday = course.schedules.some(
      (schedule) => schedule.days === today
    );
    console.log(hasToday);
  });
  console.log(todayClass);

  return [
    {
      courseName: "string",
      professor: "string",
      time: "string",
      classroom: "string",
    },
  ];
};
