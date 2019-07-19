import sys
import pickle
import numpy as np
import pandas as pd
import math
import ast
from material_classifier.material_classifier import classifyMaterial
from slope_classifier.slope_classifier import classifySlope
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split


#load the model
with open('./price-predict/randomforest.sav', "rb") as f:
     loaded_model = pickle.load(f)

#convert the data to float, as the model requires this
location = float(sys.argv[2])

#convert arguments passed as string array to array of floats
season = sys.argv[1]
season = ast.literal_eval(season)       #this line specifically converts the string into a list
seasons = [float(i) for i in season]    #this turns each item in the list into a float

#classify the slope - steep or normal
slope = classifySlope()

#classify the material
material = classifyMaterial()

#create input to regression model
seasons.extend([8.21, 3.9])
seasons.extend(slope)
seasons.extend([0])
seasons.extend(material)
seasons.append(location)
data = seasons
data = np.reshape(data, (1, -1))

#predict and round
predict = loaded_model.predict(data)
rounded = math.ceil(predict[0])
print(rounded)


