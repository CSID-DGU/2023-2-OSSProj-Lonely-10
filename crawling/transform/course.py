import pandas as pd

course = pd.read_csv('../raw_data/instruction.csv')
course = course[['학수강좌번호', '교과목명', '교원명', '강의유형', '요일/시간', '강의실']]
course.loc[course['강의유형'] == '사이버', '강의실'] = None
course.loc[course['강의유형'] == '사이버', '요일/시간'] = None

condition = (course['강의유형'] != '사이버') & (course['요일/시간'].isnull() | course['강의실'].isnull())
course = course[~condition]

course['수업1'] = course['요일/시간'].str.split(',').str[0]
course['수업2'] = course['요일/시간'].str.split(',').str[1]
course['수업3'] = course['요일/시간'].str.split(',').str[2]

course['강의실1'] = course['강의실'].str.split(',').str[0]
course['강의실2'] = course['강의실'].str.split(',').str[1]
course['강의실3'] = course['강의실'].str.split(',').str[2]

course.rename(columns={'학수강좌번호': 'course_code'}, inplace = True)
course.rename(columns={'교과목명': 'course_name'}, inplace = True)
course.rename(columns={'교원명': 'professor'}, inplace = True)

course['is_online'] = course['강의유형'].apply(lambda x: True if x=='사이버' else False)

course.drop(['강의유형', '요일/시간', '강의실'], axis=1, inplace=True)

course_info = course[['course_code', '수업1', '강의실1', '수업2', '강의실2', '수업3', '강의실3']]

course_info1 = course[['course_code', '수업1', '강의실1']]
course_info1['days'] = course_info1['수업1'].str[0]
course_info1['start_time'] = course_info1['수업1'].str.split('/').str[1].str.split('-').str[0]
course_info1['end_time'] = course_info1['수업1'].str.split('/').str[1].str.split('-').str[1]
course_info1.rename(columns={'강의실1': 'classroom'}, inplace = True)
course_info1 = course_info1.dropna()
course_info1.drop(['수업1'], axis=1, inplace=True)

course_info2 = course[['course_code', '수업2', '강의실2']]
course_info2['days'] = course_info2['수업2'].str[0]
course_info2['start_time'] = course_info2['수업2'].str.split('/').str[1].str.split('-').str[0]
course_info2['end_time'] = course_info2['수업2'].str.split('/').str[1].str.split('-').str[1]
course_info2.rename(columns={'강의실2': 'classroom'}, inplace = True)
course_info2 = course_info2.dropna()
course_info2.drop(['수업2'], axis=1, inplace=True)

course_info3 = course[['course_code', '수업3', '강의실3']]
course_info3['days'] = course_info3['수업3'].str[0]
course_info3['start_time'] = course_info3['수업3'].str.split('/').str[1].str.split('-').str[0]
course_info3['end_time'] = course_info3['수업3'].str.split('/').str[1].str.split('-').str[1]
course_info3.rename(columns={'강의실3': 'classroom'}, inplace = True)
course_info3 = course_info3.dropna()
course_info3.drop(['수업3'], axis=1, inplace=True)

course_info = pd.concat([course_info1, course_info2, course_info3], axis=0)

course = course[['course_code', 'course_name', 'professor', 'is_online']]

merge_course = pd.merge(course, course_info, on='course_code', how='left')

course_info = merge_course[['course_code', 'days', 'start_time', 'end_time', 'classroom']]
course_info.dropna(inplace=True)

course.to_csv('../data/course.csv', index=False)
course_info.to_csv('../data/course_info.csv', index=False)