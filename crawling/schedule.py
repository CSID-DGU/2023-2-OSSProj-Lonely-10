import requests
from bs4 import BeautifulSoup
import csv

url = "https://www.dongguk.edu/schedule/detail?schedule_info_seq=22" # DGU Schedule
response = requests.get(url)

data = []


if response.status_code == 200:
    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table")

    if table:
        rows = table.find_all("tr")

        for row in rows:
            cells = row.find_all(["td"])
            date = cells[0].text.strip()
            title = cells[1].contents[0].text.strip()
            detail = cells[1].find('p').text.strip()
            data.append([date, title, detail])
        with open ("data/schedule.csv", mode="w", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerows(data)
        print("CSV 파일로 저장되었습니다.")
    else:
        print("웹 페이지를 불러오는 데 문제가 발생했습니다.")