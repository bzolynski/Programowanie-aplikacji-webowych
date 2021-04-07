var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.sounds = [];
        this.channels = [];
        this.InitializeApp = function () {
            document.addEventListener('keypress', _this.ListenKeyPress);
            document.querySelectorAll('.channel .recButton').forEach(function (recButton) {
                recButton.addEventListener('click', _this.SetActiveChannel);
            });
            document.querySelectorAll('.channel .playButton').forEach(function (playButton) {
                playButton.addEventListener('click', _this.PlayForChannel);
            });
            _this.GetSounds();
            _this.CreateChannels();
        };
        this.ListenKeyPress = function (event) {
            var key = event.key;
            var time = event.timeStamp;
            _this.ButtonClickEffectToggle(key);
            _this.PlaySound(key);
            if (_this.activeChannel != null) {
                _this.RecordForChannel(key, time);
            }
        };
        this.ButtonClickEffectToggle = function (key) {
            var button = document.querySelector("[data-button-key=\"" + key + "\"]");
            if (button != null) {
                button.classList.toggle('keyClicked');
                setTimeout(function () {
                    button.classList.toggle('keyClicked');
                }, 100);
            }
        };
        this.GetSounds = function () {
            document.querySelectorAll('[data-sound]').forEach(function (el) {
                _this.sounds.push(el);
            });
        };
        this.CreateChannels = function () {
            _this.channels.push({ sounds: [], number: 0, startTime: 0 });
            _this.channels.push({ sounds: [], number: 1, startTime: 0 });
            _this.channels.push({ sounds: [], number: 2, startTime: 0 });
            _this.channels.push({ sounds: [], number: 3, startTime: 0 });
        };
        this.PlaySound = function (key) {
            var sound = _this.sounds.find(function (sound) { return sound.dataset.key == key; });
            if (sound != null) {
                sound.currentTime = 0;
                sound.play();
            }
        };
        this.RecordForChannel = function (key, time) {
            _this.channels[_this.activeChannel].sounds.push({ key: key, time: time });
        };
        this.SetActiveChannel = function (event) {
            var button = event.target;
            var channelId = parseInt(button.parentElement.id);
            if (channelId != _this.activeChannel && _this.activeChannel == null) {
                button.classList.add('acriveRec');
                _this.activeChannel = parseInt(button.parentElement.id);
                _this.channels[_this.activeChannel].sounds = [];
                _this.channels[_this.activeChannel].startTime = event.timeStamp;
            }
            else if (channelId == _this.activeChannel) {
                button.classList.remove('acriveRec');
                _this.activeChannel = null;
            }
        };
        this.PlayForChannel = function (event) {
            var button = event.target;
            var channelId = parseInt(button.parentElement.id);
            _this.channels[channelId].sounds.forEach(function (sound) {
                setTimeout(function () {
                    _this.PlaySound(sound.key);
                }, sound.time - _this.channels[channelId].startTime);
            });
        };
    }
    return App;
}());
var app = new App();
app.InitializeApp();
