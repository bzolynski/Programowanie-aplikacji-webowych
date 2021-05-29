import { GuidGenerator } from './services/GuidGenerator';
import { INote } from './interfaces/INote';
import { ColorPicker } from './models/ColorPicker';
import { NoteState } from './enums/NoteState.Enum';
import { INoteRepository } from './interfaces/INoteRepository';
import { NoteService } from './NoteService';

export class NoteForm {
	private acceptButton: HTMLButtonElement;
	private formPin: HTMLElement;
	private guidGen: GuidGenerator;
	private colorPickerElement: HTMLElement;
	private colorPicker: ColorPicker;
	private pinStatus: NoteState;
	private noteRepository: INoteRepository;
	private noteService: NoteService;

	notesContainer: HTMLElement;
	noteFormElement: HTMLElement;
	noteClosedItems: HTMLElement;
	noteOpenItems: HTMLElement;
	closeButton: HTMLButtonElement;
	noteElement: INote;
	noteForm: NoteForm;

	constructor(noteRepository: INoteRepository, noteService: NoteService) {
		this.noteRepository = noteRepository;
		this.noteService = noteService;
		this.guidGen = new GuidGenerator();
		this.colorPicker = new ColorPicker();
		this.initializeInputs();
		this.addNote = this.addNote.bind(this);
		this.pinNote = this.pinNote.bind(this);
		this.openForm = this.openForm.bind(this);
		this.closeForm = this.closeForm.bind(this);
		this.addEvents();
	}

	public openForm() {
		this.noteClosedItems.removeEventListener('click', this.openForm);
		this.noteFormElement.classList.add('note-open');
		this.noteFormElement.style.background = '#1e2022';
		this.noteFormElement.classList.remove('note-closed');
		this.noteClosedItems.classList.add('hide');
		this.noteOpenItems.classList.remove('hide');
		this.pinStatus = NoteState.notPinned;

		this.addEvents();
	}

	public closeForm() {
		this.noteClosedItems.addEventListener('click', this.openForm);
		this.noteFormElement.classList.remove('note-open');
		this.noteFormElement.classList.remove('pinned');
		this.noteFormElement.classList.add('note-closed');
		this.noteClosedItems.classList.remove('hide');
		this.noteOpenItems.classList.add('hide');

		this.removeEvents();
	}

	private initializeInputs() {
		this.noteFormElement = document.getElementById('noteForm');
		this.acceptButton = document.getElementById('addNote') as HTMLButtonElement;
		this.colorPickerElement = document.getElementById('colorPicker');
		this.formPin = document.getElementById('formPin');

		this.noteClosedItems = document.getElementById('noteFormClosedItems');
		this.noteOpenItems = document.getElementById('noteFormOpenItems');
		this.closeButton = document.getElementById('closeForm') as HTMLButtonElement;
		this.notesContainer = document.getElementById('notesContainer');
	}

	private addEvents() {
		this.acceptButton.addEventListener('click', this.addNote);
		this.colorPickerElement.addEventListener('click', this.colorPicker.open);
		this.formPin.addEventListener('click', this.pinNote);
	}
	public removeEvents() {
		this.acceptButton.removeEventListener('click', this.addNote);
		this.colorPickerElement.removeEventListener('click', this.colorPicker.open);
		this.formPin.removeEventListener('click', this.pinNote);
	}
	private pinNote(e: MouseEvent) {
		var target = e.target as HTMLElement;
		var noteEl = target.parentElement.parentElement.parentElement;
		console.log(noteEl);

		if (noteEl.classList.contains('pinned')) {
			noteEl.classList.remove('pinned');
			this.pinStatus = NoteState.notPinned;
		} else {
			noteEl.classList.add('pinned');
			this.pinStatus = NoteState.pinned;
		}
	}

	private addNote() {
		var newNote: INote = {
			id: this.guidGen.generate(),
			title: (document.getElementById('noteTitle') as HTMLInputElement).value,
			content: (document.getElementById('noteFormContent') as HTMLInputElement).value,
			label: '',
			color: this.colorPicker.getColor(),
			date: new Date().toLocaleDateString(),
			time: new Date().toLocaleTimeString(),
			state: this.pinStatus
		};
		this.noteRepository.create(newNote);
		this.noteService.render(newNote);
		this.clearInputs();
	}

	private clearInputs() {
		(document.getElementById('noteTitle') as HTMLInputElement).value = '';
		(document.getElementById('noteFormContent') as HTMLInputElement).value = '';
	}
}
