# Contributing to Milestone Timeline 2.0

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 🐛 Reporting Bugs

If you find a bug, please create an issue using the Bug Report template. Include:
- A clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Your environment (plugin version, Obsidian version, OS)
- Screenshots or console logs if applicable

## 💡 Suggesting Features

Feature requests are welcome! Please:
- Use the Feature Request template
- Check existing issues to avoid duplicates
- Clearly describe the problem and your proposed solution
- Include examples or mockups if possible

## 🔧 Development Setup

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- Git

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/drrobotnik/milestone-timeline.git
   cd milestone-timeline
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the plugin**
   ```bash
   npm run build
   ```

4. **Development mode**
   ```bash
   npm run dev
   ```
   This watches for changes and rebuilds automatically.

### Project Structure

```
milestone-timeline/
├── src/
│   ├── main.ts              # Plugin entry point
│   ├── settings.ts          # Settings management
│   ├── types.ts             # TypeScript types
│   ├── constants.ts         # Constants
│   ├── modals/              # Modal dialogs
│   └── views/               # Timeline view
├── main.js                  # Built output
├── manifest.json            # Plugin manifest
├── styles.css               # Plugin styles
└── package.json
```

### Testing Your Changes

1. Copy the built files to your Obsidian vault's plugins folder:
   ```bash
   # Example path - adjust for your vault
   cp main.js manifest.json styles.css ~/.obsidian/vaults/YourVault/.obsidian/plugins/milestone-timeline/
   ```

2. Reload Obsidian (Ctrl+R / Cmd+R)

3. Test your changes thoroughly with different scenarios

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test thoroughly**
   - Test on different operating systems if possible
   - Verify no console errors
   - Ensure the plugin builds successfully

4. **Commit your changes**
   ```bash
   git commit -m "Add: description of your changes"
   ```
   
   Use conventional commit messages:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Refactor:` for code refactoring
   - `Docs:` for documentation changes

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub using the PR template.

## 🎨 Code Style Guidelines

- Use TypeScript
- Use meaningful variable and function names
- Add JSDoc comments for public methods
- Keep functions focused and small
- Use async/await instead of callbacks
- Handle errors appropriately

### Example

```typescript
/**
 * Extracts dates from a note's content
 * @param content - The note content to parse
 * @param file - The TFile being processed
 * @returns Array of extracted milestones
 */
async extractDatesFromContent(
  content: string,
  file: TFile
): Promise<Milestone[]> {
  // Implementation
}
```

## 🧪 Adding New Date Formats

If you're adding support for new date formats:

1. Add the format to the appropriate extraction function in `MilestoneTimelineView.ts`
2. Test with various examples
3. Document the new format in README.md
4. Consider localization implications

## 📖 Documentation

When adding features or making changes:
- Update README.md with new features or changed behavior
- Update LOCALIZATION.md if you add new settings
- Add inline comments for complex logic
- Update types in `types.ts` if adding new data structures

## 🤝 Community

- Be respectful and constructive
- Help others when possible
- Share your use cases and ideas
- Provide feedback on proposed changes

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## ❓ Questions?

If you have questions about contributing, feel free to:
- Open a discussion on GitHub
- Ask in an issue
- Check existing documentation

Thank you for contributing to Milestone Timeline 2.0! 🎉
