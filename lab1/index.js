var StartsApp = /** @class */ (function () {
    function StartsApp() {
        this.RunApp();
    }
    StartsApp.prototype.RunApp = function () {
        this.GetValuesFromInputs();
        this.WatchChangesOnInputs();
    };
    StartsApp.prototype.GetValuesFromInputs = function () {
        this.input1 = document.querySelector('#input1');
        this.input2 = document.querySelector("#input2");
        this.input3 = document.querySelector("#input3");
        this.input4 = document.querySelector("#input4");
        console.log(this.input1);
        console.log(document.querySelector(".input-data"));
        this.sumResult = document.querySelector("#sum");
        this.avgResult = document.querySelector("#avg");
        this.maxResult = document.querySelector("#max");
        this.minResult = document.querySelector("#min");
    };
    StartsApp.prototype.WatchChangesOnInputs = function () {
        var _this = this;
        this.input1.addEventListener("input", function () { return _this.Count(); });
        this.input2.addEventListener("input", function () { return _this.Count(); });
        this.input3.addEventListener("input", function () { return _this.Count(); });
        this.input4.addEventListener("input", function () { return _this.Count(); });
    };
    StartsApp.prototype.Count = function () {
        var number1 = +this.input1.value;
        var number2 = +this.input2.value;
        var number3 = +this.input3.value;
        var number4 = +this.input4.value;
        var sum = number1 + number2 + number3 + number4;
        var avg = sum / 4;
        var min = Math.min.apply(Math, [number1, number2, number3, number4]);
        var max = Math.max.apply(Math, [number1, number2, number3, number4]);
        this.sumResult.value = "" + sum;
        this.avgResult.value = "" + avg;
        this.minResult.value = "" + min;
        this.maxResult.value = "" + max;
    };
    return StartsApp;
}());
var app = new StartsApp();
//# sourceMappingURL=index.js.map