import os
import re

mapping = {
    'about.html': 'about_overlap1.png',
    'programs.html': 'kid-learning-garden.jpg',
    'admissions.html': 'close-up-boy-helping-with-gardening.jpg',
    'campus.html': 'campus_outdoor.png',
    'events.html': 'blog_event1.png',
    'contact.html': 'campus_playground.png',
    'toddler-nest.html': 'program_toddler.png',
    'thriving-garden.html': 'program_preschool.png',
    'cosmic-education.html': 'program_kindergarten.png'
}

for filename, img in mapping.items():
    path = os.path.join(r'e:\Websites\budhi minds', filename)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = re.sub(
            r'<section class="page-intro"([^>]*)>',
            rf'<section class="page-intro"\1 style="--hero-bg: url(\'../images/{img}\');">',
            content,
            count=1
        )
        
        if content != new_content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
