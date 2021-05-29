import { INote } from './interfaces/INote';
import './styles/note.scss';
import { NoteState } from './enums/NoteState.Enum';
import { INoteRepository } from './interfaces/INoteRepository';
import { Modal } from './models/Modal';

export class NoteService {
	private note: INote;
	private noteRepository: INoteRepository;
	private notesContainer: HTMLElement;
	private pinnedNotesContainer: HTMLElement;
	constructor(noteRepository: INoteRepository) {
		this.noteRepository = noteRepository;
		this.deleteNote = this.deleteNote.bind(this);
		this.editNote = this.editNote.bind(this);
		this.renderAll = this.renderAll.bind(this);
		this.pinNote = this.pinNote.bind(this);
		this.notesContainer = document.getElementById('notesContainer');
		this.pinnedNotesContainer = document.getElementById('pinnedNotesContainer');
	}

	public render(note: INote) {
		var container: HTMLElement;
		var noteElement = this.getNoteEl(note);
		if (note.state == NoteState.notPinned) {
			container = this.notesContainer;
		} else {
			container = this.pinnedNotesContainer;
			noteElement.classList.add('pinned');
		}

		container.prepend(noteElement);
	}

	private getNoteEl(note: INote): HTMLElement {
		this.note = note;
		var noteEl = document.createElement('div');
		noteEl.classList.add('note');
		noteEl.id = this.note.id;
		noteEl.style.background = this.note.color;

		noteEl.appendChild(this.createTopbar());
		noteEl.appendChild(this.createContent());
		noteEl.appendChild(this.createBottombar());
		noteEl.addEventListener('click', this.editNote);
		return noteEl;
	}

	public deleteNote(e: MouseEvent) {
		var target = e.target as HTMLElement;
		var id = target.parentElement.parentElement.parentElement.id;
		document.getElementById(id).remove();
		this.noteRepository.delete(id);
	}

	public editNote(e: MouseEvent) {
		var target = e.target as HTMLElement;
		if (target.id !== 'deleteNote' && target.id !== 'pinNote') {
			var noteEl = target.closest('.note');
			var id = noteEl.id;
			var note = this.noteRepository.get(id);
			var modal = new Modal(note, this.noteRepository);
			modal.render();
		}
	}

	private pinNote(e: MouseEvent) {
		var target = e.target as HTMLElement;
		var noteEl = target.parentElement.parentElement;
		var note = this.noteRepository.get(noteEl.id);

		if (noteEl.classList.contains('pinned')) {
			this.pinnedNotesContainer.removeChild(noteEl);
			this.notesContainer.prepend(noteEl);
			noteEl.classList.remove('pinned');
			note.state = NoteState.notPinned;
		} else {
			noteEl.classList.add('pinned');
			this.notesContainer.removeChild(noteEl);
			this.pinnedNotesContainer.prepend(noteEl);
			note.state = NoteState.pinned;
		}
		this.noteRepository.update(note.id, note);
	}

	public renderAll() {
		var notes = this.noteRepository.getAll();
		if (notes !== null) {
			notes.forEach((note) => {
				this.render(note);
			});
		}
	}

	private createTopbar(): HTMLDivElement {
		var noteTopbar = document.createElement('div');
		noteTopbar.classList.add('note-topbar');
		var title = document.createElement('input');
		title.value = this.note.title;
		title.id = 'noteTitle';
		title.readOnly = true;
		var pin = document.createElement('img');
		pin.src = './assets/pin.svg';
		pin.id = 'pinNote';
		pin.addEventListener('click', this.pinNote);

		noteTopbar.appendChild(title);
		noteTopbar.appendChild(pin);
		return noteTopbar;
	}

	private createContent(): HTMLDivElement {
		var content = document.createElement('div');
		content.classList.add('note-content');
		var textarea = document.createElement('textarea');
		textarea.id = 'noteContent';
		textarea.value = this.note.content;
		textarea.readOnly = true;
		content.appendChild(textarea);

		return content;
	}

	private createBottombar(): HTMLDivElement {
		var bottomBar = document.createElement('div');
		bottomBar.classList.add('note-bottombar');
		var options = document.createElement('div');
		options.classList.add('options');
		var date = document.createElement('textarea');
		date.readOnly = true;
		date.classList.add('note-date');
		date.id = 'noteDate';
		date.textContent = 'Ostatnia aktualizacja' + '\n' + this.note.date + ' ' + this.note.time;
		var buttons = document.createElement('div');
		buttons.classList.add('buttons');
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'delete';
		deleteButton.id = 'deleteNote';
		deleteButton.addEventListener('click', this.deleteNote);

		buttons.appendChild(deleteButton);
		options.appendChild(date);
		bottomBar.appendChild(options);
		bottomBar.appendChild(buttons);

		return bottomBar;
	}
}
