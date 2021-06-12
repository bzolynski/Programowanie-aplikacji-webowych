import { IAppStorage } from './interfaces/IAppStorage';
import { INote } from './interfaces/INote';
import firebase from 'firebase';
import { firebaseConfig } from './config';

export class FirebaseStorage implements IAppStorage {
	private static instance: IAppStorage;
	private db: firebase.firestore.Firestore;

	private constructor() {
		const firebaseApp = firebase.initializeApp(firebaseConfig);
		this.db = firebaseApp.firestore();
	}

	public static GetInstance(): IAppStorage {
		if (this.instance == null) this.instance = new FirebaseStorage();
		return this.instance;
	}
	async createNote(note: INote): Promise<void> {
		const response = await this.db.collection('notes').add(note);
	}
	async updateNote(id: string, note: INote): Promise<void> {
		const response = await this.db.collection('notes').doc(id).update(note);
	}
	async deleteNote(id: string): Promise<void> {
		const response = await this.db.collection('notes').doc(id).delete();
	}
	async getNote(id: string): Promise<INote> {
		const response = await this.db.collection('notes').doc(id).get();
		const noteData = response.data();
		const note: INote = {
			id: response.id,
			color: noteData.color,
			content: noteData.content,
			date: noteData.date,
			label: noteData.label,
			pinned: noteData.pinned,
			time: noteData.time,
			title: noteData.title
		};
		return note;
	}
	async getAllNotes(): Promise<INote[]> {
		const notes: INote[] = [];
		const responses = await this.db.collection('notes').get();
		responses.forEach((response) => {
			const noteData = response.data();
			const note: INote = {
				id: response.id,
				color: noteData.color,
				content: noteData.content,
				date: noteData.date,
				label: noteData.label,
				pinned: noteData.pinned,
				time: noteData.time,
				title: noteData.title
			};
			notes.push(note);
		});

		return notes;
	}
}
