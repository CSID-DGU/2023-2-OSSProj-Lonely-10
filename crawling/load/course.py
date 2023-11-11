from sqlalchemy import create_engine
from dotenv import load_dotenv
import os
import pandas as pd

load_dotenv()

username = os.getenv('USERNAME')
password = os.getenv('PASSWORD')
host = os.getenv('HOST')
database = os.getenv('DATABASE')

engine = create_engine(f'mysql+mysqlconnector://{username}:{password}@{host}/{database}')

course = pd.read_csv('../data/course.csv')

course.drop(['id'], axis=1, inplace=True)
course.to_sql(name='course', con=engine, if_exists='append', index=False)
print('course 테이블 생성 완료')

engine.dispose()
