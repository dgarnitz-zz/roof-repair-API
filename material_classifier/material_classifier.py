import numpy as np

from keras.models import Model
from keras.models import load_model
from keras.preprocessing import image

#this method grabs an image of a roof saved Multer, then uses it as input in a model that classifies whether 
#it is made of asphalt, clay, wood or metal, then returns a feature vector representing that
def classifyMaterial(): 
    
    #Load keras model
    model = load_model('/cs/home/dag8/Documents/Dissertation/Code/API/material_classifier/ResNet50.h5') 
    # model.summary() # # to check that it loaded

    # tell the model what cost and optimization method to use
    model.compile(
    loss='categorical_crossentropy',
    optimizer='rmsprop',
    metrics=["acc"]
    )

    # predicting images
    img = image.load_img('/cs/home/dag8/Documents/Dissertation/Code/API/uploads/test.jpg', target_size=(200, 200))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)

    images = np.vstack([x])
    pred = model.predict(images, batch_size=1)
    material = np.argmax(pred, axis=1)

    
    #convert the material into a one-hot encoded array that will be used in the regression
    if material == [0]:        #asphalt
        return [1, 0, 0, 0]
    elif material == [1]:      #clay
        return [0, 0, 0, 1]
    elif material == [2]:
        return [0, 0, 1, 0]    #metal
    else:
        return [0, 1, 0, 0]    #wood


