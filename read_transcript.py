import json

with open("C:/Users/trinh/.gemini/antigravity-ide/brain/04a2f95b-76cd-4145-8d72-2d650686c766/.system_generated/logs/transcript.jsonl", "r", encoding="utf-8") as f:
    lines = f.readlines()

with open("model_outputs_utf8.txt", "w", encoding="utf-8") as out:
    for line in lines:
        try:
            data = json.loads(line)
            if data.get("source") == "MODEL" or data.get("type") == "PLANNER_RESPONSE":
                content = data.get("content")
                if content and ("mainNavItems" in content or "DashboardLayout" in content or "Quản lý" in content):
                    out.write(f"=== Step {data.get('step_index')}: {data.get('type')} ===\n")
                    out.write(content + "\n\n")
        except Exception as e:
            pass
