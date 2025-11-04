# Project-Specific Rules

This file contains rules and conventions specific to this project.

## Project Context

Customize this file for your project's specific needs:

- Business logic patterns
- Domain-specific terminology
- Project architecture decisions
- Team conventions

## Example Rules

```markdown
## API Integration

- All API calls must use the centralized API client
- Error handling must follow the standard error format
- API responses must be typed with TypeScript interfaces

## State Management

- Use React Context for theme and user preferences
- Use Zustand for complex global state
- Avoid prop drilling beyond 3 levels

## Component Patterns

- Feature components go in `features/` directory
- Shared components in `components/`
- Each component must have a corresponding test file
```

## Maintenance

Update this file as project standards evolve. Reference the main `.cursorrules` for general standards and add project-specific extensions here.

