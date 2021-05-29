import { IAppStorage } from './interfaces/IAppStorage';
import { INote } from './interfaces/INote';

export class LocalStorage implements IAppStorage {
	private constructor() {	}
	private static instance : IAppStorage;
	public static GetInstance() : IAppStorage{
		if(this.instance == null)
			this.instance = new LocalStorage();
		return this.instance;
	}
	createNote(note: INote): void {
		const notes = JSON.parse(localStorage.getItem('Notes')) as INote[] ?? [];
		notes.push(note);
		localStorage.setItem('Notes', JSON.stringify(notes));
	}
	updateNote(id: string, note: INote): void {
		const notes = JSON.parse(localStorage.getItem('Notes')) as INote[] ?? [];
		var index = notes.findIndex((x) => x.id == id);
		if (index !== -1) {
			notes[index] = note;
		}
		localStorage.setItem('Notes', JSON.stringify(notes));
	}
	deleteNote(id: string): void {
		const notes = JSON.parse(localStorage.getItem('Notes')) as INote[];
		notes.splice(notes.findIndex((x) => x.id === id), 1);
		localStorage.setItem('Notes', JSON.stringify(notes));
	}
	getNote(id: string): INote {
		const notes = JSON.parse(localStorage.getItem('Notes')) as INote[];
		var note = notes.find((x) => x.id == id);
		return note;
	}
	getAllNotes(): INote[] {
		const notes = JSON.parse(localStorage.getItem('Notes')) as INote[] ?? [];

		return notes;
	}
}
