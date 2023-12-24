from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np

model = tf.keras.models.load_model("leafmodel.h5")

app = Flask(__name__)


@app.route('/classify', methods=['POST'])
def classify_image():
    image_file = request.files['image']

    image = Image.open(image_file)
    image = image.resize((224, 224))
    image = image.convert("RGB")
    # image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)

    predictions = model.predict(image)
    predicted_class = np.argmax(predictions)

    classes = ['Aloe', 'Apple', 'Basil', 'Betel', 'Biling', 'Cherry', 'Coconut', 'Corn', 'Curry Leaves', 'Drumstick Leaves', 'Grapes', 'Jackfruit',
               'Kalukammeriya', 'Lime', 'Mango', 'Papaya', 'Potato', 'Rampe', 'Rose', 'Seledri', 'Spinach', 'Tea', 'Thampala', 'Tomato', 'guava']
    response = {
        'predicted_class': classes[int(predicted_class)],
        'probabilities': predictions.tolist()[0],
        'confidence': predictions.tolist()[0][int(predicted_class)]
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
