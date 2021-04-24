import { IForecast } from './interface';

export class UiRenderer {
	render(forecast: IForecast): HTMLDivElement {
		const mainWrapper = document.createElement('div');
		mainWrapper.classList.add('main-wrapper');

		const topWrapper = document.createElement('div');
		topWrapper.classList.add('top-wrapper');
		const cityName = document.createElement('span');
		cityName.classList.add('city-name');
		const cloudInfo = document.createElement('span');
		cloudInfo.classList.add('cloud-info');

		const bottomWrapper = document.createElement('div');
		bottomWrapper.classList.add('bottom-wrapper');

		const bottomLeftWrapper = document.createElement('div');
		bottomLeftWrapper.classList.add('bottom-left-wrapper');
		const tempInfo = document.createElement('span');
		tempInfo.classList.add('temp-info');

		const bottomRightWrapper = document.createElement('div');
		bottomRightWrapper.classList.add('bottom-right-wrapper');
		const pressureWrapper = document.createElement('div');
		pressureWrapper.classList.add('pressure-wrapper');
		const pressureInfo = document.createElement('span');
		pressureInfo.classList.add('pressure-info');
		const humidityWrapper = document.createElement('div');
		humidityWrapper.classList.add('humidity-wrapper');
		const humidityInfo = document.createElement('span');
		humidityInfo.classList.add('humidity-info');
		const celcius = document.createElement('span');

		mainWrapper.appendChild(topWrapper);
		mainWrapper.appendChild(bottomWrapper);

		topWrapper.appendChild(cityName);
		topWrapper.appendChild(cloudInfo);

		bottomWrapper.appendChild(bottomLeftWrapper);
		bottomWrapper.appendChild(bottomRightWrapper);

		bottomLeftWrapper.appendChild(tempInfo);
		bottomLeftWrapper.appendChild(celcius);

		bottomRightWrapper.appendChild(pressureWrapper);
		bottomRightWrapper.appendChild(humidityWrapper);

		pressureWrapper.appendChild(pressureInfo);
		humidityWrapper.appendChild(humidityInfo);

		cityName.textContent = forecast.name;
		cloudInfo.textContent = forecast.cloud;
		tempInfo.textContent = Math.round(forecast.temp).toString() + ' ℃';
		pressureInfo.textContent = forecast.pressure.toString() + ' hPa';
		humidityInfo.textContent = forecast.humidity.toString() + '%';

		return mainWrapper;
	}
}
