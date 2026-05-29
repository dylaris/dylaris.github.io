import os
import json
import re
from pathlib import Path

def parse_post_metadata(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the entire post-header region
    header_pattern = r'<header[^>]*class="post-header"[^>]*>(.*?)</header>'
    header_match = re.search(header_pattern, content, re.DOTALL)

    if not header_match:
        raise ValueError(f"post-header not found in {filepath}")

    header_content = header_match.group(1)

    # Extract h1 title
    title_match = re.search(r'<h1>(.*?)</h1>', header_content, re.DOTALL)
    if not title_match:
        raise ValueError(f"h1 not found in post-header of {filepath}")
    title = title_match.group(1).strip()

    # Extract date
    date_match = re.search(r'<span[^>]*class="date"[^>]*>(.*?)</span>', header_content)
    if not date_match:
        raise ValueError(f"date not found in post-header of {filepath}")
    date = date_match.group(1).strip()

    # Extract author (optional)
    author_match = re.search(r'<span[^>]*class="author"[^>]*>(.*?)</span>', header_content)
    author = author_match.group(1).strip() if author_match else ''

    # Extract category (optional)
    category_match = re.search(r'<span[^>]*class="category"[^>]*>(.*?)</span>', header_content)
    category = category_match.group(1).strip() if category_match else ''

    return {
        'file': Path(filepath).name,
        'title': title,
        'date': date,
        'author': author,
        'category': category
    }

def generate_index_json(posts_dir='posts', output_file='posts/index.json'):
    posts = []
    posts_path = Path(posts_dir)

    if not posts_path.exists():
        print(f"Directory {posts_dir} not found")
        return

    for filepath in sorted(posts_path.glob('*.html'), reverse=True):
        try:
            metadata = parse_post_metadata(filepath)
            posts.append(metadata)
        except ValueError as e:
            print(f"Error parsing {filepath}: {e}")
            continue

    # Ensure output directory exists
    Path(output_file).parent.mkdir(parents=True, exist_ok=True)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    print(f"Generated {output_file} with {len(posts)} posts")

if __name__ == '__main__':
    generate_index_json()
