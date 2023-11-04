import pandas as pd

data = pd.read_excel('raw_data/instruction.xlsx')
print(data)
data.to_csv('raw_data/instruction.csv', index=False)