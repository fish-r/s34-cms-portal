from fastapi import FastAPI
from gpt import run_model
from dotenv import load_dotenv
import os
import boto3

load_dotenv()

app = FastAPI()



@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/process/{key}")
def process_file(key: str):
    # s3 = boto3.client('s3')
    # s3.download_file('BUCKET_NAME', 'OBJECT_NAME', 'FILE_NAME')
    try:
        s3 = boto3.client('s3')
        bucket_name = os.getenv("S3_BUCKET_NAME")
        s3.download_file(bucket_name, key, f'./testdata/{key}')
        response = generate_questions()
        print(response)
        return {"body": response}
    
    except Exception as e:
        print(e)
        return {"Error": e}
        

@app.post("/generate")
def generate_questions():
    try:       
        response = run_model()
        return {"body": response}
    
    except Exception as e:
        return {"Error": e}

