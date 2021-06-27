import { INote } from './interfaces/INote';
import { INoteRepository } from './interfaces/INoteRepository';
import { NoteForm } from './NoteForm';
import { NoteRepository } from './NoteRepository';
import { NoteService } from './NoteService';

export class App {
	noteRepository: INoteRepository;
	noteService: NoteService;
	notesContainer: HTMLElement;
	noteFormElement: HTMLElement;
	noteClosedItems: HTMLElement;
	noteOpenItems: HTMLElement;
	acceptButton: HTMLButtonElement;
	closeButton: HTMLButtonElement;
	noteElement: INote;
	noteForm: NoteForm;

	constructor() {
		this.noteRepository = new NoteRepository();
		this.noteService = new NoteService(this.noteRepository);
		this.noteForm = new NoteForm(this.noteRepository, this.noteService);
		this.initializeInputs();
		this.openNoteForm = this.openNoteForm.bind(this);
		this.closeNoteForm = this.closeNoteForm.bind(this);
		this.addEvents();
		this.renderNotes();
	}

	private initializeInputs() {
		this.noteFormElement = document.getElementById('noteForm');
		this.noteClosedItems = document.getElementById('noteFormClosedItems');
		this.noteOpenItems = document.getElementById('noteFormOpenItems');
		this.acceptButton = document.getElementById('addNote') as HTMLButtonElement;
		this.closeButton = document.getElementById('closeForm') as HTMLButtonElement;
		this.notesContainer = document.getElementById('notesContainer');
	}

	private renderNotes() {
		this.noteService.renderAll();
	}

	private addEvents() {
		this.noteClosedItems.addEventListener('click', this.openNoteForm);
		this.closeButton.addEventListener('click', this.closeNoteForm);
	}

	private openNoteForm(e: MouseEvent) {
		this.noteForm.openForm();
	}

	private closeNoteForm(e: MouseEvent) {
		this.noteForm.closeForm();
	}
}
