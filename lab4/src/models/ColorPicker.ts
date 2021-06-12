import {v4 as uuidv4} from 'uuid';
import '../styles/colorpicker.scss';
export class ColorPicker {
	colors: string[];
	id: string;
	selectedColor: string;
	constructor(color?: string) {
		this.colors = [ '#1e2022', 'black', '#026e6e', '#015726', '#1a385f', '#c9491e' ];
		this.id = uuidv4();
		this.open = this.open.bind(this);
		this.changeColor = this.changeColor.bind(this);
		this.selectedColor = this.colors[0];
		if (color !== null) this.selectedColor = color;
	}

	open(e: MouseEvent) {
		this.render(e);
	}
	close() {
		document.getElementById(this.id).remove();
	}

	render(e: MouseEvent) {
		var target = e.target as HTMLElement;
		var parent = target.parentElement;

		var container = document.createElement('div');
		container.id = this.id;
		container.classList.add('colorpicker-container');
		container.classList.add('hide');

		this.colors.forEach((color) => {
			var colorElement = document.createElement('div');
			colorElement.id = color;
			colorElement.classList.add('color');
			colorElement.style.background = color;
			colorElement.addEventListener('click', this.changeColor);
			container.appendChild(colorElement);
		});

		parent.appendChild(container);
	}
	changeColor(e: MouseEvent) {
		this.selectedColor = (e.target as HTMLElement).id;
		document.getElementById('noteForm').style.background = this.selectedColor;
		var modal = document.getElementById('modalContent');
		if (modal != null) modal.style.background = this.selectedColor;

		this.close();
	}
	getColor(): string {
		return this.selectedColor;
	}
}
