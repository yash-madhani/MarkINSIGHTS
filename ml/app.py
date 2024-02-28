from flask import Flask, request, jsonify 
from flask_cors import CORS
import requests
import base64
from flask import Flask, render_template, request
import pandas as pd
import joblib
import json 
import os
from collections import Counter
# from flask_mail import Mail, Message

from dotenv import load_dotenv
load_dotenv()

clustering_model = joblib.load('clustering.joblib')
encoder = joblib.load('encoder.joblib')

import brochure_generator 
import caption_generator
import locations

app = Flask(__name__)
CORS(app)

API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
headers = {"Authorization": "Bearer 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"}

def slice_json(content):
    start_index = content.find('{')
    end_index = content.rfind('}')
    json_part = content[start_index:end_index+1]
    # print(json_part)
    unescaped_json_string = json_part.encode().decode('unicode_escape')
    print(unescaped_json_string)
    json_data = json.loads(unescaped_json_string)
    return json_data



def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.content



@app.route('/generate/image', methods=['POST'])
def generate_code():
    data = request.get_json()
    text = data["text"]
    input = {"inputs": text}
    response = query(input)
    encoded_string = base64.b64encode(response)
    output = {"image": encoded_string.decode("utf-8")}
    return jsonify(output)


@app.route('/upload', methods=['POST'])
def upload_file():
    # Get the uploaded file
    uploaded_file = request.files['file']

    if uploaded_file:
        # Load the user-uploaded data into a DataFrame
        user_data = pd.read_csv(uploaded_file)
        user_data = user_data.drop(columns='CustomerID')
        # email_data = user_data['Email'].to_json(orient='records')
        # # email_data = email_data.to_array()
        # print(email_data)
        # user_data = user_data.drop(columns='Email')
        # print(user_data)
        # Check if the required column is present in the user-uploaded data
        if 'Gender' in user_data.columns:
            # Apply label encoding to the relevant column
            gender_data = user_data[['Gender']]
            # Apply OneHotEncoder to the 'Gender' column
            encoded_gender = encoder.transform(gender_data)
            # print(encoded_gender.toarray())
            to_arr=encoded_gender.toarray()
            # Assign the transformed data back to the 'Gender' column in user_data
            user_data['Gender'] = to_arr[:,0]
            # print(to_arr[:,0])
            # print(user_data)
            # Use the clustering model to make predictions
            predictions = clustering_model.predict(user_data)
            # Optionally, you can return or process the predictions as needed
            my_arr = predictions.tolist()
            counts = Counter(my_arr)
            # print(counts)
            indices_of_zero = [i for i, x in enumerate(my_arr) if x == 0]
            indices_of_one = [i for i, x in enumerate(my_arr) if x == 1]
            indices_of_two = [i for i, x in enumerate(my_arr) if x == 2]
            indices_of_three = [i for i, x in enumerate(my_arr) if x == 3]
            indices_of_four = [i for i, x in enumerate(my_arr) if x == 4]
            indices_of_five = [i for i, x in enumerate(my_arr) if x == 5]
            output = {"predictions": predictions.tolist(), "count_0": counts[0], "count_1": counts[1], "count_2": counts[2], "count_3": counts[3], "count_4": counts[4], "count_5": counts[5], "indices_of_0": indices_of_zero,"indices_of_1": indices_of_one, "indices_of_2": indices_of_two, "indices_of_3": indices_of_three, "indices_of_4": indices_of_four, "indices_of_5": indices_of_five}
            return jsonify(output)

        else:
            return "Error: 'Category' column not found in the uploaded file."

    return "Error: No file uploaded."


@app.route('/generate/brochure', methods=['POST'])
def generate_brochure():
    data = request.get_json()
    output = brochure_generator.generate_brochure(data["product"], data["income_tier"])
    string_output= str(output)
    response=slice_json(string_output)
    return response

@app.route('/generate/caption', methods=['POST'])
def generate_caption():
    data = request.get_json()
    output =caption_generator.generate_caption(data["product"])
    string_output= str(output)
    response=slice_json(string_output)
    return response

@app.route('/locations', methods=['POST'])
def location():
    data = request.get_json()
    my_list = data["list"]
    output = {"data": locations.get_locations(my_list)}
    output = {"data": locations.get_locations(data["list"])}
    return jsonify(output)

                  
if __name__ == "__main__":
  app.run(port=5000) 