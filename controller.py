import sys
import pickle
import numpy as np
import math


#load the model
with open('./price-predict/lin-reg.sav', "rb") as f:
     loaded_model = pickle.load(f)

#convert the data to float, as the model requires this
arg_one = float(sys.argv[1])

#create input
data = [arg_one, 0, 0, 0, 7.5, 4.2, 0, 0, 0, 0, 1, 0]
data = np.reshape(data, (1, -1))

#predict and round
predict = loaded_model.predict(data)
rounded = math.ceil(predict[0])
print(rounded)
