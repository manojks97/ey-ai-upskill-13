import os

import requests

url = "http://localhost:7860/api/v2/workflows"
payload = {
    "flow_id": "eef87fb7-0ffe-4987-9be8-2e17813b7eb0",
    "input_value": "what are the windows password requirements for a strong password?"
}
headers = {
    "Content-Type": "application/json",
    "x-api-key": "sk-qNz-70oQVfAE8wvyRadRAVpwVDbfBtxcj_ivZNHx_Ow",
}

response = requests.post(url, json=payload, headers=headers)
response.raise_for_status()
result = response.json()

# The text reply is in output.text:
print(result["output"]["text"])