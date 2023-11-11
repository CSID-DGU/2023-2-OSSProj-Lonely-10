from sqlalchemy import create_engine
from dotenv import load_dotenv
import os
import pandas as pd

load_dotenv()

schedule = pd.read_csv('../data/schedule.csv')

username = os.getenv('USERNAME')
password = os.getenv('PASSWORD')
host = os.getenv('HOST')
database = os.getenv('DATABASE')

engine = create_engine(f'mysql+mysqlconnector://{username}:{password}@{host}/{database}')

schedule.to_sql(name='schedule', con=engine, if_exists='append', index=False)

print('schedule 테이블 적재 완료')

engine.dispose()
