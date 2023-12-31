from sqlalchemy import create_engine
from dotenv import load_dotenv
import os
import pandas as pd

load_dotenv()

notice = pd.read_csv('../data/notice.csv')

username = os.getenv('USERNAME')
password = os.getenv('PASSWORD')
host = os.getenv('HOST')
database = os.getenv('DATABASE')

engine = create_engine(f'mysql+mysqlconnector://{username}:{password}@{host}/{database}')

notice.to_sql(name='notice', con=engine, if_exists='append', index=False)

print('notice 테이블 생성 완료')

engine.dispose()
