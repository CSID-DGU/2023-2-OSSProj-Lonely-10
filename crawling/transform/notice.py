import pandas as pd

general_notice = pd.read_csv('../raw_data/general_notice.csv')
haksa_notice = pd.read_csv('../raw_data/haksa_notice.csv')
janghak_notice = pd.read_csv('../raw_data/janghak_notice.csv')

general_notice.date = pd.to_datetime(general_notice.date)
haksa_notice.date = pd.to_datetime(haksa_notice.date)
janghak_notice.date = pd.to_datetime(janghak_notice.date)

general_notice['type'] = "일반"
haksa_notice['type'] = "학사"
janghak_notice['type'] = "장학"

notice = pd.concat([general_notice, haksa_notice, janghak_notice], axis=0)

notice.to_csv('../data/notice.csv', index=False)
