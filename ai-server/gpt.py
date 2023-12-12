
# import subprocess
# def install_requirements():
#     requirements = ['llama_index', 'llama-cpp-python', 'transformers', 'torch', 'tqdm', 'pypdf']
#     for r in requirements:
#         subprocess.run['pip', 'install', r]

import logging
import sys
from llama_index.callbacks import CallbackManager, LlamaDebugHandler
from llama_index.llms import LlamaCPP
from llama_index.llms.llama_utils import messages_to_prompt, completion_to_prompt

def run_model():
    logging.basicConfig(stream=sys.stdout, level=logging.INFO)  # Change INFO to DEBUG if you want more extensive logging
    logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))

    llama_debug = LlamaDebugHandler(print_trace_on_end=True)
    callback_manager = CallbackManager([llama_debug])

    llm = LlamaCPP(
        model_url="https://huggingface.co/TheBloke/Llama-2-13B-chat-GGUF/resolve/main/llama-2-13b-chat.Q5_K_M.gguf",
        
        # optionally, you can set the path to a pre-downloaded model instead of model_url
        model_path=None,
        
        temperature=0.0,
        max_new_tokens=1024,
        
        # llama2 has a context window of 4096 tokens, but we set it lower to allow for some wiggle room
        context_window=3900,  # note, this sets n_ctx in the model_kwargs below, so you don't need to pass it there.
        
        # kwargs to pass to __call__()
        generate_kwargs={},
        
        # kwargs to pass to __init__()
        # set to at least 1 to use GPU
        model_kwargs={"n_gpu_layers": 1}, # I need to play with this and see if it actually helps
        
        # transform inputs into Llama2 format
        messages_to_prompt=messages_to_prompt,
        completion_to_prompt=completion_to_prompt,
        verbose=True,
    )

    # Create an index of your documents
    from llama_index import VectorStoreIndex, SimpleDirectoryReader, ServiceContext

    storage_directory = "./storage"

    documents = SimpleDirectoryReader('./testdata').load_data()

    service_context = ServiceContext.from_defaults(llm=llm, chunk_size=1024,
                                                embed_model="local",
                                                callback_manager=callback_manager)


    index = VectorStoreIndex.from_documents(documents, service_context=service_context)
    # Persist the index to disk
    index.storage_context.persist(persist_dir=storage_directory)

    # Now you can load the index from disk when needed, and not rebuild it each time.
    from llama_index import VectorStoreIndex, SimpleDirectoryReader, ServiceContext
    from llama_index import StorageContext, load_index_from_storage

    # transcript_directory = "transcripts/ancient-aliens-official"
    storage_directory = "./storage"

    service_context = ServiceContext.from_defaults(llm=llm, chunk_size=1024,
                                                embed_model="local",
                                                callback_manager=callback_manager)

    storage_context = StorageContext.from_defaults(persist_dir=storage_directory)
    index = load_index_from_storage(storage_context, service_context=service_context)

    # Query your index!
    from IPython.display import Markdown, display
    from llama_index.prompts import PromptTemplate

    query_engine = index.as_query_engine(service_context=service_context,
                                        similarity_top_k=3)

    query = "Generate 5 multiple choice questions for the activists learning style with answers, regarding PDPA. \n" \
            "Explain why these 5 questions is suitable for activists learner."

    response = query_engine.query(query)
    display(Markdown(f"<b>{response}</b>"))

    # Query your index!
    from IPython.display import Markdown, display
    from llama_index.prompts import PromptTemplate

    query_engine = index.as_query_engine(service_context=service_context,
                                        similarity_top_k=3)

    r_query = "Generate 5 multiple choice questions for the reflector learning style with answers, regarding PDPA. \n" \
            "Explain why these 5 questions is suitable for reflector learner."

    r_response = query_engine.query(r_query)
    display(Markdown(f"<b>{r_response}</b>"))

    # Query your index!
    from IPython.display import Markdown, display
    from llama_index.prompts import PromptTemplate

    query_engine = index.as_query_engine(service_context=service_context,
                                        similarity_top_k=3)

    t_query = "Generate 5 multiple choice questions for the theorist learning style with answers, regarding PDPA. \n" \
            "Explain why these 5 questions is suitable for theorist learner."

    t_response = query_engine.query(t_query)
    display(Markdown(f"<b>{t_response}</b>"))

    # Query your index!
    from IPython.display import Markdown, display
    from llama_index.prompts import PromptTemplate

    query_engine = index.as_query_engine(service_context=service_context,
                                        similarity_top_k=3)

    p_query = "Generate 5 multiple choice questions for the pragmatist learning style with answers, regarding PDPA. \n" \
            "Explain why these 5 questions is suitable for pragmatist learner."

    p_response = query_engine.query(p_query)
    display(Markdown(f"<b>{p_response}</b>"))
    
    all_questions = response + r_response + t_response + p_response
    return all_questions
