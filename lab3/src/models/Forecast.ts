import { IForecast } from '../interface';

export class Forecast implements IForecast {
	constructor(name: string, cloud: string, temp: number, pressure: number, humidity: number) {
		this.name = name;
		this.cloud = cloud;
		this.temp = temp;
		this.pressure = pressure;
		this.humidity = humidity;
	}
	name: string;
	cloud: string;
	temp: number;
	pressure: number;
	humidity: number;
}
