import { NoteState } from '../enums/NoteState.Enum';

export interface INote {
	id: string;
	title: string;
	content: string;
	label: string;
	color: string;
	date: string;
	time: string;
	state: NoteState;
}
