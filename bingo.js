class BingoGenerator {
    constructor() {
        this.generateButton = document.getElementById('generateButton');
        this.output = document.getElementById('output');
        this.gameString = "BINGO";
        this.number;
        this.numberHistory = [];


        this.generateButton.addEventListener('click', () => {
            //console.log('clicked');
            this. randomNumber();
        });

    }

    update() {
        this.output.innerHTML = `<p>${this.number}</p>`

        for(let i = 1; i < Math.min(6, this.numberHistory.length); i++) {
            this.output.innerHTML += `
            <span>${this.numberHistory[i]}</span>
            `
            
        }
    }

    randomNumber() {
        do {
            let randomNumber = Math.floor(Math.random() * 15);
            let randomLetter = this.gameString[Math.floor(Math.random() * this.gameString.length)];
            if(randomLetter === 'B') {

            } else if(randomLetter === 'I') {
                randomNumber += 15;
            } else if (randomLetter === 'N') {
                randomNumber += 30;
            } else if (randomLetter === 'G') {
                randomNumber += 45;
            } else {
                randomNumber += 60;
            }
            if(this.numberHistory.lenght >= 74) {
                this.numberHistory = [];
            }
            this.number = randomLetter + randomNumber;
        } while (this.numberHistory.includes(this.number));

        this.numberHistory.unshift(this.number);

        this.update();

        //console.log(this.numberHistory);
    }
}

class CardGenerator {
    constructor() {
        this.output = document.getElementById('cardOutput');
        this.nodes = {
            b: [],
            i: [],
            n: [],
            g: [],
            o: []
        };
        
        document.getElementById('generateCard').addEventListener('click', ()=> {
            this.generate();
        });

    }

    update() {
        let output = '';

        output += `
          <div class="card-body">
        `;

        for(let i in this.nodes) {
            output += `<div class="col-header">${i.toUpperCase()}</div>`
            this.nodes[i].forEach((el) => {
                if (el === 'free') {
                output += `<div class="col-item red-bg"><span class="col-text">${el}</span></div>`
                } else {
                    output += `<div class="col-item"><span class="col-text">${i.toUpperCase() + " " + el}</span></div>`
                }
            });
        }
        output += `</div>`;

        this.output.innerHTML = output;

        let cardItems = document.querySelectorAll('.col-item');
        cardItems.forEach(el => {
            el.addEventListener('click', (e) => {
                el.classList.add('red-bg');
            })
        })
    }

    generate() {
        let counter = 0;
        this.nodes = {
            b: [],
            i: [],
            n: [],
            g: [],
            o: []
        };

        for( let i in this.nodes) {
            counter++ ;
            for(let j = 0; j < 5; j++) {
                let randomNumber = Math.ceil(Math.random() * 15) +(counter * 15);
                do {
                    randomNumber = Math.ceil(Math.random() * 15) + (counter + 15)
                } while (this.nodes[i].includes(randomNumber))
                if(counter === 2 && j === 2) {
                    this.nodes[i].push('free')
                } else {
                this.nodes[i].push(randomNumber);
            }
          }
            counter++;
    }
    this.update();
   }
}

const generator = new BingoGenerator;

const card = new CardGenerator;

let hostButton = document.getElementById('displayGenerator');
let playerButton = document.getElementById('displayCard');

let hostMain = document.getElementById('generateMain');
let playerMain = document.getElementById('gameBoardMain');

hostButton.addEventListener('click', (e) => {
    hostMain.style.display = 'block';
    playerMain.style.display= 'none';
});

playerButton.addEventListener('click', (e) => {
    playerMain.style.display = 'block';
    hostMain.style.display = 'none';
});