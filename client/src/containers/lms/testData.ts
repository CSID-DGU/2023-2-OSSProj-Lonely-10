import axios from "axios";

const getInfo = async () => {
  // try {
  //   const response = await axios.get("http://localhost:8080/api/v1/info");
  //   console.log(response);
  // } catch (error) {
  //   console.log(error);
  // }
  return "test";
};

const TEST_DATA = [
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
  "Cell Data",
];

export { TEST_DATA, getInfo };
