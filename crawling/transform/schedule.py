import pandas as pd

schedule = pd.read_csv('../raw_data/schedule.csv')

schedule['date'] = schedule['date'].str.split(' ').str[0]
schedule['date'] = pd.to_datetime(schedule['date'])
schedule.to_csv('../data/schedule.csv', index=False)
