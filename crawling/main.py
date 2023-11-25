from sqlalchemy import create_engine
import pandas as pd
import time

print("Ready for loading")

time.sleep(60) # Database가 준비될 때까지 대기

course = pd.read_csv('data/course.csv')
course_info = pd.read_csv("data/course_info.csv")
notice = pd.read_csv('data/notice.csv')
schedule = pd.read_csv('data/schedule.csv')

engine = create_engine('mysql+mysqlconnector://portal:qwer1234@database/portal')

course.to_sql(name='course', con=engine, if_exists='append', index=False)
print('course 테이블 적재 완료')

course_info.to_sql(name='course_info', con=engine, if_exists='append', index=False)
print('course_info 테이블 적재 완료')

notice.to_sql(name='notice', con=engine, if_exists='append', index=False)

print('notice 테이블 적재 완료')

schedule.to_sql(name='schedule', con=engine, if_exists='append', index=False)

print('schedule 테이블 적재 완료')

engine.dispose()
