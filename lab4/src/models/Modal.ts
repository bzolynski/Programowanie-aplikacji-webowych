import { INote } from '../interfaces/INote';
import { ColorPicker } from './ColorPicker';
import '../styles/modal.scss';
import { INoteRepository } from '../interfaces/INoteRepository';
import { NoteState } from '../enums/NoteState.Enum';

export class Modal {
	note: INote;
	colorPicker: ColorPicker;
	modalBackground: HTMLElement;
	modalContainer: HTMLElement;
	modalContent: HTMLElement;
	noteRepository: INoteRepository;
	constructor(note: INote, noteRepository: INoteRepository) {
		this.noteRepository = noteRepository;
		this.note = note;
		this.colorPicker = new ColorPicker(note.color);
		this.modalBackground = document.getElementById('modalBackground');
		this.close = this.close.bind(this);
		this.accept = this.accept.bind(this);
	}

	public render() {
		this.modalContainer = document.createElement('div');
		this.modalContainer.classList.add('modal');
		this.modalContent = document.createElement('div');
		this.modalContent.classList.add('modal-content');
		this.modalContent.id = 'modalContent';
		this.modalContent.style.background = this.note.color;
		this.modalContent.appendChild(this.createTopbar());
		this.modalContent.appendChild(this.createContent());
		this.modalContent.appendChild(this.createBottombar());
		this.modalContainer.appendChild(this.modalContent);
		if (this.note.state == NoteState.pinned) this.modalContent.classList.add('pinned');

		this.modalBackground.classList.add('show');
		this.modalBackground.parentNode.appendChild(this.modalContainer);
	}

	private createTopbar(): HTMLDivElement {
		var noteTopbar = document.createElement('div');
		noteTopbar.classList.add('modal-topbar');
		var title = document.createElement('input');
		title.value = this.note.title;
		title.id = 'modalNoteTitle';
		//var pin = document.createElement('img');
		//pin.src = './assets/pin.svg';

		noteTopbar.appendChild(title);
		//noteTopbar.appendChild(pin);
		return noteTopbar;
	}
	private createContent(): HTMLDivElement {
		var content = document.createElement('div');
		content.classList.add('modal-content');
		var textarea = document.createElement('textarea');
		textarea.id = 'modalNoteContent';
		textarea.value = this.note.content;
		content.appendChild(textarea);

		return content;
	}

	private createBottombar(): HTMLDivElement {
		var bottomBar = document.createElement('div');
		bottomBar.classList.add('modal-bottombar');
		var options = document.createElement('div');
		options.classList.add('options');
		var palette = document.createElement('img');
		palette.src = './assets/palette.svg';
		palette.id = 'modalColorpicker';
		palette.addEventListener('click', this.colorPicker.open);
		var buttons = document.createElement('div');
		buttons.classList.add('buttons');
		var acceptButton = document.createElement('button');
		acceptButton.textContent = 'accept';
		acceptButton.id = 'acceptModal';
		acceptButton.addEventListener('click', this.accept);
		var cancelButton = document.createElement('button');
		cancelButton.textContent = 'cancel';
		cancelButton.id = 'cancelModal';
		cancelButton.addEventListener('click', this.close);

		buttons.appendChild(cancelButton);
		buttons.appendChild(acceptButton);
		options.appendChild(palette);
		bottomBar.appendChild(options);
		bottomBar.appendChild(buttons);

		return bottomBar;
	}

	private accept(e: MouseEvent) {
		this.note = {
			id: this.note.id,
			title: (document.getElementById('modalNoteTitle') as HTMLInputElement).value,
			content: (document.getElementById('modalNoteContent') as HTMLInputElement).value,
			label: '',
			color: this.colorPicker.getColor(),
			date: new Date().toLocaleDateString(),
			time: new Date().toLocaleTimeString(),
			state: this.note.state
		};
		this.noteRepository.update(this.note.id, this.note);
		this.rerender();
		this.close(e);
	}

	private close(e: MouseEvent) {
		this.modalBackground.classList.remove('show');
		this.modalContainer.remove();
		this.modalContent.remove();
	}

	private rerender() {
		var note = document.getElementById(this.note.id) as HTMLElement;
		var noteTitle = note.querySelector('#noteTitle') as HTMLInputElement;
		var noteContent = note.querySelector('#noteContent') as HTMLInputElement;
		var noteDate = note.querySelector('#noteDate') as HTMLElement;
		note.style.background = this.note.color;
		noteTitle.value = this.note.title;
		noteContent.value = this.note.content;
		noteDate.innerText = 'Ostatnia aktualizacja ' + this.note.date + ' ' + this.note.time;
	}
}
