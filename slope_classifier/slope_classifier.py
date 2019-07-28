import numpy as np

from keras.models import Model
from keras.models import load_model
from keras.preprocessing import image

#this method grabs an image of a roof saved Multer, then uses it as input in a model that classifies whether 
#it has a steep or normal slope, then returns a feature vector representing that
def classifySlope(): 
    
    #Load keras model
    model = load_model('/cs/home/dag8/Documents/Dissertation/Code/API/slope_classifier/ResNet50.h5') 
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
    slope = np.argmax(pred, axis=1)

    return slope






