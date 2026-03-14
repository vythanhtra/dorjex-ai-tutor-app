"""
Content Migration Script
Migrate DorjeX AI Tutor content from YAML/MD files to database

Usage:
    python migrate_content.py --dry-run  # Preview changes
    python migrate_content.py            # Execute migration
"""

import os
import re
import yaml
import json
from pathlib import Path
from typing import Dict, List, Any
import argparse


class ContentMigrator:
    def __init__(self, content_dir: str, dry_run: bool = False):
        self.content_dir = Path(content_dir)
        self.dry_run = dry_run
        self.stats = {
            "modules": 0,
            "lessons": 0,
            "quizzes": 0,
            "questions": 0,
            "reflex_mappings": 0
        }
    
    def migrate_all(self):
        """Migrate all content"""
        print("🚀 Starting content migration...")
        print(f"📁 Content directory: {self.content_dir}")
        print(f"🔍 Dry run: {self.dry_run}\n")
        
        # 1. Parse module content map
        modules = self.parse_module_map()
        print(f"✅ Found {len(modules)} modules\n")
        
        # 2. Parse lessons
        lessons = self.parse_lessons()
        print(f"✅ Found {len(lessons)} lessons\n")
        
        # 3. Parse quizzes
        quizzes = self.parse_quizzes()
        print(f"✅ Found {len(quizzes)} quizzes\n")
        
        # 4. Parse reflex mappings
        reflex_mappings = self.parse_reflex_mappings()
        print(f"✅ Found {len(reflex_mappings)} reflex mappings\n")
        
        # 5. Generate SQL or JSON output
        if self.dry_run:
            self.preview_migration(modules, lessons, quizzes, reflex_mappings)
        else:
            self.execute_migration(modules, lessons, quizzes, reflex_mappings)
        
        # 6. Print stats
        self.print_stats()
    
    def parse_module_map(self) -> List[Dict]:
        """Parse module_content_map_UPDATED.yaml"""
        map_file = self.content_dir / "module_content_map_UPDATED.yaml"
        
        if not map_file.exists():
            print(f"⚠️  Module map not found: {map_file}")
            return []
        
        with open(map_file, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        
        modules = []
        
        # Extract module info from YAML
        # Format depends on actual YAML structure
        # This is a placeholder - adjust based on actual file
        for i in range(1, 24):  # M1-M23
            module_id = f"M{i}"
            modules.append({
                "id": module_id,
                "title": f"Module {i}",  # Extract from YAML
                "description": "",
                "level": "L1",  # Extract from YAML
                "order_index": i,
                "is_published": True
            })
        
        self.stats["modules"] = len(modules)
        return modules
    
    def parse_lessons(self) -> List[Dict]:
        """Parse lesson_m*.md files"""
        lessons = []
        
        lesson_files = sorted(self.content_dir.glob("lesson_m*.md"))
        
        for lesson_file in lesson_files:
            # Extract module ID from filename
            match = re.search(r'lesson_m(\d+)_', lesson_file.name)
            if not match:
                continue
            
            module_num = int(match.group(1))
            module_id = f"M{module_num}"
            
            # Read lesson content
            with open(lesson_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract title from first heading
            title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
            title = title_match.group(1) if title_match else f"Lesson M{module_num}"
            
            lessons.append({
                "module_id": module_id,
                "title": title,
                "content": content,
                "order_index": 1,  # Assuming 1 lesson per module for now
                "estimated_time": 60  # Default 60 minutes
            })
        
        self.stats["lessons"] = len(lessons)
        return lessons
    
    def parse_quizzes(self) -> List[Dict]:
        """Parse quiz_m*.yaml files"""
        quizzes = []
        
        quiz_files = sorted(self.content_dir.glob("quiz_m*.yaml"))
        
        for quiz_file in quiz_files:
            # Extract module ID from filename
            match = re.search(r'quiz_m(\d+)', quiz_file.name)
            if not match:
                continue
            
            module_num = int(match.group(1))
            module_id = f"M{module_num}"
            
            # Read quiz YAML
            with open(quiz_file, 'r', encoding='utf-8') as f:
                quiz_data = yaml.safe_load(f)
            
            # Extract questions
            questions = []
            if 'questions' in quiz_data:
                for q in quiz_data['questions']:
                    questions.append({
                        "question_text": q.get('text', ''),
                        "options": q.get('options', []),
                        "correct_answer": q.get('correct', ''),
                        "explanation": q.get('explanation', '')
                    })
            
            quizzes.append({
                "module_id": module_id,
                "passing_score": quiz_data.get('passing_score', 80),
                "questions": questions
            })
            
            self.stats["quizzes"] += 1
            self.stats["questions"] += len(questions)
        
        return quizzes
    
    def parse_reflex_mappings(self) -> List[Dict]:
        """Parse reflex_mapping_m*.yaml files"""
        mappings = []
        
        reflex_files = sorted(self.content_dir.glob("reflex_mapping_m*.yaml"))
        
        for reflex_file in reflex_files:
            # Extract module ID from filename
            match = re.search(r'reflex_mapping_m(\d+)', reflex_file.name)
            if not match:
                continue
            
            module_num = int(match.group(1))
            module_id = f"M{module_num}"
            
            # Read reflex YAML
            with open(reflex_file, 'r', encoding='utf-8') as f:
                reflex_data = yaml.safe_load(f)
            
            mappings.append({
                "module_id": module_id,
                "reflex_data": reflex_data
            })
            
            self.stats["reflex_mappings"] += 1
        
        return mappings
    
    def preview_migration(self, modules, lessons, quizzes, reflex_mappings):
        """Preview migration without executing"""
        print("\n" + "="*60)
        print("📋 MIGRATION PREVIEW (Dry Run)")
        print("="*60 + "\n")
        
        print("📚 Modules:")
        for module in modules[:3]:  # Show first 3
            print(f"  - {module['id']}: {module['title']}")
        print(f"  ... and {len(modules) - 3} more\n")
        
        print("📖 Lessons:")
        for lesson in lessons[:3]:
            print(f"  - {lesson['module_id']}: {lesson['title'][:50]}...")
        print(f"  ... and {len(lessons) - 3} more\n")
        
        print("📝 Quizzes:")
        for quiz in quizzes[:3]:
            print(f"  - {quiz['module_id']}: {len(quiz['questions'])} questions")
        print(f"  ... and {len(quizzes) - 3} more\n")
        
        print("🔄 Reflex Mappings:")
        for mapping in reflex_mappings[:3]:
            print(f"  - {mapping['module_id']}")
        print(f"  ... and {len(reflex_mappings) - 3} more\n")
        
        print("💡 To execute migration, run without --dry-run flag")
    
    def execute_migration(self, modules, lessons, quizzes, reflex_mappings):
        """Execute actual migration"""
        print("\n" + "="*60)
        print("🚀 EXECUTING MIGRATION")
        print("="*60 + "\n")
        
        # Generate JSON output for now
        # In production, this would insert into database
        output_dir = Path("../backend/seed_data")
        output_dir.mkdir(exist_ok=True)
        
        # Save modules
        with open(output_dir / "modules.json", 'w', encoding='utf-8') as f:
            json.dump(modules, f, indent=2, ensure_ascii=False)
        print(f"✅ Saved {len(modules)} modules to modules.json")
        
        # Save lessons
        with open(output_dir / "lessons.json", 'w', encoding='utf-8') as f:
            json.dump(lessons, f, indent=2, ensure_ascii=False)
        print(f"✅ Saved {len(lessons)} lessons to lessons.json")
        
        # Save quizzes
        with open(output_dir / "quizzes.json", 'w', encoding='utf-8') as f:
            json.dump(quizzes, f, indent=2, ensure_ascii=False)
        print(f"✅ Saved {len(quizzes)} quizzes to quizzes.json")
        
        # Save reflex mappings
        with open(output_dir / "reflex_mappings.json", 'w', encoding='utf-8') as f:
            json.dump(reflex_mappings, f, indent=2, ensure_ascii=False)
        print(f"✅ Saved {len(reflex_mappings)} reflex mappings to reflex_mappings.json")
        
        print(f"\n📁 Output directory: {output_dir.absolute()}")
    
    def print_stats(self):
        """Print migration statistics"""
        print("\n" + "="*60)
        print("📊 MIGRATION STATISTICS")
        print("="*60)
        print(f"Modules:          {self.stats['modules']}")
        print(f"Lessons:          {self.stats['lessons']}")
        print(f"Quizzes:          {self.stats['quizzes']}")
        print(f"Quiz Questions:   {self.stats['questions']}")
        print(f"Reflex Mappings:  {self.stats['reflex_mappings']}")
        print("="*60 + "\n")


def main():
    parser = argparse.ArgumentParser(description='Migrate DorjeX AI Tutor content')
    parser.add_argument('--dry-run', action='store_true', help='Preview migration without executing')
    parser.add_argument('--content-dir', default='../content', help='Content directory path')
    
    args = parser.parse_args()
    
    migrator = ContentMigrator(args.content_dir, dry_run=args.dry_run)
    migrator.migrate_all()
    
    print("✨ Migration complete!")


if __name__ == "__main__":
    main()
