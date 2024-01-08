import datetime
from fastapi import FastAPI, BackgroundTasks, status
from gpt import run_model
from dotenv import load_dotenv
import os
import boto3
import requests

load_dotenv()

app = FastAPI()



@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/process/{key}")
async def handle_process_file(key: str, background_tasks: BackgroundTasks):
    try:
        background_tasks.add_task(process_file, key)
        return {"task": "processing","status": "started", "started_at": datetime.datetime.now() }
    
    except Exception as e:
        print(e)
        return {"error": e, "message": "Failed to start processing"}
        

@app.post("/generate")
def generate_questions():
    """ Endpoint for single synchronous generate question request """
    try:       
        response = run_model()
        return {"body": response}
    
    except Exception as e:
        return {"error": e}


#
def process_file(key: str):
    """ Runs the model and processes the file, returns the questions generated"""
    try:
        # s3.download_file('BUCKET_NAME', 'OBJECT_NAME', 'FILE_NAME')
        s3 = boto3.client("s3")
        bucket_name = os.getenv("S3_BUCKET_NAME")
        s3.download_file(bucket_name, key, f'./testdata/{key}')
        # response = generate_questions()
        # print(response)
        dummy = {"question1": "test"}
        send_processing_complete(dummy)
    except Exception as e:
        send_processing_failed(e)
    
        
def  send_processing_complete(questions:dict):
    """ Sends a webhook request to CMS Server to notify completion of processing """
    url = "http://localhost:3001/api/v1/content/webhook"
    data = {
        "task": "process", 
        "status":"complete",
        "completed_at": datetime.datetime.now(),
        "questions": questions
    }
    response = requests.post(url, data=data)
    print(response.json())
    
def send_processing_failed(error: str):
    """ Sends a webhook request to CMS Server to notify of a webhook failure """
    url = "http://localhost:3001/api/v1/content/webhook"
    data = {
        "task": "process",
        "status": "failed",
        "failed_at": datetime.datetime.now(),
        "error": error
    }
    response = requests.post(url, data=data)
    print(response.json)