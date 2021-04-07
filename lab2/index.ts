interface ISound {
	key: string;
	time: number;
}
interface IChannel {
	sounds: ISound[];
	number: number;
	startTime: number;
}

class App {
	sounds: HTMLAudioElement[] = [];
	channels: IChannel[] = [];
	activeChannel: number;

	InitializeApp = (): void => {
		document.addEventListener('keypress', this.ListenKeyPress);
		document.querySelectorAll('.channel .recButton').forEach((recButton) => {
			recButton.addEventListener('click', this.SetActiveChannel);
		});
		document.querySelectorAll('.channel .playButton').forEach((playButton) => {
			playButton.addEventListener('click', this.PlayForChannel);
		});
		this.GetSounds();
		this.CreateChannels();
	};

	ListenKeyPress = (event: KeyboardEvent) => {
		const key = event.key;
		const time = event.timeStamp;
		this.ButtonClickEffectToggle(key);
		this.PlaySound(key);
		if (this.activeChannel != null) {
			this.RecordForChannel(key, time);
		}
	};

	ButtonClickEffectToggle = (key: string): void => {
		const button = document.querySelector(`[data-button-key="${key}"]`);
		if (button != null) {
			button.classList.toggle('keyClicked');
			setTimeout(() => {
				button.classList.toggle('keyClicked');
			}, 100);
		}
	};

	GetSounds = (): void => {
		document.querySelectorAll('[data-sound]').forEach((el) => {
			this.sounds.push(el as HTMLAudioElement);
		});
	};

	CreateChannels = (): void => {
		this.channels.push({ sounds: [], number: 0, startTime: 0 });
		this.channels.push({ sounds: [], number: 1, startTime: 0 });
		this.channels.push({ sounds: [], number: 2, startTime: 0 });
		this.channels.push({ sounds: [], number: 3, startTime: 0 });
	};

	PlaySound = (key: string): void => {
		let sound = this.sounds.find((sound) => sound.dataset.key == key);
		if (sound != null) {
			sound.currentTime = 0;
			sound.play();
		}
	};

	RecordForChannel = (key: string, time: number): void => {
		this.channels[this.activeChannel].sounds.push({ key, time });
	};

	SetActiveChannel = (event: Event) => {
		let button = event.target as Element;
		const channelId = parseInt(button.parentElement.id);
		if (channelId != this.activeChannel && this.activeChannel == null) {
			button.classList.add('acriveRec');
			this.activeChannel = parseInt(button.parentElement.id);
			this.channels[this.activeChannel].sounds = [];
			this.channels[this.activeChannel].startTime = event.timeStamp;
		} else if (channelId == this.activeChannel) {
			button.classList.remove('acriveRec');
			this.activeChannel = null;
		}
	};

	PlayForChannel = (event: Event): void => {
		let button = event.target as Element;
		const channelId = parseInt(button.parentElement.id);
		this.channels[channelId].sounds.forEach((sound) => {
			setTimeout(() => {
				this.PlaySound(sound.key);
			}, sound.time - this.channels[channelId].startTime);
		});
	};
}

const app = new App();
app.InitializeApp();
