import axios from "axios";
import useCourseStore from "../stores/useCourseStore";

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/course");
    const data = response.data;

    // 받아온 데이터를 Zustand 스토어에 업데이트
    useCourseStore.getState().setCourses(data.courses);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchData;
