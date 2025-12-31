import { App, Modal, TFile } from 'obsidian';
import type MilestoneTimelinePlugin from '../main';

interface YearMatch {
    year: string;
    file: TFile;
    lineNumber: number;
    context: string;
}

export default class PotentialYearsModal extends Modal {
    plugin: MilestoneTimelinePlugin;
    matches: YearMatch[];
    currentIndex: number = 0;

    constructor(app: App, plugin: MilestoneTimelinePlugin, matches: YearMatch[]) {
        super(app);
        this.plugin = plugin;
        this.matches = matches;
    }

    onOpen() {
        this.renderMatch();
    }

    renderMatch() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass('milestone-years-modal');

        if (this.matches.length === 0) {
            contentEl.createEl('h2', { text: '✅ All Done!' });
            contentEl.createEl('p', { text: 'No more potential year references to review.' });
            
            const closeBtn = contentEl.createEl('button', { text: 'Close' });
            closeBtn.addEventListener('click', () => this.close());
            return;
        }

        const match = this.matches[this.currentIndex];

        // Header
        const header = contentEl.createDiv();
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.marginBottom = '1em';

        const title = header.createEl('h2', { text: '🔍 Potential Date Reference' });
        title.style.margin = '0';

        const progress = header.createEl('span', { 
            text: `${this.currentIndex + 1} / ${this.matches.length}` 
        });
        progress.style.color = 'var(--text-muted)';

        // Year display
        const yearDiv = contentEl.createDiv();
        yearDiv.style.padding = '1.5em';
        yearDiv.style.background = 'var(--background-secondary)';
        yearDiv.style.borderRadius = '8px';
        yearDiv.style.marginBottom = '1em';
        yearDiv.style.textAlign = 'center';

        const yearEl = yearDiv.createEl('div', { text: match.year });
        yearEl.style.fontSize = '3em';
        yearEl.style.fontWeight = 'bold';
        yearEl.style.color = 'var(--text-accent)';

        // File info
        const fileInfo = contentEl.createDiv();
        fileInfo.style.marginBottom = '1em';
        
        const fileLink = fileInfo.createEl('a', { text: match.file.basename });
        fileLink.style.fontWeight = 'bold';
        fileLink.href = '#';
        fileLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const leaf = this.app.workspace.getLeaf(false);
            await leaf.openFile(match.file, { eState: { line: match.lineNumber - 1 } });
        });

        fileInfo.createEl('span', { text: ` (Line ${match.lineNumber})` });

        // Context
        const contextDiv = contentEl.createDiv();
        contextDiv.style.padding = '1em';
        contextDiv.style.background = 'var(--background-primary-alt)';
        contextDiv.style.borderRadius = '5px';
        contextDiv.style.marginBottom = '1.5em';
        contextDiv.style.fontFamily = 'var(--font-monospace)';
        contextDiv.style.fontSize = '0.9em';
        
        const contextText = contextDiv.createEl('div');
        // Highlight the year in the context
        const highlightedContext = match.context.replace(
            new RegExp(`\\b${match.year}\\b`, 'g'),
            `<mark style="background: var(--text-highlight-bg); padding: 2px 4px; border-radius: 3px;">${match.year}</mark>`
        );
        contextText.innerHTML = highlightedContext;

        // Question
        contentEl.createEl('p', { 
            text: 'Is this an unstructured date reference that should be structured for your timeline?',
            attr: { style: 'font-weight: bold; margin-bottom: 1em;' }
        });
        
        const hint = contentEl.createEl('p', { 
            text: 'Add #year/ tag to mark as a year-only date, or consider restructuring as a full date format (YYYY-MM-DD, "Month Day, Year", etc.)',
        });
        hint.style.fontSize = '0.9em';
        hint.style.color = 'var(--text-muted)';
        hint.style.marginBottom = '1em';

        // Action buttons
        const actions = contentEl.createDiv();
        actions.style.display = 'flex';
        actions.style.gap = '0.5em';
        actions.style.marginBottom = '1em';

        const yesBtn = actions.createEl('button', { text: '✅ Add #year/ Tag' });
        yesBtn.style.flex = '1';
        yesBtn.style.padding = '0.75em';
        yesBtn.classList.add('mod-cta');
        yesBtn.addEventListener('click', async () => {
            await this.addYearTag(match);
            this.matches.splice(this.currentIndex, 1);
            if (this.currentIndex >= this.matches.length) {
                this.currentIndex = Math.max(0, this.matches.length - 1);
            }
            this.renderMatch();
        });

        const noBtn = actions.createEl('button', { text: '⏭️ Skip' });
        noBtn.style.flex = '1';
        noBtn.style.padding = '0.75em';
        noBtn.addEventListener('click', () => {
            this.matches.splice(this.currentIndex, 1);
            if (this.currentIndex >= this.matches.length) {
                this.currentIndex = Math.max(0, this.matches.length - 1);
            }
            this.renderMatch();
        });

        // Navigation buttons
        const navDiv = contentEl.createDiv();
        navDiv.style.display = 'flex';
        navDiv.style.gap = '0.5em';
        navDiv.style.marginTop = '1em';
        navDiv.style.paddingTop = '1em';
        navDiv.style.borderTop = '1px solid var(--background-modifier-border)';

        const prevBtn = navDiv.createEl('button', { text: '← Previous' });
        prevBtn.disabled = this.currentIndex === 0;
        prevBtn.addEventListener('click', () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.renderMatch();
            }
        });

        const nextBtn = navDiv.createEl('button', { text: 'Next →' });
        nextBtn.disabled = this.currentIndex >= this.matches.length - 1;
        nextBtn.addEventListener('click', () => {
            if (this.currentIndex < this.matches.length - 1) {
                this.currentIndex++;
                this.renderMatch();
            }
        });

        const closeBtn = navDiv.createEl('button', { text: 'Close' });
        closeBtn.style.marginLeft = 'auto';
        closeBtn.addEventListener('click', () => this.close());
    }

    async addYearTag(match: YearMatch) {
        const content = await this.app.vault.read(match.file);
        const lines = content.split('\n');
        
        if (match.lineNumber > 0 && match.lineNumber <= lines.length) {
            const line = lines[match.lineNumber - 1];
            
            // Find the year in the line and add #year/ tag after it
            const yearMatch = new RegExp(`\\b${match.year}\\b`).exec(line);
            if (yearMatch) {
                const before = line.substring(0, yearMatch.index + match.year.length);
                const after = line.substring(yearMatch.index + match.year.length);
                
                // Add the tag right after the year
                lines[match.lineNumber - 1] = `${before} #year/${match.year}${after}`;
                
                await this.app.vault.modify(match.file, lines.join('\n'));
                
                // Refresh the timeline view if it's open
                this.plugin.refreshOpenViews();
            }
        }
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
