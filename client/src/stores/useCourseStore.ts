import { StateCreator, create } from "zustand";

interface Course {
  course_name: string;
  course_code: string;
  professor: string;
}

interface CourseStore {
  courses: Course[];
  setCourses: (newCourses: Course[]) => void;
  addCourse: (newCourse: Course) => void;
}

// StateCreator를 사용하여 스토어 생성
const createStore: StateCreator<CourseStore> = (set, get, api) => ({
  courses: [],

  setCourses: (newCourses: Course[]) => set({ courses: newCourses }),

  addCourse: (newCourse: Course) =>
    set((state) => ({ courses: [...state.courses, newCourse] })),
});

const useCourseStore = create<CourseStore>(createStore);

export default useCourseStore;
