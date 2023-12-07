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

  const todayClasses: todayClassProps[] = [];

  const getTodayClass = () => {
    allClass.filter((course) => {
      const todayCourse = course.schedules.find(
        (schedule) => schedule.days === today
      );

      if (todayCourse) {
        todayClasses.push({
          courseName: course.course_name,
          time: todayCourse.time,
          classroom: todayCourse.classroom,
        });
      }
    });
  };
  getTodayClass();
  return todayClasses;
};

// "course_name": "EAS1",
// "professor": "제프벨리",
// "schedules": [
//          {
//            "time": "15:30 ~ 17:30",
//            "classroom": "207-106(혜화관 106 106 강의실)",
//            "days": "화"
//          },
// ]
