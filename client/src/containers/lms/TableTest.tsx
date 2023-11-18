"use client";

import styles from "./table.module.css";
import { TEST_DATA } from "./testData";

interface RowData {
  header: string;
  cells: string[];
}

const TableTest = () => {
  return (
    <div className={styles.tableContainer}>
      <table>
        <tbody>
          {TEST_DATA.map((cell, index) => (
            <tr>
              <th className={styles.tableHead}>test head</th>
              {TEST_DATA.map((cellData, index) => (
                <td key={index} className={styles.tableData}>
                  {cellData}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableTest;
