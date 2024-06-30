'use strict';


const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

let scores= [0,0]
score0El.textContent = 0;
score1El.textContent = 0;
let activePlayer =0;
let currentScore= 0;
let playing = true;

function changePlayer(){
    currentScore=0;
    document.getElementById(`current--${activePlayer}`).textContent= 0;
    activePlayer= activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');

}

btnRollEl.addEventListener('click', function(){
    if(playing){
        const dice = Math.trunc(Math.random()*6) +1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        if(dice !== 1){
            currentScore+=dice;
            document.getElementById(`current--${activePlayer}`).textContent= currentScore;
        }
        else{
            changePlayer();
        }
    }
})

btnHoldEl.addEventListener('click', function(){
    if(playing){
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if(scores[activePlayer]>=100){
            playing= false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else{
           changePlayer();
        }
    }
})


btnNewEl.addEventListener('click', function(){
    playing= true;
    currentScore=0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent= 0;
    current1El.textContent= 0;
    scores=[0,0];
    diceEl.classList.remove('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    activePlayer=0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
})