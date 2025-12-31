import { LocalizationConfig, MilestoneTimelineSettings } from './types';

export const DEFAULT_SETTINGS: MilestoneTimelineSettings = {
    dateFormat: 'YYYY-MM-DD',
    sortOrder: 'asc',
    showFileLinks: true,
    monthThreshold: 10,
    excludeScreenshots: true,
    includeTagDates: true,
    dateFormatPreference: 'US',
    language: 'en',
    includeYearOnly: true,
    showYearMarkersWithYearOnly: true
};

export const LOCALIZATIONS: Record<string, LocalizationConfig> = {
    'en': {
        monthNames: {
            full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        monthPatterns: {
            any: 'January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec'
        },
        monthNameMap: {
            'january': 0, 'jan': 0, 'february': 1, 'feb': 1, 'march': 2, 'mar': 2,
            'april': 3, 'apr': 3, 'may': 4, 'june': 5, 'jun': 5, 'july': 6, 'jul': 6,
            'august': 7, 'aug': 7, 'september': 8, 'sep': 8, 'october': 9, 'oct': 9,
            'november': 10, 'nov': 10, 'december': 11, 'dec': 11
        },
        ordinalSuffixes: {
            pattern: 'st|nd|rd|th',
            examples: ['1st', '2nd', '3rd', '4th', '21st', '22nd', '23rd']
        },
        dateFormatNotes: 'English uses ordinal suffixes (1st, 2nd, 3rd, etc.) and typically formats dates as "Month Day, Year" or "Day Month Year"'
    },
    'es': {
        monthNames: {
            full: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            short: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        },
        monthPatterns: {
            any: 'Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre|Ene|Feb|Mar|Abr|May|Jun|Jul|Ago|Sep|Oct|Nov|Dic'
        },
        monthNameMap: {
            'enero': 0, 'ene': 0, 'febrero': 1, 'feb': 1, 'marzo': 2, 'mar': 2,
            'abril': 3, 'abr': 3, 'mayo': 4, 'may': 4, 'junio': 5, 'jun': 5,
            'julio': 6, 'jul': 6, 'agosto': 7, 'ago': 7, 'septiembre': 8, 'sep': 8,
            'octubre': 9, 'oct': 9, 'noviembre': 10, 'nov': 10, 'diciembre': 11, 'dic': 11
        },
        ordinalSuffixes: {
            pattern: 'º|ª|°',
            examples: ['1º', '2º', '3º', '1ª', '2ª', '3ª']
        },
        dateFormatNotes: 'Spanish may use ordinal indicators (1º, 2º, 3º) but typically writes dates without them: "15 de Mayo de 2024"'
    },
    'fr': {
        monthNames: {
            full: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            short: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
        },
        monthPatterns: {
            any: 'Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre|Jan|Fév|Mar|Avr|Mai|Jun|Jul|Aoû|Sep|Oct|Nov|Déc'
        },
        monthNameMap: {
            'janvier': 0, 'jan': 0, 'février': 1, 'fév': 1, 'mars': 2, 'mar': 2,
            'avril': 3, 'avr': 3, 'mai': 4, 'juin': 5, 'jun': 5, 'juillet': 6, 'jul': 6,
            'août': 7, 'aoû': 7, 'septembre': 8, 'sep': 8, 'octobre': 9, 'oct': 9,
            'novembre': 10, 'nov': 10, 'décembre': 11, 'déc': 11
        },
        ordinalSuffixes: {
            pattern: 'er|ère|e|ème|eme',
            examples: ['1er', '1ère', '2e', '2ème', '3e']
        },
        dateFormatNotes: 'French uses ordinals primarily for "premier" (1er/1ère) and abbreviated forms (2e, 3e): "1er Mai 2024" or "15 Mai 2024"'
    },
    'ja': {
        monthNames: {
            full: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            short: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        monthPatterns: {
            any: '1月|2月|3月|4月|5月|6月|7月|8月|9月|10月|11月|12月'
        },
        monthNameMap: {
            '1月': 0, '2月': 1, '3月': 2, '4月': 3, '5月': 4, '6月': 5,
            '7月': 6, '8月': 7, '9月': 8, '10月': 9, '11月': 10, '12月': 11
        },
        ordinalSuffixes: {
            pattern: '日',
            examples: ['1日', '15日', '31日']
        },
        dateFormatNotes: 'Japanese uses 日 (nichi/day) after the day number: "2024年5月15日" (year/month/day format)'
    }
};

export const VIEW_TYPE_MILESTONE_TIMELINE = 'milestone-timeline-view';
