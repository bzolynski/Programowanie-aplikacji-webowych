class StartsApp {
    inputContainer : HTMLElement;
    inputGenerator : HTMLInputElement;

    numberOfInputs: number;
    values : Array<number> = [];

    sumResult : HTMLInputElement;
    avgResult : HTMLInputElement;
    maxResult : HTMLInputElement;
    minResult : HTMLInputElement;
    constructor(){
        this.RunApp();
    }

    RunApp(){
        this.InitializeVariables();
        this.GetValuesFromInputs();
    }

    InitializeVariables(){

        this.numberOfInputs = 0;
        this.inputContainer = document.querySelector("#input-container");
        this.inputGenerator = document.querySelector("#input-generator");
        this.inputGenerator.addEventListener('change', (e) => {
            var target = e.target as HTMLInputElement;
            this.GenerateInputs(target.value);
            this.UpdateValues();
        })
    }

    GenerateInputs(number){

        while(number > this.numberOfInputs){

            var inputWrapper : HTMLElement = document.createElement('div');
            inputWrapper.className = "input-wrapper";
            inputWrapper.id = "input-wrapper-" + this.numberOfInputs;

            var input : HTMLInputElement = document.createElement('input'); 
            input.addEventListener("input", () => this.UpdateValues())
            input.className = 'input';
            input.type = 'number';

            var closeButton : HTMLElement = document.createElement('button');
            closeButton.textContent = "X";
            closeButton.addEventListener('click', (e) => {
                let target = e.target as HTMLElement;
                target.parentElement.remove();
                this.numberOfInputs--;
                this.inputGenerator.value = this.numberOfInputs.toString();
            })
            
            inputWrapper.append(input);
            inputWrapper.append(closeButton);
            this.inputContainer.append(inputWrapper);

            this.numberOfInputs++;
        }

        while(number < this.numberOfInputs){

            document.querySelector("#input-wrapper-" + (this.numberOfInputs-1)).remove();
            this.numberOfInputs--;
        }
    }

    GetValuesFromInputs(){

        this.sumResult = document.querySelector("#sum");
        this.avgResult = document.querySelector("#avg");
        this.maxResult = document.querySelector("#max");
        this.minResult = document.querySelector("#min");
    }

    UpdateValues(){
        this.values = [];
        let sum : number = 0;
        
        for(let i = 0; i < this.inputContainer.childElementCount; i++){
            let child = this.inputContainer.children[i].firstChild as HTMLInputElement;
            sum += +child.value;
            this.values.push(+child.value);
        }

        let avg = sum / this.numberOfInputs;
        let min = Math.min(...this.values);
        let max = Math.max(...this.values);

        this.sumResult.value = `${sum}`;
        this.avgResult.value = `${avg}`;
        this.minResult.value = `${min}`;
        this.maxResult.value = `${max}`;
    }
}

let app = new StartsApp();