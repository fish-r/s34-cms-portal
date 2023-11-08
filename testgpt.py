import os
import sys

import transformers
from transformers import AutoModelForSequenceClassification, AutoTokenizer

from llama_index import Document, VectorStoreIndex, SimpleDirectoryReader
import openai

os.environ['OPENAI_API_KEY'] = 'sk-...'

# Load the hugging face model
openai.api_key = os.environ["OPENAI_API_KEY"]
model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased")
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

# Create a Document object for each text file in the directory
documents = SimpleDirectoryReader('./testdata').load_data()


# Create a GPTVectorStoreIndex object from a list of Document objects
index = VectorStoreIndex.from_documents(documents)

# Index the documents
index.index()


# Query the index
query = "What is the capital of France?"
predictions = index.query(query)

# Print the predictions
for prediction in predictions:
    print(prediction)