// CourseDetailContext.js
import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
interface attendaceProps {
  date: string;
  status: string;
}

interface anouncementProps {
  title: string;
  content: string;
  writer: string;
  created_at: string;
}

interface assignmentProps {
  title: string;
  content: string;
  duration: string;
  created_at: string;
}

interface courseDetail {
  course_id: string;
  course_code: string;
  course_name: string;
  professor: string;
  attendance: attendaceProps[];
  announcement: anouncementProps[];
  assignment: assignmentProps[];
}

interface CourseDetailContextProps {
  courseDetail: courseDetail[];
  setCourseDetail: Dispatch<SetStateAction<courseDetail[]>>;
}

interface Props {
  children: React.ReactNode;
}

const CourseDetailContext = createContext<CourseDetailContextProps>({
  courseDetail: [],
  setCourseDetail: (): courseDetail[] => [],
});

export const CourseDetailProvider = ({ children }: Props) => {
  const [courseDetail, setCourseDetail] = useState<courseDetail[]>([]); // courseDetail의 타입에 따라 수정

  return (
    <CourseDetailContext.Provider value={{ courseDetail, setCourseDetail }}>
      {children}
    </CourseDetailContext.Provider>
  );
};

export const useCourseDetailContext = () => useContext(CourseDetailContext);
