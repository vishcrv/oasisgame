document.addEventListener('DOMContentLoaded', () => {
    // Game State
    const state = {
        playerName: '',
        wallet: 200,
        currentScreen: 'welcome-screen',
        dialogIndex: 0,
        gameTimer: null,
        gameStartTime: null,
        
        // Rock Paper Scissors
        rpsPlayerScore: 0,
        rpsCpuScore: 0,
        
        // Casino Royal
        casinoStreak: 0,
        casinoPoints: 0,
        selectedCard: '',
        currentBet: 0,
        
        // Find Number Game
        secretNumber: 0,
        attemptsLeft: 3,
        
        // Hall of Fame
        hallOfFame: [
            { name: "Vishnu CV", time: "15 minutes 20 seconds" }
        ]
    };
    
    // ASCII Art for Welcome Screen
    const asciiArt = `
     ██████████████████████████████████████████████████████████████████████████████████████████
     ██████████████████████████████████████████████████████████████████████████████████████████
     ████████████████████████████████████████████████████████████▓▒▒▒▒█████████████████████████
     ████████████████████████████████████████████████████████████▒░░░░█████████████████████████
     ████████▓▒░░░░░░░░░░░░▒█▒░░░░░░░░░░░░░░▒▓██▒░░░░░░░░░░░░░░▒▓▒▒▒▒█▓▒░░░░░░░░░░░░░░▓███████
     ████████░░░░▒▒▒▒▒▒▒▒░░░░▒▓▒▒▒▒▒▒▒▒▒▒▒▒░░░░█░░░░░▒▒▒▒▒▒▒▒▒▒▒▓▒░░░░▓░░░░▒▒▒▒▒▒▒▒▒▒▒▒████████
     ████████░░░░████████▒░░░▒██▓▒▒▒▒▒▒▒▒██░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▓██▒░░░░▒░░░░▒▒▒▒▒▒▒▒▒▒▓█████████
     ████████░░░░████████▒░░░▒▓░░░░░░░░░░▓█░░░░█▓░░░░░░░░░░░░░░░▒▒░░░░█▒░░░░░░░░░░░░░░░████████
     ████████░░░░▓███████▒░░░▒▒░░░░▓▓▓▓▓▓▓█░░░░███▓▓▓▓▓▓▓▓▓▓▒░░░▒▒░░░░███▓▓▓▓▓▓▓▓▓▓░░░░▓███████
     ████████░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░▓░░░░░░░░░░░░░░░░▓▒░░░░▒░░░░░░░░░░░░░░░░████████
     █████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█████████
     ██████████████████████████████████████████████████████████████████████████████████████████
                                                                                ~ Vishnu CV
    `;
    
    // Game Over ASCII Art
    const gameOverAscii = `

    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ███████████████████████▒░▒▒▒▒▒▓█████▒░▒░▒█████▓░░▓███▓░░▒██▓░░▒▒▒▒▒▒▒▒████████████████████
    ████████████████████▓▒░▒▓█████████▓░▒▓█▓▒░▓███▓░░░░▓░░░░▒██▓░░▓███████████████████████████
    ████████████████████▒░░███▒▒▒▒▓██▒░░▓███▓░░▒██▓░░░░░░░░░▒██▓░░░▒▒▒▒▒██████████████████████
    ████████████████████▓░░▓███▓░░▓██▒░░▒▒▒▒▒░░▒██▓░░▓█▒▓█░░▒██▓░░▒███████████████████████████
    ██████████████████████▓░░▓▓▒░░▓██▒░░▓███▓░░▒██▓░░▓████░░▒██▓░░▒▓▓▓▓▓▓▓████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████▓▓▓▓▓▓▓█████▓▓█████▓▓████▓▓▓▓▓▓▓▓▓████▓▓▓▓▓▓▓▓██████████████████████
    ████████████████████▓▒░▒▓▓▓▒░▒▓██▒░░▓███▓░░▒██▓░░▒▓▓▓▓▓▓▓██▓░░▒▓▓▓▓░▒▓████████████████████
    ████████████████████▒░░████▓░░▓██▒░░▓███▓░░▒██▓░░▓█████████▓░░▓████░░▒████████████████████
    ████████████████████▒░░████▓░░▓██▓▒░░░▓░░░▒▓██▓░░▒▒▒▒▒▒████▓░░▒▓▓▒░▒▒▓████████████████████
    ████████████████████▒░░████▓░░▓████▓▒░░░▒▓████▓░░▓█████████▓░░▒▓░░░▒██████████████████████
    █████████████████████▓▒▒▒▒▒▒▒█████████▒███████▓▒▒▒▒▒▒▒▒▒▓██▓▒▒▓██▓▒▒▒▒████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████
    ██████████████████████████████████████████████████████████████████████████████████████████

    `;
    
    // Win ASCII Art
    const winAscii = `

   ██████████████████████████████████████████████████████████████████████████████████████████
   ██████████████████████████████████████████████████████████████████████████████████████████
   ██████████████████████████████████████████████████████████████████████████████████████████
   ██████████████████████████████████████████████████████████████████████████████████████████
   █████████▓▓▓▓▓█████████▓▓▓▓████████████████████████████████████▓▓▓▓▓█████████▓▓▓▓█████████
   █████████░░░░▒████████▓░░░░████████████████████████████████████░░░░▒████████▓░░░░█████████
   █████████░░░░▒████████▓░░░░████████████████████████████████████░░░░▒████████▓░░░░█████████
   █████████░░░░▒████████▓░░░░█████████░░░░░░░░░░░░░░░░░░█████████░░░░▒████████▓░░░░█████████
   █████████░░░░▒████████▓░░░░█████████░░░░░░░░░░░░░░░░░░█████████░░░░▒████████▓░░░░█████████
   █████████░░░░░░░░░░░░░░░░░░█████████░░░░▒████████▓░░░░█████████░░░░▒████████▓░░░░█████████
   █████████░░░░░░░░░░░░░░░░░░█████████░░░░▒████████▓░░░░█████████░░░░▒████████▓░░░░█████████
   █████████▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░░░█████████░░░░▒████████▓░░░░█████████░░░░▒████████▓░░░░█████████
   ██████████████████████▓░░░░█████████░░░░▒████████▓░░░░█████████░░░░▒████████▓░░░░█████████
   ██████████████████████▓░░░░█████████░░░░▒████████▓░░░░█████████░░░░▒████████▓░░░░█████████
   ██████████████████████▓░░░░█████████░░░░▒████████▓░░░░█████████░░░░▒████████▓░░░░█████████
   ██████████████████████▓░░░░█████████░░░░▒████████▓░░░░█████████░░░░▒████████▓░░░░█████████
   █████████░░░░░░░░░░░░░░░░░░█████████░░░░░░░░░░░░░░░░░░█████████░░░░░░░░░░░░░░░░░░█████████
   █████████░░░░░░░░░░░░░░░░░░█████████░░░░░░░░░░░░░░░░░░█████████░░░░░░░░░░░░░░░░░░█████████
   ██████████████████████████████████████████████████████████████████████████████████████████
   ██████████████████████████████████████████████████████████████████████████████████████████
    `;
    
    // Dialog sequences
    const dialogs = [
        "Welcome to OASIS - a little creative world made for you, where you can hangout for a while.",
        "I'm Hera and I will guide you through our OASIS.",
        "Enjoy Yourself!",
        "Hello there, What is your name?",
        "", // Player name input
        "NAME_PLACEHOLDER, Oh yeah cute!",
        "Oasis is offering you to play some mini games to entertain your time!! Are you excited?",
        "OASIS menu will pop up. To select and play the game shown in the OASIS menu, type the number next to the game you want to play when asked.",
        "If you win the games, the points will be transformed into OASIS currency and then will be added into your wallet as credentials.",
        "If you reach the highest score that is 20K OASIS currency in your wallet, you will win this Oasis Game completely!! :)",
        "And it is'nt that easy to complete the game.",
        "If you complete the game we would add your name to the OASIS game's Hall of Fame permanently! That's really worth than other games is'nt it?",
        "If you get zero out in the game, you will be eliminated from OASIS. Remember that & play careful at Casino Royal NAME_PLACEHOLDER.",
        "The faster you play the more rank you will be ahead in 'Hall of Fame'",
        "The game and the timer starts now NAME_PLACEHOLDER!!!",
        "But wait NAME_PLACEHOLDER, you are going without your wallet! I will give you one.",
        "Here's your WALLET! But it has only 200 OASIS currency left in balance :( I hope you will make your way right into The Hall of Fame by gaining 20K."
    ];
    
    // DOM Elements
    const elements = {
        welcomeScreen: document.getElementById('welcome-screen'),
        gameMenu: document.getElementById('game-menu'),
        rockPaperScissors: document.getElementById('rock-paper-scissors'),
        casinoRoyal: document.getElementById('casino-royal'),
        findNumber: document.getElementById('find-number'),
        gameOverScreen: document.getElementById('game-over-screen'),
        winScreen: document.getElementById('win-screen'),
        
        asciiArt: document.getElementById('ascii-art'),
        gameOverAscii: document.getElementById('game-over-ascii'),
        winAscii: document.getElementById('win-ascii'),
        dialogText: document.getElementById('dialog-text'),
        userInput: document.getElementById('user-input'),
        submitBtn: document.getElementById('submit-btn'),
        walletBalance: document.getElementById('wallet-balance'),
        
        gameOverText: document.getElementById('game-over-text'),
        winText: document.getElementById('win-text'),
        hallOfFameContent: document.getElementById('hall-of-fame-content'),
        restartButton: document.getElementById('restart-button'),
        playAgainButton: document.getElementById('play-again-button'),
        
        menuOptions: document.querySelectorAll('.menu-option'),
        menuInput: document.getElementById('menu-input'),
        menuSubmit: document.getElementById('menu-submit'),
        playerName: document.getElementById('player-name'),
        
        // Rock Paper Scissors
        playerScore: document.getElementById('player-score'),
        cpuScore: document.getElementById('cpu-score'),
        rpsMessage: document.getElementById('rps-message'),
        rpsChoices: document.querySelectorAll('.choice'),
        backFromRps: document.getElementById('back-from-rps'),
        
        // Casino Royal
        cardDisplay: document.getElementById('card-display'),
        casinoMessage: document.getElementById('casino-message'),
        betAmount: document.getElementById('bet-amount'),
        placeBet: document.getElementById('place-bet'),
        cardChoices: document.getElementById('card-choices'),
        cardChoice: document.querySelectorAll('.card-choice'),
        streakCount: document.getElementById('streak-count'),
        pointsEarned: document.getElementById('points-earned'),
        casinoActions: document.getElementById('casino-actions'),
        betAgain: document.getElementById('bet-again'),
        collectWinnings: document.getElementById('collect-winnings'),
        backFromCasino: document.getElementById('back-from-casino'),
        
        // Find Number Game
        findMessage: document.getElementById('find-message'),
        numberGuess: document.getElementById('number-guess'),
        submitGuess: document.getElementById('submit-guess'),
        attemptsLeft: document.getElementById('attempts-left'),
        backFromFind: document.getElementById('back-from-find')
    };
    
    // Initialize the game
    function init() {
        // Display ASCII art
        elements.asciiArt.textContent = asciiArt;
        elements.gameOverAscii.textContent = gameOverAscii;
        elements.winAscii.textContent = winAscii;
        
        // Set initial dialog
        elements.dialogText.textContent = dialogs[state.dialogIndex];
        
        // Start the game timer
        state.gameStartTime = Date.now();
        state.gameTimer = setInterval(checkGameCompletion, 1000);
        
        // Hide wallet at the start
        document.getElementById('wallet-container').classList.add('hidden');
        
        // Hide input field by default (only show for name input)
        elements.userInput.classList.add('hidden');
        
        // Setup event listeners
        setupEventListeners();
        
        // Update wallet display (though it's hidden initially)
        updateWallet();
    }
    
    // Event Listeners
    function setupEventListeners() {
        // Next button for dialog progression - auto-progress for all screens 
        // except name input which requires text
        elements.submitBtn.addEventListener('click', () => {
            if (state.dialogIndex !== 4 || elements.userInput.value.trim()) {
                progressDialog();
            }
        });
        
        // Allow pressing Enter key in input field (only works for name input)
        elements.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && elements.userInput.value.trim()) {
                progressDialog();
            }
        });
        
        // Menu options - both clicking and typing
        elements.menuOptions.forEach(option => {
            option.addEventListener('click', () => {
                const gameNumber = option.getAttribute('data-game');
                elements.menuInput.value = gameNumber;
            });
        });
        
        // Menu submit button
        elements.menuSubmit.addEventListener('click', () => {
            const gameNumber = elements.menuInput.value.trim();
            startGame(gameNumber);
        });
        
        // Menu input enter key
        elements.menuInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const gameNumber = elements.menuInput.value.trim();
                startGame(gameNumber);
            }
        });
        
        // Add keyboard input for menu selection
        document.addEventListener('keydown', (e) => {
            if (state.currentScreen === 'game-menu') {
                const key = e.key;
                if (key === '1' || key === '2' || key === '3') {
                    elements.menuInput.value = key;
                }
            }
        });
        
        // Restart buttons
        elements.restartButton.addEventListener('click', restartGame);
        elements.playAgainButton.addEventListener('click', restartGame);
        
        // Rock Paper Scissors
        elements.rpsChoices.forEach(choice => {
            choice.addEventListener('click', () => {
                playRockPaperScissors(choice.id);
            });
        });
        elements.backFromRps.addEventListener('click', returnToMenu);
        
        // Casino Royal
        elements.placeBet.addEventListener('click', placeBet);
        elements.cardChoice.forEach(card => {
            card.addEventListener('click', () => {
                selectCard(card.textContent);
            });
        });
        elements.betAgain.addEventListener('click', betAgain);
        elements.collectWinnings.addEventListener('click', collectCasinoWinnings);
        elements.backFromCasino.addEventListener('click', returnToMenu);
        
        // Find Number Game
        elements.submitGuess.addEventListener('click', submitNumberGuess);
        elements.backFromFind.addEventListener('click', returnToMenu);
    }
    
    // Dialog progression
    function progressDialog() {
        const input = elements.userInput.value.trim();
        
        // Handle player name input
        if (state.dialogIndex === 4) {
            if (input && input.length > 0) {
                // Limit name length to a reasonable size
                state.playerName = input.substring(0, 20);
                elements.playerName.textContent = state.playerName;
            } else {
                elements.dialogText.textContent = "Please enter your name:";
                return;
            }
        }
        
        state.dialogIndex++;
        
        if (state.dialogIndex < dialogs.length) {
            let dialogText = dialogs[state.dialogIndex];
            dialogText = dialogText.replace(/NAME_PLACEHOLDER/g, state.playerName);
            elements.dialogText.textContent = dialogText;
            elements.userInput.value = "";
            
            // Show wallet only after the player receives 200 currency (last dialog)
            if (state.dialogIndex === dialogs.length - 1) {
                document.getElementById('wallet-container').classList.remove('hidden');
            }
            
            // Show input field ONLY for name input, hide for all other dialogs
            if (state.dialogIndex === 4) {
                elements.userInput.classList.remove('hidden');
            } else {
                elements.userInput.classList.add('hidden');
            }
        } else {
            // Move to the game menu
            showScreen('game-menu');
        }
    }
    
    // Screen navigation
    function showScreen(screenId) {
        // Hide all screens
        elements.welcomeScreen.classList.add('hidden');
        elements.gameMenu.classList.add('hidden');
        elements.rockPaperScissors.classList.add('hidden');
        elements.casinoRoyal.classList.add('hidden');
        elements.findNumber.classList.add('hidden');
        elements.gameOverScreen.classList.add('hidden');
        elements.winScreen.classList.add('hidden');
        
        // Show requested screen
        document.getElementById(screenId).classList.remove('hidden');
        state.currentScreen = screenId;
    }
    
    // Start a specific game
    function startGame(gameNumber) {
        // Validate input
        if (!['1', '2', '3'].includes(gameNumber)) {
            alert("Please enter a valid game number (1, 2, or 3)");
            return;
        }
        
        switch (gameNumber) {
            case "1":
                // Rock Paper Scissors
                showScreen('rock-paper-scissors');
                resetRPSGame();
                elements.rpsMessage.textContent = "Choose Rock, Paper, or Scissors!";
                break;
            case "2":
                // Casino Royal
                if (state.wallet < 500) {
                    alert("You need at least 500 OASIS currency to play Casino Royal!");
                    return;
                }
                showScreen('casino-royal');
                resetCasinoGame();
                break;
            case "3":
                // Find Number Game
                showScreen('find-number');
                resetFindNumberGame();
                break;
        }
    }
    
    // Return to the main menu
    function returnToMenu() {
        showScreen('game-menu');
        elements.menuInput.value = ""; // Clear menu input
        
        // Reset any possible interrupted games
        resetRPSGame();
        resetCasinoGame();
        resetFindNumberGame();
    }
    
    // Update wallet display
    function updateWallet() {
        elements.walletBalance.textContent = state.wallet;
        
        // Check for game over (if wallet is 0)
        if (state.wallet <= 0 && state.currentScreen !== 'game-over-screen') {
            gameOver();
        }
        
        // Check for win (if wallet reaches 20K)
        if (state.wallet >= 20000 && state.currentScreen !== 'win-screen') {
            winGame();
        }
    }
    
    // Check game completion (win or loss)
    function checkGameCompletion() {
        // Only check if we're not already on a game over or win screen
        if (state.currentScreen === 'game-over-screen' || state.currentScreen === 'win-screen') {
            return;
        }
        
        if (state.wallet >= 20000) {
            winGame();
        } else if (state.wallet <= 0) {
            gameOver();
        }
    }
    
    // Game over (when wallet reaches 0)
    function gameOver() {
        clearInterval(state.gameTimer);
        
        // Set game over message
        const gameOverMessage = `
Oh sorry! Your balance became Zero, SORRY!
We have to eliminate you from the game! We have no other choice.

I'm the creator of this game OASIS.
The Game is concluded... I really had no other choice than to kill you in game.
It's rules that I can't change, ${state.playerName}.
Thanks for really playing my game!
I'm shutting down this game! Goodbye ${state.playerName}.
        `;
        
        elements.gameOverText.textContent = gameOverMessage;
        
        // Show game over screen
        showScreen('game-over-screen');
    }
    
    // Win game (when wallet reaches 20K)
    function winGame() {
        clearInterval(state.gameTimer);
        
        // Calculate elapsed time
        const elapsedTime = Math.floor((Date.now() - state.gameStartTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        const timeString = `${minutes} minutes ${seconds} seconds`;
        
        // Add player to Hall of Fame
        state.hallOfFame.push({
            name: state.playerName,
            time: timeString
        });
        
        // Sort Hall of Fame by time (faster times first)
        state.hallOfFame.sort((a, b) => {
            const timeA = a.time.split(' ');
            const timeB = b.time.split(' ');
            
            const minsA = parseInt(timeA[0]);
            const secsA = parseInt(timeA[2]);
            const totalSecsA = minsA * 60 + secsA;
            
            const minsB = parseInt(timeB[0]);
            const secsB = parseInt(timeB[2]);
            const totalSecsB = minsB * 60 + secsB;
            
            return totalSecsA - totalSecsB;
        });
        
        // Create Hall of Fame display
        const hallOfFameDisplay = createHallOfFameDisplay();
        elements.hallOfFameContent.innerHTML = hallOfFameDisplay;
        
        // Set win message
        const winMessage = `
Congratulations, ${state.playerName}!

Your Wallet balance has reached 20K OASIS currency!
You have won the game in ${timeString}!

Oh Yeaaahhhh! ${state.playerName} you have reached the end of the game
Which means you have reached the end of The OASIS!!
Legend like you winning the game is always proud for our OASIS team.
Congratulations, ${state.playerName}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Now we are going to add your name - ${state.playerName} to the Great Hall of Fame!
        `;
        
        elements.winText.textContent = winMessage;
        
        // Show win screen
        showScreen('win-screen');
    }
    
    // Create Hall of Fame display in ASCII box
    function createHallOfFameDisplay() {
        let display = '';
        
        // Create box top
        display += '┌' + '─'.repeat(50) + '┐\n';
        
        // Add title
        display += '│' + ' '.repeat(17) + 'Hall of Fame' + ' '.repeat(17) + '│\n';
        display += '│' + ' '.repeat(50) + '│\n';
        
        // Add entries
        state.hallOfFame.forEach((entry, index) => {
            const rank = index + 1;
            const entryText = `${rank}. ${entry.name} - ${entry.time}`;
            
            // Calculate padding
            const padding = 50 - entryText.length;
            const leftPad = Math.floor(padding / 2);
            const rightPad = padding - leftPad;
            
            display += '│' + ' '.repeat(leftPad) + entryText + ' '.repeat(rightPad) + '│\n';
        });
        
        // Fill remaining slots with empty lines
        const remainingSlots = Math.max(0, 10 - state.hallOfFame.length);
        for (let i = 0; i < remainingSlots; i++) {
            display += '│' + ' '.repeat(50) + '│\n';
        }
        
        // Add box bottom
        display += '└' + '─'.repeat(50) + '┘';
        
        return display;
    }
    
    // Restart game
    function restartGame() {
        // Reset state
        state.wallet = 200;
        state.dialogIndex = 0;
        state.currentScreen = 'welcome-screen';
        
        // Clear any existing timer
        if (state.gameTimer) {
            clearInterval(state.gameTimer);
        }
        
        // Restart timer
        state.gameStartTime = Date.now();
        state.gameTimer = setInterval(checkGameCompletion, 1000);
        
        // Show welcome screen
        showScreen('welcome-screen');
        
        // Reset dialog
        elements.dialogText.textContent = dialogs[state.dialogIndex];
        elements.userInput.value = '';
        
        // Update wallet display
        updateWallet();
    }
    
    // Rock Paper Scissors Game Logic
    function resetRPSGame() {
        state.rpsPlayerScore = 0;
        state.rpsCpuScore = 0;
        elements.playerScore.textContent = "0";
        elements.cpuScore.textContent = "0";
        
        // Enable choice buttons
        elements.rpsChoices.forEach(choice => {
            choice.style.pointerEvents = 'auto';
        });
    }
    
    function playRockPaperScissors(playerChoice) {
        // Disable choices temporarily
        elements.rpsChoices.forEach(choice => {
            choice.style.pointerEvents = 'none';
        });
        
        const choices = ["rock", "paper", "scissors"];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        
        let result = "";
        
        // Determine winner
        if (playerChoice === computerChoice) {
            result = "It's a tie!";
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            result = `${playerChoice} beats ${computerChoice}. You win!`;
            state.rpsPlayerScore++;
        } else {
            result = `${computerChoice} beats ${playerChoice}. The ROCK wins!`;
            state.rpsCpuScore++;
        }
        
        // Update display
        elements.playerScore.textContent = state.rpsPlayerScore;
        elements.cpuScore.textContent = state.rpsCpuScore;
        elements.rpsMessage.textContent = result;
        
        // Check for game end
        if (state.rpsPlayerScore >= 10) {
            elements.rpsMessage.textContent = "Congratulations! You defeated The ROCK! You won 2000 OASIS currency!";
            state.wallet += 2000;
            updateWallet();
            setTimeout(() => {
                alert("You won Rock Paper Scissors! 2000 OASIS currency has been added to your wallet. Press OK to continue.");
                returnToMenu();
            }, 1500);
        } else if (state.rpsCpuScore >= 10) {
            elements.rpsMessage.textContent = "The ROCK got the first 10 sets. You lost to our Champion!";
            setTimeout(() => {
                alert("You lost to The ROCK! No currency awarded. Press OK to continue.");
                returnToMenu();
            }, 1500);
        } else {
            // Continue game after a pause - mimic Python's input() behavior
            setTimeout(() => {
                // Re-enable choices
                elements.rpsChoices.forEach(choice => {
                    choice.style.pointerEvents = 'auto';
                });
            }, 1000);
        }
    }
    
    // Casino Royal Game Logic
    function resetCasinoGame() {
        state.casinoStreak = 0;
        state.casinoPoints = 0;
        state.selectedCard = '';
        state.currentBet = 0;
        
        elements.cardDisplay.textContent = "?";
        elements.casinoMessage.textContent = "Place your bet and try to guess the card (K, Q, J)";
        elements.streakCount.textContent = "0";
        elements.pointsEarned.textContent = "0";
        
        elements.cardChoices.classList.add('hidden');
        elements.casinoActions.classList.add('hidden');
        elements.betAmount.disabled = false;
        elements.placeBet.disabled = false;
        
        // Ensure card choices are re-enabled
        elements.cardChoice.forEach(el => {
            el.style.pointerEvents = 'auto';
        });
    }
    
    function placeBet() {
        const betAmount = parseInt(elements.betAmount.value);
        
        if (isNaN(betAmount) || betAmount < 500) {
            alert("Please enter a bet of at least 500 OASIS currency.");
            return;
        }
        
        if (betAmount > state.wallet) {
            alert("You don't have enough currency for this bet!");
            return;
        }
        
        // Deduct bet from wallet
        state.wallet -= betAmount;
        state.currentBet = betAmount;
        updateWallet();
        
        // Update UI
        elements.casinoMessage.textContent = "Select K, Q, or J to guess the dealer's card:";
        elements.cardChoices.classList.remove('hidden');
        elements.betAmount.disabled = true;
        elements.placeBet.disabled = true;
    }
    
    function betAgain() {
        // Keep the streak but reset for next round
        elements.cardDisplay.textContent = "?";
        elements.cardChoices.classList.remove('hidden');
        elements.casinoActions.classList.add('hidden');
        
        // Place the same bet as the streak bet
        const betAmount = state.casinoPoints;
        
        if (betAmount > state.wallet) {
            alert("You don't have enough currency for this bet!");
            resetCasinoGame();
            return;
        }
        
        // Deduct bet from wallet
        state.wallet -= betAmount;
        state.currentBet = betAmount;
        updateWallet();
        
        // Update UI
        elements.casinoMessage.textContent = "Select K, Q, or J to guess the dealer's card:";
    }
    
    function selectCard(card) {
        // Disable card choices during result display
        elements.cardChoice.forEach(el => {
            el.style.pointerEvents = 'none';
        });
        
        const cards = ['K', 'Q', 'J'];
        const dealerCard = cards[Math.floor(Math.random() * 3)];
        
        // Display dealer's card
        elements.cardDisplay.textContent = dealerCard;
        
        if (card === dealerCard) {
            // Win
            state.casinoStreak++;
            
            // Calculate winnings based on current bet and streak
            const winMultiplier = Math.pow(2, state.casinoStreak);
            const winnings = state.currentBet * winMultiplier;
            state.casinoPoints = winnings;
            
            // Update display
            elements.streakCount.textContent = state.casinoStreak;
            elements.pointsEarned.textContent = state.casinoPoints;
            elements.casinoMessage.textContent = `You guessed right! Combo Streak: ${state.casinoStreak}x, Multiplier: ${winMultiplier}x`;
            
            // Show betting options after a pause - mimic Python's input() behavior
            setTimeout(() => {
                // Show betting options
                elements.cardChoices.classList.add('hidden');
                elements.casinoActions.classList.remove('hidden');
                
                // Re-enable card choices for next round
                elements.cardChoice.forEach(el => {
                    el.style.pointerEvents = 'auto';
                });
            }, 1500);
        } else {
            // Lose
            elements.casinoMessage.textContent = `Wrong guess! The card was ${dealerCard}. You lost your bet!`;
            
            setTimeout(() => {
                alert(`You lost your bet of ${state.currentBet} OASIS currency. Press OK to continue.`);
                resetCasinoGame();
                
                // Re-enable card choices
                elements.cardChoice.forEach(el => {
                    el.style.pointerEvents = 'auto';
                });
            }, 1500);
        }
    }
    
    function collectCasinoWinnings() {
        // Disable buttons during processing
        elements.betAgain.disabled = true;
        elements.collectWinnings.disabled = true;
        
        state.wallet += state.casinoPoints;
        updateWallet();
        
        elements.casinoMessage.textContent = `${state.casinoPoints} OASIS currency added to your wallet!`;
        
        setTimeout(() => {
            alert(`${state.casinoPoints} OASIS currency has been added to your wallet. Press OK to continue.`);
            resetCasinoGame();
            
            // Re-enable buttons
            elements.betAgain.disabled = false;
            elements.collectWinnings.disabled = false;
        }, 1500);
    }
    
    // Find Number Game Logic
    function resetFindNumberGame() {
        state.secretNumber = Math.floor(Math.random() * 10) + 1;
        state.attemptsLeft = 3;
        
        elements.attemptsLeft.textContent = "3";
        elements.findMessage.textContent = "Guess the number between 1-10";
        elements.numberGuess.value = 5; // Reset to default value
        
        // Ensure inputs are enabled
        elements.submitGuess.disabled = false;
        elements.numberGuess.disabled = false;
    }
    
    function submitNumberGuess() {
        const userGuess = parseInt(elements.numberGuess.value);
        
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            alert("Please enter a valid number between 1 and 10");
            return;
        }
        
        // Disable guess input during result message
        elements.submitGuess.disabled = true;
        elements.numberGuess.disabled = true;
        
        state.attemptsLeft--;
        elements.attemptsLeft.textContent = state.attemptsLeft;
        
        if (userGuess === state.secretNumber) {
            // Win
            let reward = 0;
            
            if (state.attemptsLeft === 2) {
                reward = 1000;
                elements.findMessage.textContent = `Correct! The number was ${state.secretNumber}. You guessed it on the first try and won 1000 OASIS currency!`;
            } else if (state.attemptsLeft === 1) {
                reward = 500;
                elements.findMessage.textContent = `Correct! The number was ${state.secretNumber}. You guessed it on the second try and won 500 OASIS currency!`;
            } else {
                reward = 250;
                elements.findMessage.textContent = `Correct! The number was ${state.secretNumber}. You guessed it on the last try and won 250 OASIS currency!`;
            }
            
            state.wallet += reward;
            updateWallet();
            
            setTimeout(() => {
                if (state.currentScreen === 'find-number') { // Only if still on this screen
                    alert(`You won ${reward} OASIS currency! Press OK to continue.`);
                    resetFindNumberGame();
                }
            }, 2000);
            
        } else if (state.attemptsLeft === 0) {
            // Out of attempts
            elements.findMessage.textContent = `Sorry, you're out of attempts. The number was ${state.secretNumber}.`;
            
            setTimeout(() => {
                if (state.currentScreen === 'find-number') { // Only if still on this screen
                    alert(`Game over. The number was ${state.secretNumber}. Press OK to try again.`);
                    resetFindNumberGame();
                }
            }, 2000);
            
        } else {
            // Incorrect guess but still have attempts
            if (userGuess > state.secretNumber) {
                elements.findMessage.textContent = "Your guess is higher, try a lower number.";
            } else {
                elements.findMessage.textContent = "Your guess is lower, try a higher number.";
            }
            
            // Re-enable inputs after showing message
            setTimeout(() => {
                if (state.currentScreen === 'find-number') { // Only if still on this screen
                    elements.submitGuess.disabled = false;
                    elements.numberGuess.disabled = false;
                }
            }, 1000);
        }
    }
    
    // Initialize the game
    init();
}); 