import { IAppStorage } from './interfaces/IAppStorage';
import { LocalStorage } from './LocalStorage';
import { FirebaseStorage } from './FirebaseStorage';
import { INote } from './interfaces/INote';
import { INoteRepository } from './interfaces/INoteRepository';
import { StoreType, storeType } from './config';

export class NoteRepository implements INoteRepository {
	appStorage: IAppStorage;
	constructor() {
		switch (storeType) {
			case StoreType.firebase: {
				this.appStorage = FirebaseStorage.GetInstance();
				break;
			}
			case StoreType.localStorage: {
				this.appStorage = LocalStorage.GetInstance();
				break;
			}
		}
	}
	async create(entity: INote): Promise<void> {
		return await this.appStorage.createNote(entity);
	}
	async update(id: string, entity: INote): Promise<void> {
		return await this.appStorage.updateNote(id, entity);
	}
	async delete(id: string): Promise<void> {
		return await this.appStorage.deleteNote(id);
	}
	async get(id: string): Promise<INote> {
		return await this.appStorage.getNote(id);
	}
	async getAll(): Promise<INote[]> {
		return await this.appStorage.getAllNotes();
	}
}
