import sys
import pickle
import numpy as np

#print("Python script is running")

with open('./price-predict/lin-reg.sav', "rb") as f:
     loaded_model = pickle.load(f)

data = [1, 0, 0, 0, 7.5, 4.2, 0, 0, 0, 0, 1, 0]
data = np.reshape(data, (1, -1))
predict = loaded_model.predict(data)
print(predict[0])

# print(sys.argv[1])
#sys.stdout.flush()