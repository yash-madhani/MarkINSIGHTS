from dotenv import load_dotenv
import os
# Load .env file
load_dotenv()
# Get OpenAI keys from .env file
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")


from langchain import PromptTemplate
from langchain_community.chat_models import ChatOpenAI
from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser
model = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

def generate_caption(product:str):
    instagram_schema=ResponseSchema(
        name="insta_caption",
        description="This is the instagram caption for the given product'ad.It should contain about 20-30 words"
    )
    facebook_schema=ResponseSchema(
        name="facebook_caption",
        description="This is the facebook caption for the given product'ad.It should contain about 20-30 words"
    )
    gmail_schema=ResponseSchema(
        name="facebook_caption",
        description="This is the gmail for the given product'ad.It should contain about 150-250 words."
    )
    response_schema=[instagram_schema,facebook_schema,gmail_schema]
    output_parser=StructuredOutputParser.from_response_schemas(response_schema)
 
  
    format_instructions=output_parser.get_format_instructions()
    prompt_template="""
            Do not generate any random symbol.Every word should be meaningful.
            Generate a caption for the given product's ad for {product}. The caption should be catchy and should be suitable.
            {format_instructions}
            """ 

    prompt =PromptTemplate(
    input_variables=["product"],
    template=prompt_template,
     partial_variables={"format_instructions": output_parser.get_format_instructions()},
)
   
    return model.invoke(prompt.format(product=product))

