import asyncio
from dotenv import load_dotenv

from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain_mcp_adapters.client import MultiServerMCPClient

load_dotenv()

with open(r"C:\Users\user\manoj-ai\work\key_vault\openai\api.key") as f:
    openai_api_key = f.read().strip()

async def main():

    client = MultiServerMCPClient(
        {
            "cyber": {
                "transport": "stdio",
                "command": "python",
                "args": ["mcp_cyber_tools_server.py"],
            }
        }
    )

    tools = await client.get_tools()

    print("\nAvailable Tools\n----------------")
    for t in tools:
        print(t.name)

    llm = ChatOpenAI(
        model="gpt-4.1",
        api_key=openai_api_key,
        temperature=0,
    )

    agent = create_agent(
        model=llm,
        tools=tools,
    )

    response = await agent.ainvoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": (
                        "How can I secure Windows SMB against recent attacks?"
                    ),
                }
            ]
        }
    )

    print("\n===========================")
    print(response["messages"][-1].content)

if __name__ == "__main__":
    asyncio.run(main())