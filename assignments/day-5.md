### 5.1 Capstone Project - Phase 1 [RAG Layer]

- Start the cis_basic project
- Ref: 17-capstone-part-1\cis-basic

-------------------------------------------------------------------
16:10 - 16:25 Exercise 5.1
-------------------------------------------------------------------

### 5.2 Capstone Project - Phase 2 [Tools Layer]

- NVD API key - generate one
- Generating a cis_tool and lookup_nve tool
- Test the tools individually

-------------------------------------------------------------------
16:35 - 16:50 Exercise 5.2
-------------------------------------------------------------------

### 5.3 Capstone Project - Phase 3 [Agent Layer]

- Run the rest of the notebook
- Agents, Nodes, Workflow and Invocations

-------------------------------------------------------------------
5:05 - 5:20 Break
5:20 - 5:30 Exercise 5.3
-------------------------------------------------------------------

### 5.4 Capstone Project - Phase 4 [Assignment][20]

- Ref: 32-agentic-capstone-assignments\Assignment_Extending_Agentic_Cyber_Security_Assistant_v2.1.md
- TOOLS: CIS, NVD, MITRE, EPSS, CISA-KEV
- cyber_agent = create_agent(TOOLS, LLM, SYSTEM_PROMPT)
- Test all the 10 queries

Deliverable:

report.txt
    -query: Show known exploited vulnerabilities affecting Windows SMB.
    -response: <response from cyber_agent>


### 5.5 Capstone Project - Phase 5 [Assignment][30]

- Ref: 31-mcp-demo\flowise-fast-mcp-capstone.png
- Collect all the tools to form a MCP server
  - Ref: 31-mcp-demo\mcp_cyber_tools_server.py
- Create a MCP client
  - Ref: 31-mcp-demo\mcp-cyber-client.py
- Run the MCP client
  - CMD: python mcp-cyber-client.py
- Test 4 to 5 queries and report

report.txt
    -query: Show known exploited vulnerabilities affecting Windows SMB.
    -response: <response from cyber_agent>

-----------------------------------------------------------------------------------

SharePoint Submissions:

    - <fname>_<sname>
      - 5.4
        - agentic-capstone-part-2.ipynb [Completed]
        - report.txt [10 tests]
      - 5.5
        - mcp_cyber_tools_server.py
        - mcp-cyber-client.py
        - report.txt [Atleast 4]