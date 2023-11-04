import pandas as pd

data = pd.read_excel('data/instruction.xlsx')
print(data)
data.to_csv('data/instruction.csv', index=False)