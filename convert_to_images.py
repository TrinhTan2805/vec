import base64
import re

with open('tailieu/flowdata.md', 'r', encoding='utf-8') as f:
    content = f.read()

def replace(match):
    code = match.group(1).strip()
    # Mermaid.ink expects base64 encoded string
    encoded = base64.b64encode(code.encode('utf-8')).decode('utf-8')
    url = f'https://mermaid.ink/img/{encoded}?theme=default'
    return f'![Sơ đồ Luồng Dữ liệu]({url})\n\n*(Ảnh Render tự động bởi Hệ thống)*'

new_content = re.sub(r'```mermaid\n(.*?)\n```', replace, content, flags=re.DOTALL)

with open('tailieu/flowdata.md', 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("Successfully replaced mermaid blocks with image tags!")
