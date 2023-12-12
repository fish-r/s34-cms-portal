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


@app.post("/process")
def process_file(key: str):
    # s3 = boto3.client('s3')
    # s3.download_file('BUCKET_NAME', 'OBJECT_NAME', 'FILE_NAME')
    s3 = boto3.client('s3')
    bucket_name = os.getenv("S3_BUCKET_NAME")
    
    s3.download_file(bucket_name, key, f'../testdata/{key}')

@app.post("/generate")
def generate_questions(key: str):
    try:       
        run_model()
    except:
        return {"Error": "Could not generate questions"}

