const cards = document.querySelectorAll('.card');
let hasFlipperCard = false;
let firstCard, secondCard;
let lockBoard = false;

//função que vira as cartas
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');     //this é o contexto da nossa função, ela vai adicionar a classe flip ao elemento card. O toggle ele inverte a função, então vai ficar virando a carta, mas não podemos virar quando quiser, apenas uma vez, então usamos o "add", pois só permite apertar uma vez.
    if(!hasFlipperCard){    //essa função será acionada quando clicarmos na nossa carta
        hasFlipperCard = true;
        firstCard = this;   
        return;
    }

    secondCard = this;
    hasFlipperCard = false;
    checkForMath();
}

//função que checa se as cartas são iguais
function checkForMath(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetboard();
}

//função que desvira as cartas
function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetboard();
    }, 1000);
}

//função que reseta o tabuleiro
function resetboard(){
    [hasFlipperCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função de embaralhar as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();


//adiciona evento de clique na carta
cards.forEach((cards) => {
    cards.addEventListener('click', flipCard)
});