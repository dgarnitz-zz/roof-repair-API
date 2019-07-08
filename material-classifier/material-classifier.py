import numpy as np

from tensorflow.keras.models import Model
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

#testing keras model
model = load_model('ResNet50.h5')
# model.summary() # # to check that it loaded

# tell the model what cost and optimization method to use
model.compile(
  loss='categorical_crossentropy',
  optimizer='rmsprop',
  metrics=["acc"]
)

# predicting images
img = image.load_img('../uploads/test.jpg', target_size=(200, 200))
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)

images = np.vstack([x])
pred = model.predict(images, batch_size=1)
material = np.argmax(pred, axis=1)


# for item in pred:
#     print(item)


print(pred)

print("The material of the roof is: ")
print(material)
