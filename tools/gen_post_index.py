import os
import json
import re
from pathlib import Path

def parse_post_metadata(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract title from comment
    title_match = re.search(r'<!--\s*title:\s*(.+?)\s*-->', content)
    date_match = re.search(r'<!--\s*date:\s*(.+?)\s*-->', content)

    title = title_match.group(1) if title_match else Path(filepath).stem.replace('-', ' ').title()
    date = date_match.group(1) if date_match else ''

    return {
        'file': Path(filepath).name,
        'title': title,
        'date': date
    }

def generate_index_json(posts_dir='posts', output_file='posts/index.json'):
    posts = []
    posts_path = Path(posts_dir)

    if not posts_path.exists():
        print(f"Directory {posts_dir} not found")
        return

    for filepath in sorted(posts_path.glob('*.html'), reverse=True):
        metadata = parse_post_metadata(filepath)
        posts.append(metadata)

    # Ensure output directory exists
    Path(output_file).parent.mkdir(parents=True, exist_ok=True)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f"Generated {output_file} with {len(posts)} posts")

if __name__ == '__main__':
    generate_index_json()
