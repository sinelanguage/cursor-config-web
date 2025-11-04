# Development Workflows

## Git Branching Strategy

### Main Branch Strategy

We use a **GitHub Flow** approach with main branches and feature branches:

```mermaid
graph LR
    A[main] --> B[feature/user-auth]
    A --> C[feature/dashboard]
    A --> D[bugfix/login-error]
    
    B --> E[Pull Request]
    C --> F[Pull Request]
    D --> G[Pull Request]
    
    E --> A
    F --> A
    G --> A
    
    style A fill:#4CAF50
    style E fill:#2196F3
    style F fill:#2196F3
    style G fill:#2196F3
```

### Branch Naming Conventions

```text
<type>/<description>

Types:
- feature/    - New features
- bugfix/     - Bug fixes
- hotfix/     - Critical production fixes
- refactor/   - Code refactoring
- docs/       - Documentation updates
- test/       - Adding/updating tests
- perf/       - Performance improvements
- a11y/       - Accessibility improvements
```

**Examples:**

- `feature/user-authentication`
- `bugfix/memory-leak-in-chart`
- `hotfix/critical-xss-vulnerability`
- `refactor/extract-api-service`
- `docs/update-installation-guide`

### Branch Lifecycle

1. **Create branch from main**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/my-feature
   ```

2. **Make commits** (see Commit Convention)

   ```bash
   git add .
   git commit -m "feat: add user login component"
   ```

3. **Push and create PR**

   ```bash
   git push -u origin feature/my-feature
   # Create PR on GitHub/GitLab
   ```

4. **Merge after review and CI passes**

5. **Delete branch** (auto-deleted after merge)

## Commit Convention

### Conventional Commits

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Adding/updating tests
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes
- `build:` - Build system changes
- `a11y:` - Accessibility improvements
- `security:` - Security fixes

### Scope (Optional)

- `button`, `modal`, `api`, `auth`, etc.

### Examples

```text
feat(button): add loading state to primary button

Add spinner animation when button is in loading state.
Uses Heroicons Spinner component for consistency.

Closes #123

---
refactor(api): extract API client to separate module

Improve code organization by moving API client logic
to services/api/client.ts for better maintainability.
```

## Pull Request Checklist

### Before Opening PR

- [ ] Code follows project style guidelines
- [ ] Self-reviewed code
- [ ] Tests added/updated and passing
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] No security vulnerabilities (Snyk scan passes)
- [ ] Accessibility tested (axe-core passes)
- [ ] Storybook stories added/updated
- [ ] Documentation updated if needed
- [ ] Commit messages follow convention
- [ ] Changelog updated (for releases or significant merges)

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)

## Related Issues
Closes #[issue-number]

## Additional Notes
Any additional context or information
```

### Code Review Standards

**Review Focus Areas:**

1. Code quality and readability
2. Type safety and TypeScript usage
3. Component patterns and architecture
4. Performance implications
5. Accessibility compliance
6. Security considerations
7. Test coverage
8. Documentation

**Review Checklist:**

- [ ] Code follows React best practices
- [ ] Proper TypeScript types (no `any`)
- [ ] No unnecessary re-renders
- [ ] Accessible semantic HTML
- [ ] ARIA attributes used correctly
- [ ] No security vulnerabilities introduced
- [ ] Bundle size impact acceptable
- [ ] Test coverage adequate
- [ ] Code is maintainable and documented

## CI/CD Pipeline

### GitHub Actions Workflows

**CI Workflow** (`ci.yml`):

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:ci
      - run: npm run build
```

**Security Workflow** (`security.yml`):

```yaml
name: Security Scan

on: [push, pull_request]

jobs:
  snyk:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
```

**A11y Workflow** (`a11y.yml`):

```yaml
name: Accessibility

on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:a11y
      - uses: pa11y/pa11y-ci-action@v1
```

### GitLab CI Configuration

**`.gitlab-ci.yml`**:

```yaml
stages:
  - lint
  - test
  - security
  - build

lint:
  stage: lint
  script:
    - npm ci
    - npm run lint
    - npm run type-check

test:
  stage: test
  script:
    - npm ci
    - npm run test:ci -- --coverage
  coverage: '/(?<statements>\d+\.\d+%) covered/'

security:
  stage: security
  script:
    - snyk test --severity-threshold=high

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
```

## Release Process

### Semantic Versioning

Follow [SemVer](https://semver.org/): `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Workflow

1. **Prepare release branch**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b release/v1.2.0
   ```

2. **Update version and changelog**

   ```bash
   # Update CHANGELOG.md with new version entry
   # Follow Keep a Changelog format (see CHANGELOG.md)
   
   npm version minor  # or patch, major
   # This updates package.json and creates a commit
   ```

3. **Create release PR**
   - Include changelog updates in PR
   - Merge to main
   - CI/CD runs full test suite

4. **Tag release (MANDATORY)**

   ```bash
   # Tag MUST follow SemVer format: vMAJOR.MINOR.PATCH
   git tag v1.2.0
   git push origin v1.2.0
   
   # Verify tag was created
   git tag -l
   ```

5. **GitHub/GitLab release**
   - Create release from tag
   - Release notes are automatically generated from CHANGELOG.md
   - Publish release

**Important**: All releases MUST be tagged. Tags are used for version tracking and allow users to reference specific versions of these standards.

### Changelog Requirements

**MANDATORY**: All releases and significant merges must update `CHANGELOG.md`.

**Format**: Follow [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
## [1.2.0] - 2025-01-15

### Added
- New feature description
- Another feature

### Changed
- Change description

### Fixed
- Bug fix description

### Security
- Security fix description
```

**Changelog Maintenance**:

1. **During Development**: Update `CHANGELOG.md` in the same PR as your changes
2. **For Releases**: Create a dedicated changelog entry under `[Unreleased]` or new version section
3. **Before Release**: Move items from `[Unreleased]` to versioned section
4. **Format**: Use conventional commit types to categorize changes (Added, Changed, Deprecated, Removed, Fixed, Security)

**When to Update Changelog**:

- All releases (MAJOR, MINOR, PATCH)
- Significant merges that affect standards or conventions
- Breaking changes (always document)
- New features or capabilities
- Security updates

### Git Tagging Best Practices

**Tag Naming Convention**:

- Format: `vMAJOR.MINOR.PATCH` (e.g., `v1.2.0`)
- Must match SemVer version in package.json
- Always use `v` prefix
- Follow semantic versioning rules strictly

**When to Tag**:

- **Every release** (MAJOR, MINOR, PATCH)
- **After merging release PR** to main
- **Before publishing** to GitHub/GitLab releases

**Tag Workflow**:

```bash
# 1. Ensure you're on the release commit
git checkout main
git pull origin main

# 2. Tag the release
git tag -a v1.2.0 -m "Release version 1.2.0"
# Or use lightweight tag
git tag v1.2.0

# 3. Push tags
git push origin v1.2.0
# Or push all tags
git push origin --tags

# 4. Verify
git tag -l
git show v1.2.0
```

**Tag Annotation** (Recommended):

```bash
git tag -a v1.2.0 -m "Release v1.2.0

- Added ShadCN UI component support
- Updated TypeScript configuration
- Fixed accessibility issues"
```

**Tag Management**:

- Never delete or force-push tags (they're permanent references)
- Use annotated tags for releases (include metadata)
- Tag from main branch after merge
- Include tag in release notes on GitHub/GitLab

## Hotfix Process

### When to Create Hotfix

- Critical production bug
- Security vulnerability
- Data corruption issue

### Hotfix Workflow

1. **Create hotfix branch from production tag**

   ```bash
   git checkout -b hotfix/critical-xss main
   ```

2. **Make fix and commit**

   ```bash
   git commit -m "fix(security): patch XSS vulnerability in form input"
   ```

3. **Test thoroughly**
   - Manual testing
   - Regression testing
   - Security testing

4. **Merge to main and production**

   ```bash
   git checkout main
   git merge hotfix/critical-xss
   git checkout production
   git merge main
   ```

5. **Update changelog and tag release**

   ```bash
   # Update CHANGELOG.md with hotfix entry
   npm version patch
   git tag v1.2.1
   git push origin v1.2.1
   ```

6. **Deploy immediately**

## Development Environment

### Local Setup

1. **Clone repository**

   ```bash
   git clone <repo-url>
   cd <project>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.development
   # Edit .env.development with your values
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

### IDE Setup

**VS Code Extensions:**

- ESLint
- Prettier
- TypeScript
- Vite
- ES7+ React/Redux/React-Native snippets
- Error Lens
- Thunder Client (API testing)

**Recommended Settings** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Quality Gates

### Pre-commit Hooks

Using Husky for git hooks:

```bash
# Install husky
npm install --save-dev husky

# Initialize husky
npx husky init
```

**`.husky/pre-commit`**:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint-staged
npm run type-check
```

**`lint-staged` in `package.json`**:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

### Quality Thresholds

CI/CD will fail if:

- ❌ Lint errors exist
- ❌ Type errors exist
- ❌ Test coverage < 80%
- ❌ Security vulnerabilities detected
- ❌ Accessibility violations found
- ❌ Build fails
- ❌ Bundle size exceeds budget

## Deployment

### Environments

1. **Development** - `dev` branch, auto-deploy on push
2. **Staging** - `main` branch, deploy on PR merge
3. **Production** - Manual deployment, requires approval

### Deployment Checklist

Before deploying to production:

- [ ] All tests passing in CI
- [ ] Security scan passes
- [ ] QA sign-off
- [ ] Product owner approval
- [ ] Monitoring and rollback plan ready
- [ ] Release notes prepared

### Rollback Procedure

```bash
# Quick rollback
git revert <commit-hash>
git push origin main

# Deploy previous version
npm run deploy:production
```

## Collaboration Guidelines

### Pair Programming

When pairing:

- Driver/Navigator pattern
- Regular context switching
- Use screen sharing tools
- Document decisions in ADRs

### Code Ownership

- **Individual PRs**: PR author owns the code
- **After merge**: Team owns the code
- **No code ownership**: Anyone can refactor anyone's code
- **Ping when unsure**: Ask before major refactoring

### Communication

- Slack/Discord for async communication
- PR comments for code discussion
- ADRs for architectural decisions
- Team meetings for planning
