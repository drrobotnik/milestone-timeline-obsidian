# Localization Guide

## Overview

The Milestone Timeline plugin supports multiple languages for natural language date parsing. This document explains how the localization system works and how to add new languages.

## Supported Languages

Currently supported:
- **English** (en) - Default
- **Spanish** (es)
- **French** (fr)
- **Japanese** (ja)

## Architecture

### LocalizationConfig Interface

```typescript
interface LocalizationConfig {
    monthNames: {
        full: string[];      // Full month names
        short: string[];     // Abbreviated month names
    };
    monthPatterns: {
        full: string;        // Regex pattern for full names
        short: string;       // Regex pattern for abbreviations
        any: string;         // Regex pattern matching any variation
    };
    monthNameMap: { [key: string]: number };  // Month name -> index (0-11)
    dateFormatPreference: 'US' | 'International';  // Default format for this locale
}
```

### How It Works

1. **User selects language** in Settings → Language
2. **Plugin loads localization config** from `LOCALIZATIONS` object
3. **Date extraction patterns** are dynamically built using locale-specific month names
4. **parseDate()** uses the locale's `monthNameMap` to convert month names to numbers

## Adding a New Language

To add support for a new language (e.g., German):

### 1. Add to Settings Interface

```typescript
interface MilestoneTimelineSettings {
    // ... other settings
    language: 'en' | 'es' | 'fr' | 'ja' | 'de';  // Add 'de'
}
```

### 2. Add Localization Config

```typescript
const LOCALIZATIONS: { [key: string]: LocalizationConfig } = {
    // ... existing languages
    'de': {
        monthNames: {
            full: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                   'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            short: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
        },
        monthPatterns: {
            full: 'Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember',
            short: 'Jan|Feb|Mär|Apr|Mai|Jun|Jul|Aug|Sep|Okt|Nov|Dez',
            // Pattern that matches full names with optional abbreviation
            any: 'Jan(?:uar)?|Feb(?:ruar)?|März?|Apr(?:il)?|Mai|Juni?|Juli?|Aug(?:ust)?|Sep(?:tember)?|Okt(?:ober)?|Nov(?:ember)?|Dez(?:ember)?'
        },
        monthNameMap: {
            'jan': 0, 'januar': 0,
            'feb': 1, 'februar': 1,
            'mär': 2, 'märz': 2, 'mar': 2, 'marz': 2,  // Include ASCII variant
            'apr': 3, 'april': 3,
            'mai': 4,
            'jun': 5, 'juni': 5,
            'jul': 6, 'juli': 6,
            'aug': 7, 'august': 7,
            'sep': 8, 'september': 8,
            'okt': 9, 'oktober': 9,
            'nov': 10, 'november': 10,
            'dez': 11, 'dezember': 11
        },
        dateFormatPreference: 'International'  // Germany uses D/M/YYYY
    }
};
```

### 3. Add to Settings Dropdown

```typescript
new Setting(containerEl)
    .setName('Language')
    .setDesc('Language for month names...')
    .addDropdown(dropdown => dropdown
        .addOption('en', 'English')
        .addOption('es', 'Español (Spanish)')
        .addOption('fr', 'Français (French)')
        .addOption('ja', '日本語 (Japanese)')
        .addOption('de', 'Deutsch (German)')  // Add this
        // ...
    );
```

### 4. Update DEFAULT_SETTINGS (optional)

If you want the new language as default:

```typescript
const DEFAULT_SETTINGS: MilestoneTimelineSettings = {
    // ...
    language: 'de'  // Change default
};
```

## Key Considerations

### Month Name Map

- **Case insensitive**: All keys should be lowercase
- **Include variations**: Add both accented and ASCII versions for special characters
  ```typescript
  'fév': 1, 'fev': 1, 'février': 1, 'fevrier': 1
  ```
- **Abbreviations**: Include all common abbreviations
- **Index**: 0-11 (JavaScript Date months are zero-indexed)

### Date Format Preference

- **US**: Month/Day/Year (M/D/YYYY) - Used in US, Canada
- **International**: Day/Month/Year (D/M/YYYY) - Used in most of the world

Set this based on the country's standard:
```typescript
dateFormatPreference: 'International'  // Most countries
dateFormatPreference: 'US'             // US, Canada
```

### Regex Patterns

The `any` pattern should match both full and abbreviated forms:
```typescript
// Matches "January", "Jan", "enero", "Ene", etc.
any: 'Jan(?:uary)?|Feb(?:ruary)?|...'
```

Use `?:` for non-capturing groups to keep regex efficient.

### Special Characters

For languages with special characters (é, ñ, ü, etc.):
- Include both accented and unaccented versions in `monthNameMap`
- Use proper Unicode in `monthPatterns`
- JavaScript regex supports Unicode natively

Example:
```typescript
monthPatterns: {
    any: 'Ene(?:ro)?|Feb(?:rero)?|...|Año'  // ñ is fine
},
monthNameMap: {
    'año': 11,   // With accent
    'ano': 11    // Without accent (for flexibility)
}
```

### Japanese/CJK Languages

For languages using different scripts:
```typescript
'ja': {
    monthNames: {
        full: ['1月', '2月', '3月', ...],  // Japanese style
        short: ['1月', '2月', '3月', ...]  // Same as full
    },
    monthPatterns: {
        any: '1月|2月|3月|...'  // Direct match
    },
    monthNameMap: {
        '1月': 0,
        '2月': 1,
        // ...
    }
}
```

## Testing New Languages

After adding a language:

1. **Build the plugin**: `npm run build`
2. **Reload Obsidian**: Ctrl+R / Cmd+R
3. **Change language** in Settings → Milestone Timeline → Language
4. **Test these formats**:
   - Frontmatter: `date: Mayo 1985`
   - Inline: `Started in Mayo 1985`
   - Wiki-links: `[[Mayo 1985]]`
   - Mixed: `date: Mai 2024` (if added French)

5. **Verify**:
   - Dates appear in timeline
   - Month names display in selected language (year/month markers)
   - Partial dates show `~` indicator
   - No duplicates or parsing errors

## Examples

### Spanish Date
```markdown
---
date: Mayo 1985
dateUncertain: true
---

Carta recibida en Mayo 1985, después de Marzo.
```

### French Date
```markdown
---
date: Mai 1985
---

Lettre reçue en Mai 1985 de Paris.
```

### Japanese Date
```markdown
---
date: 5月 1985
---

1985年5月に受け取った手紙
```

## Future Enhancements

Possible improvements:
- Auto-detect language from vault settings
- Support multiple languages simultaneously in one vault
- Custom date formats per language (e.g., "2025年1月15日" for Japanese)
- Localized UI strings (currently only affects date parsing)

## Maintenance

When maintaining localizations:
- Keep month arrays in chronological order (Jan=0, Dec=11)
- Test with real-world date strings from that language
- Consider regional variations (Latin American Spanish vs Spain Spanish)
- Update README with examples for each language
