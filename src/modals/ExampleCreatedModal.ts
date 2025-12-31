import { App, Modal } from 'obsidian';

export default class ExampleCreatedModal extends Modal {
    message: string;

    constructor(app: App, message: string) {
        super(app);
        this.message = message;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass('milestone-example-modal');

        contentEl.createEl('h2', { text: '✅ Example Correspondence Created!' });
        
        const messageLines = this.message.split('\n');
        for (const line of messageLines) {
            if (line.trim()) {
                contentEl.createEl('p', { text: line });
            }
        }

        const tips = contentEl.createDiv();
        tips.style.marginTop = '1.5em';
        tips.style.padding = '1em';
        tips.style.background = 'var(--background-secondary)';
        tips.style.borderRadius = '5px';
        
        tips.createEl('h4', { text: '🌍 Try These Features:' });
        const tipList = tips.createEl('ul');
        tipList.createEl('li').setText('Read authentic letters in French, German, Spanish, Japanese');
        tipList.createEl('li').setText('Change Settings → Language and watch timeline update');
        tipList.createEl('li').setText('Same letters work in ALL languages!');
        tipList.createEl('li').setText('Click milestones to see original foreign language content');

        const closeBtn = contentEl.createEl('button', { text: 'Got it!' });
        closeBtn.style.marginTop = '1em';
        closeBtn.addEventListener('click', () => this.close());
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
