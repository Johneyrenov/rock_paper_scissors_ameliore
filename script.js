document.addEventListener('DOMContentLoaded', function() {
    // Elements du DOM
    const choices = document.querySelectorAll('.choice');
    const playerScoreEl = document.getElementById('player-score');
    const computerScoreEl = document.getElementById('computer-score');
    const roundResultEl = document.getElementById('round-result');
    const gameResultEl = document.getElementById('game-result');
    const playerSelectionImg = document.getElementById('player-selection');
    const computerSelectionImg = document.getElementById('computer-selection');
    const resetBtn = document.querySelector('.reset-btn');
    
    // Variables du jeu
    let playerScore = 0;
    let computerScore = 0;
    let gameEnded = false;
    
    // Images pour les choix
    const choiceImages = {
        rock: 'pictures/fist.png',
        paper: 'pictures/hand-paper.png',
        scissors: 'pictures/scissors.png',
        default: 'pictures/football-player.png'
    };
    
    // Fonction pour obtenir un choix aléatoire de l'ordinateur
    function getRandomChoice() {
        const options = ["rock", "paper", "scissors"];
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }
    
    // Fonction pour jouer un tour
    function playRound(playerSelection, computerSelection) {
        // Mettre à jour les images des sélections
        playerSelectionImg.src = choiceImages[playerSelection];
        computerSelectionImg.src = choiceImages[computerSelection];
        
        if (playerSelection === computerSelection) {
            return "Égalité! Rejouez.";
        }
        
        if (
            (playerSelection === "rock" && computerSelection === "scissors") ||
            (playerSelection === "paper" && computerSelection === "rock") ||
            (playerSelection === "scissors" && computerSelection === "paper")
        ) {
            playerScore++;
            playerScoreEl.textContent = playerScore;
            return `Vous gagnez! ${playerSelection} bat ${computerSelection}`;
        } else {
            computerScore++;
            computerScoreEl.textContent = computerScore;
            return `Vous perdez! ${computerSelection} bat ${playerSelection}`;
        }
    }
    
    // Verifier si le jeu est terminé
    function checkGameEnd() {
        if (playerScore >= 5 || computerScore >= 5) {
            gameEnded = true;
            if (playerScore > computerScore) {
                gameResultEl.textContent = "Vous avez gagné la partie! 🎉🥳✨";
                gameResultEl.style.color = "#27ae60";
            } else {
                gameResultEl.textContent = "Vous avez perdu la partie. ❌😔";
                gameResultEl.style.color = "#e74c3c";
            }
            
            // Désactiver les choix
            choices.forEach(choice => {
                choice.style.opacity = "0.5";
                choice.style.cursor = "not-allowed";
            });
        }
    }
    
    // Reinitialiser le jeu
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        gameEnded = false;
        
        playerScoreEl.textContent = "0";
        computerScoreEl.textContent = "0";
        roundResultEl.textContent = "Choisissez une option pour commencer!";
        gameResultEl.textContent = "";
        gameResultEl.style.color = "";
        
        playerSelectionImg.src = choiceImages.default;
        computerSelectionImg.src = choiceImages.default;
        
        // Reactiver les choix
        choices.forEach(choice => {
            choice.style.opacity = "1";
            choice.style.cursor = "pointer";
        });
    }
    
    // Ecouteurs d'événements
    choices.forEach(choice => {
        choice.addEventListener('click', function() {
            if (gameEnded) return;
            
            const playerChoice = this.getAttribute('data-choice');
            const computerChoice = getRandomChoice();
            
            const result = playRound(playerChoice, computerChoice);
            roundResultEl.textContent = result;
            
            checkGameEnd();
        });
    });
    
    resetBtn.addEventListener('click', resetGame);
});
