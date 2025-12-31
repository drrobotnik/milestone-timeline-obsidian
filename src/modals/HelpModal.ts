import { App, Modal } from 'obsidian';

export default class MilestoneTimelineHelpModal extends Modal {
    constructor(app: App) {
        super(app);
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass('milestone-help-modal');

        contentEl.createEl('h2', { text: '📅 Milestone Timeline Help' });

        // Quick Start
        contentEl.createEl('h3', { text: '🚀 Quick Start' });
        const quickStart = contentEl.createEl('ul');
        quickStart.createEl('li').innerHTML = '<strong>Open Timeline:</strong> Click the calendar-clock icon in the sidebar or use Command Palette';
        quickStart.createEl('li').innerHTML = '<strong>Click any milestone</strong> to jump to that line in your note';
        quickStart.createEl('li').innerHTML = '<strong>Settings:</strong> Configure in Settings → Milestone Timeline 2.0';

        // Date Formats
        contentEl.createEl('h3', { text: '📝 Supported Date Formats' });
        
        const formatsDiv = contentEl.createDiv();
        formatsDiv.innerHTML = `
            <p><strong>1. Frontmatter</strong> (recommended for primary dates):</p>
            <pre><code>---\ndate: 2024-03-15\ndeadline: March 31, 2001\nmilestone: Aug 23 1931\ndateFormat: International\ndateUncertain: true\n---</code></pre>
            
            <p><strong>⚠️ Obsidian Properties UI:</strong> To use partial dates like "May 1985" in the Properties panel:<br>
            1. Click the property type icon next to the date field<br>
            2. Change <strong>Property Type → Text</strong><br>
            3. Type "May 1985" directly<br>
            <em>The Date property type doesn't save incomplete dates to the file.</em></p>
            
            <p><strong>2. Inline Dates:</strong></p>
            <ul>
                <li><code>2024-03-15</code> - ISO format (unambiguous)</li>
                <li><code>March 31, 2001</code> - Natural language (unambiguous)</li>
                <li><code>Aug 23 1931</code> - Short month format (unambiguous)</li>
                <li><code>May 1985</code> - Month Year (partial, defaults to 15th, marked uncertain)</li>
                <li><code>05/dd/1985</code> - Obsidian incomplete date (day unknown, defaults to 15th, marked uncertain)</li>
                <li><code>1/2/1953</code> - Numeric format (ambiguous - see settings)</li>
            </ul>
            
            <p><strong>Year-Only Dates (Explicit Annotation Required):</strong><br>
            To avoid ambiguity with page numbers or other 4-digit numbers, year-only dates must be explicitly tagged:<br>
            <code>Published in #year/1809</code> - Year-only date (defaults to July 1, marked uncertain)<br>
            <br>
            💡 <strong>Use "Find Potential Year References"</strong> command to quickly review and tag years in your notes!</p>
            
            <p><strong>Partial/Uncertain Dates:</strong><br>
            Use <code>dateUncertain: true</code> for approximate dates.<br>
            Partial dates (year-only or year-month) are automatically marked uncertain.<br>
            Shows <strong>~</strong> indicator on the timeline.</p>
            
            <p><strong>Numeric Date Ambiguity:</strong><br>
            <code>1/2/1953</code> could be Jan 2 (US) or Feb 1 (International).<br>
            Set your preference in Settings → Date format preference.<br>
            Override per-note with <code>dateFormat</code> in frontmatter.</p>
            
            <p><strong>3. Wiki-Link Dates:</strong></p>
            <pre><code>Important meeting: [[2024-03-15]]</code></pre>
            
            <p><strong>4. Tag Dates:</strong></p>
            <pre><code>Contract signed #date/1987/02/18
Published in #year/1809</code></pre>
            <p><em>Use <code>#year/YYYY</code> for year-only dates to avoid ambiguity with page numbers.</em></p>
        `;

        // Timeline Features
        contentEl.createEl('h3', { text: '✨ Timeline Features' });
        const features = contentEl.createEl('ul');
        features.createEl('li').innerHTML = '<strong>Year Markers:</strong> Large badges marking each new year';
        features.createEl('li').innerHTML = '<strong>Month Markers:</strong> Appear for years with many dates (configurable)';
        features.createEl('li').innerHTML = '<strong>Heading Context:</strong> Shows the nearest section heading';
        features.createEl('li').innerHTML = '<strong>Tag Indicator:</strong> 📌 icon for dates from tags';
        features.createEl('li').innerHTML = '<strong>Uncertainty Indicator:</strong> <strong>~</strong> icon for approximate/partial dates';
        features.createEl('li').innerHTML = '<strong>Click to Navigate:</strong> Opens note at exact line';

        // Settings
        contentEl.createEl('h3', { text: '⚙️ Key Settings' });
        const settings = contentEl.createEl('ul');
        settings.createEl('li').innerHTML = '<strong>Sort Order:</strong> Ascending (oldest first) or descending';
        settings.createEl('li').innerHTML = '<strong>Date Format Preference:</strong> US (M/D/YYYY) or International (D/M/YYYY)';
        settings.createEl('li').innerHTML = '<strong>Language:</strong> English, Spanish, French, Japanese for month names';
        settings.createEl('li').innerHTML = '<strong>Month Threshold:</strong> How many dates needed to show months (default: 10)';
        settings.createEl('li').innerHTML = '<strong>Exclude Screenshots:</strong> Filter out dates in image filenames';
        settings.createEl('li').innerHTML = '<strong>Include Tag Dates:</strong> Toggle #date/YYYY/MM/DD and #year/YYYY support';

        // Commands
        contentEl.createEl('h3', { text: '🔧 Useful Commands' });
        const commands = contentEl.createEl('ul');
        commands.createEl('li').innerHTML = '<strong>Find Potential Year References:</strong> Scans notes for 4-digit numbers (1000-2100) that might be years. Helps you quickly add #year/ tags to meaningful dates.';
        commands.createEl('li').innerHTML = '<strong>Show Help:</strong> Opens this help dialog';
        commands.createEl('li').innerHTML = '<strong>Create Example Correspondence:</strong> Creates sample notes to explore features';

        // Examples
        contentEl.createEl('h3', { text: '💡 Example Note' });
        const exampleDiv = contentEl.createDiv();
        exampleDiv.innerHTML = `
            <pre><code>---
date: 2024-01-15
dateFormat: International
---
# Project Timeline

## Planning
Started on Jan 15 2024

## Development  
- Kickoff: [[2024-02-01]]
- Beta release: #date/2024/05/20

## Launch
Final launch: 2024-07-01

## International Letter
Letter from London dated 1/2/1953 (Feb 1, 1953)</code></pre>
            <p><em>This note uses International date format, so 1/2/1953 = Feb 1!</em></p>
        `;

        // Tips
        contentEl.createEl('h3', { text: '💡 Tips' });
        const tips = contentEl.createEl('ul');
        tips.createEl('li').innerHTML = 'Use frontmatter for the main date of a note';
        tips.createEl('li').innerHTML = 'Headings provide context - organize notes with clear sections';
        tips.createEl('li').innerHTML = 'Screenshot dates are auto-filtered by default';
        tips.createEl('li').innerHTML = 'Lower month threshold for more detailed navigation';
        tips.createEl('li').innerHTML = 'Click Refresh button after changing settings';

        // Footer with links
        const footer = contentEl.createDiv('milestone-help-footer');
        footer.style.marginTop = '2em';
        footer.style.paddingTop = '1em';
        footer.style.borderTop = '1px solid var(--background-modifier-border)';
        footer.innerHTML = `
            <p><strong>Need more help?</strong> Check the README.md file in the plugin folder for detailed documentation.</p>
        `;

        // Close button
        const closeBtn = contentEl.createEl('button', { text: 'Close' });
        closeBtn.style.marginTop = '1em';
        closeBtn.addEventListener('click', () => this.close());
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
