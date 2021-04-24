import { IWeatherData, IForecast } from './interface';
import { Mapper } from './mapper';
import { UiRenderer } from './UiRenderer';

export class App {
	searchBar: HTMLInputElement;
	addButton: HTMLInputElement;
	weatherBoxContainer: HTMLElement;
	mapper = new Mapper();
	cityStorage: string[] = [];
	uiRenderer = new UiRenderer();

	opwApiKey = '50d53005c0fd5f556bb4ef15224c4209';
	constructor() {
		this.initializeInputs();
		this.loadInfoFromStorage();
	}
	initializeInputs() {
		this.searchBar = document.querySelector('#searchBar');
		this.addButton = document.querySelector('#addButton');
		this.weatherBoxContainer = document.querySelector('#weatherBoxContainer');
		this.addButton.addEventListener('click', () => this.onAddButtonClick());
	}

	loadInfoFromStorage() {
		const citiesFromStorage = this.getData();
		citiesFromStorage.forEach(async (cityName: string) => {
			await this.loadForecast(cityName);
		});
	}

	async loadForecast(cityName: string) {
		const weatherData = await this.getWeather(cityName);
		if (this.isCityStored(cityName)) {
			return;
		} else {
			this.addToLocalStorage(cityName);
			if (weatherData != null) {
				const forecast = this.mapper.mapDataToForecast(weatherData);
				this.renderWeatherInfo(forecast);
			} else {
				alert(`City ${cityName} not found`);
			}
		}
	}

	async getWeather(city: string): Promise<IWeatherData> {
		const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this
			.opwApiKey}&units=metric`;
		const weatherResponse = await fetch(openWeatherUrl);
		if (weatherResponse.status !== 200) {
			return null;
		} else {
			const weatherData: IWeatherData = await weatherResponse.json();
			return weatherData;
		}
	}

	async onAddButtonClick() {
		const cityName = this.searchBar.value;
		await this.loadForecast(cityName);
	}

	isCityStored(cityName: string): boolean {
		if (this.cityStorage.indexOf(cityName) < 0) {
			return false;
		} else {
			return true;
		}
	}

	addToLocalStorage(cityName: string) {
		this.cityStorage.push(cityName);
		this.saveData();
	}
	saveData() {
		localStorage.setItem('weatherData', JSON.stringify(this.cityStorage));
	}
	getData(): string[] {
		const data = localStorage.getItem('weatherData');
		if (data) {
			let cities: string[] = JSON.parse(data);
			return cities;
		} else {
			return [];
		}
	}
	renderWeatherInfo(forecast: IForecast) {
		const forecastWrapper = this.uiRenderer.render(forecast);
		this.weatherBoxContainer.appendChild(forecastWrapper);
	}
}
