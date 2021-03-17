var StartsApp = /** @class */ (function () {
    function StartsApp() {
        this.values = [];
        this.RunApp();
    }
    StartsApp.prototype.RunApp = function () {
        this.InitializeVariables();
        this.GetValuesFromInputs();
    };
    StartsApp.prototype.InitializeVariables = function () {
        var _this = this;
        this.numberOfInputs = 0;
        this.inputContainer = document.querySelector("#input-container");
        this.inputGenerator = document.querySelector("#input-generator");
        this.inputGenerator.addEventListener('change', function (e) {
            var target = e.target;
            _this.GenerateInputs(target.value);
            _this.UpdateValues();
        });
    };
    StartsApp.prototype.GenerateInputs = function (number) {
        var _this = this;
        while (number > this.numberOfInputs) {
            var inputWrapper = document.createElement('div');
            inputWrapper.className = "input-wrapper";
            inputWrapper.id = "input-wrapper-" + this.numberOfInputs;
            var input = document.createElement('input');
            input.addEventListener("input", function () { return _this.UpdateValues(); });
            input.className = 'input';
            input.type = 'number';
            var closeButton = document.createElement('button');
            closeButton.textContent = "X";
            closeButton.addEventListener('click', function (e) {
                var target = e.target;
                target.parentElement.remove();
                _this.numberOfInputs--;
                _this.inputGenerator.value = _this.numberOfInputs.toString();
            });
            inputWrapper.append(input);
            inputWrapper.append(closeButton);
            this.inputContainer.append(inputWrapper);
            this.numberOfInputs++;
        }
        while (number < this.numberOfInputs) {
            document.querySelector("#input-wrapper-" + (this.numberOfInputs - 1)).remove();
            this.numberOfInputs--;
        }
    };
    StartsApp.prototype.GetValuesFromInputs = function () {
        this.sumResult = document.querySelector("#sum");
        this.avgResult = document.querySelector("#avg");
        this.maxResult = document.querySelector("#max");
        this.minResult = document.querySelector("#min");
    };
    StartsApp.prototype.UpdateValues = function () {
        this.values = [];
        var sum = 0;
        for (var i = 0; i < this.inputContainer.childElementCount; i++) {
            var child = this.inputContainer.children[i].firstChild;
            sum += +child.value;
            this.values.push(+child.value);
        }
        var avg = sum / this.numberOfInputs;
        var min = Math.min.apply(Math, this.values);
        var max = Math.max.apply(Math, this.values);
        this.sumResult.value = "" + sum;
        this.avgResult.value = "" + avg;
        this.minResult.value = "" + min;
        this.maxResult.value = "" + max;
    };
    return StartsApp;
}());
var app = new StartsApp();
//# sourceMappingURL=index.js.map