from bs4 import BeautifulSoup
import pandas as pd
import requests
import re

base_url = "https://www.dongguk.edu/article/JANGHAKNOTICE/list?pageIndex="
href_url = "https://www.dongguk.edu/article/JANGHAKNOTICE/detail/"
data = []

for page_num in range(1, 24):
    url = base_url + str(page_num)
    response = requests.get(url)

    if response.status_code != 200:
        print("페이지를 불러오는 데 실패했습니다.")
        break

    soup = BeautifulSoup(response.text, "html.parser")
    board_list = soup.find('div', class_='board_list')
    boards = board_list.find_all('li')
    for board in boards:
        tmp = board.find('a', attrs={"onclick": True})['onclick']
        url = href_url + str(re.search(r'goDetail\((\d+)\)', tmp).group(1))
        print(url)
        title = board.find('p', class_='tit').get_text(strip=True)
        print(title)
        info_spans = board.select('div.info > span')
        date = info_spans[0].text
        administrator = info_spans[1].text
        print(date)
        print(administrator)
        data.append([url, title, date, administrator])

dataframe = pd.DataFrame(data)
dataframe.to_csv('../raw_data/janghak_notice.csv', encoding='utf-8')