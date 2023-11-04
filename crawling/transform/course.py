import pandas as pd

course = pd.read_csv('../raw_data/instruction.csv')
course = course[['학수강좌번호', '교과목명', '교원명', '강의유형', '요일/시간', '강의실']]
course.loc[course['강의유형'] == '사이버', '강의실'] = '온라인'
course.loc[course['강의유형'] == '사이버', '요일/시간'] = '온라인'
course.dropna(inplace=True)
course.to_csv('../data/course.csv', index=False)