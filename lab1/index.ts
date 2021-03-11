class StartsApp {
    input1 : HTMLInputElement;
    input2 : HTMLInputElement;
    input3 : HTMLInputElement;
    input4 : HTMLInputElement;

    sumResult : HTMLInputElement;
    avgResult : HTMLInputElement;
    maxResult : HTMLInputElement;
    minResult : HTMLInputElement;
    constructor(){
        this.RunApp();
    }

    RunApp(){
        this.GetValuesFromInputs();
        this.WatchChangesOnInputs();
    }

    GetValuesFromInputs(){
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
    }

    WatchChangesOnInputs(){
        this.input1.addEventListener("input", () => this.Count());
        this.input2.addEventListener("input", () => this.Count());
        this.input3.addEventListener("input", () => this.Count());
        this.input4.addEventListener("input", () => this.Count());
    }

    Count(){
        let number1 = +this.input1.value;
        let number2 = +this.input2.value;
        let number3 = +this.input3.value;
        let number4 = +this.input4.value;

        let sum = number1 + number2 + number3 + number4;
        let avg = sum / 4;
        let min = Math.min(...[number1, number2, number3, number4]);
        let max = Math.max(...[number1, number2, number3, number4]);

        this.sumResult.value = `${sum}`;
        this.avgResult.value = `${avg}`;
        this.minResult.value = `${min}`;
        this.maxResult.value = `${max}`;
    }
}

let app = new StartsApp();