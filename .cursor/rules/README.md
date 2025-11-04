# Custom Cursor Rules

This directory contains additional rule files that complement `.cursorrules` in the project root.

## Purpose

While `.cursorrules` contains the main AI agent configuration, you can create additional rule files here for:

- Project-specific coding standards
- Domain-specific patterns
- Team-specific conventions
- Reusable prompts and templates

## File Format

Files in this directory should:

- Use `.md` or `.mdc` extension
- Use Markdown format
- Focus on a specific domain or concern

## Example Files

Example rule files you might create:

- `project-specific.md` - Project-specific rules and conventions
- `api-patterns.md` - API integration patterns
- `testing-standards.md` - Testing conventions
- `performance-guidelines.md` - Performance optimization rules

## Usage

Cursor automatically reads files in this directory and combines them with `.cursorrules` for comprehensive AI guidance.

## Best Practices

1. **Keep files focused**: One concern per file
2. **Reference main rules**: Don't duplicate `.cursorrules` content
3. **Use clear naming**: File names should indicate the domain
4. **Keep updated**: Update rules as standards evolve
