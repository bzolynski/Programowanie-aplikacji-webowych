import { IForecast, IWeatherData } from './interface';
import { Forecast } from './models/Forecast';

export class Mapper {
	mapDataToForecast(data: IWeatherData): IForecast {
		let forecast = new Forecast(
			data.name,
			data.weather[0].description,
			data.main.temp,
			data.main.pressure,
			data.main.humidity
		);

		return forecast;
	}
}
