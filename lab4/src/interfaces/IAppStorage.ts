import { INote } from './INote';

export interface IAppStorage {
	createNote(note: INote) : void;
	updateNote(id: string, note: INote): void;
	deleteNote(id: string): void;
	getNote(id: string): INote;
	getAllNotes(): INote[];
}
