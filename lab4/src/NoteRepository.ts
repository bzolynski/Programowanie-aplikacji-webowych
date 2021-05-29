import { IAppStorage } from './interfaces/IAppStorage';
import { LocalStorage } from './LocalStorage';
import { INote } from './interfaces/INote';
import { INoteRepository } from './interfaces/INoteRepository';

export class NoteRepository implements INoteRepository {
	appStorage: IAppStorage;
	constructor() {
		this.appStorage = LocalStorage.GetInstance();
	}
	create(entity: INote): void {
		this.appStorage.createNote(entity);
	}
	update(id: string, entity: INote): void {
		this.appStorage.updateNote(id, entity);
	}
	delete(id: string): void {
		this.appStorage.deleteNote(id);
	}
	get(id: string): INote {
		return this.appStorage.getNote(id);
	}
	getAll(): INote[] {
		return this.appStorage.getAllNotes();
	}
}
