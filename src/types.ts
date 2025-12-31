import { TFile } from 'obsidian';

export interface MilestoneTimelineSettings {
    dateFormat: string;
    sortOrder: 'asc' | 'desc';
    showFileLinks: boolean;
    monthThreshold: number;
    excludeScreenshots: boolean;
    includeTagDates: boolean;
    dateFormatPreference: 'US' | 'International';
    language: 'en' | 'es' | 'fr' | 'ja';
    includeYearOnly: boolean;
    showYearMarkersWithYearOnly: boolean;
}

export interface Milestone {
    date: Date;
    title: string;
    file: TFile;
    context: string;
    heading?: string;
    lineNumber?: number;
    isTag?: boolean;
    isUncertain?: boolean;
}

export interface LocalizationConfig {
    monthNames: {
        full: string[];
        short: string[];
    };
    monthPatterns: {
        any: string;
    };
    monthNameMap: Record<string, number>;
    ordinalSuffixes?: {
        pattern: string;
        examples?: string[];
    };
    dateFormatNotes?: string;
}

export interface YearMatch {
    year: string;
    file: TFile;
    lineNumber: number;
    context: string;
}
