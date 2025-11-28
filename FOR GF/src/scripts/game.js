const emojis = ['❤️', '💕', '😍', '💖', '😘', '💝', '🌹', '✨'];
let cards = [];
let flipped = [];
let matched = [];

function initGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('button');
        card.classList.add('card');
        card.textContent = '?';
        card.addEventListener('click', () => flipCard(card, index));
        gameBoard.appendChild(card);
    });
}

function flipCard(card, index) {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
        card.textContent = cards[index];
        card.classList.add('flipped');
        flipped.push(index);

        if (flipped.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [index1, index2] = flipped;
    const card1 = document.querySelectorAll('.card')[index1];
    const card2 = document.querySelectorAll('.card')[index2];

    if (cards[index1] === cards[index2]) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matched.push(index1, index2);
        updateScore();
        
        if (matched.length === cards.length) {
            setTimeout(() => showWinnerPage(), 500);
        }
    } else {
        setTimeout(() => {
            card1.textContent = '?';
            card2.textContent = '?';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 800);
    }
    
    flipped = [];
}

function updateScore() {
    const pairsMatched = matched.length / 2;
    document.getElementById('scoreCount').textContent = pairsMatched;
}

function showWinnerPage() {
    const playerName = localStorage.getItem('playerName') || 'Baby';
    const body = document.body;
    
    const winnerModal = document.createElement('div');
    winnerModal.classList.add('winner-modal');
    winnerModal.innerHTML = `
        <div class="images-column left-images">
            <img src="assets/image1.jpg" alt="Memory 1" class="side-img">
            <img src="assets/image2.jpg" alt="Memory 2" class="side-img">
        </div>

        <div class="winner-content">
            <div class="winner-form">
                <h1>🎉 Congratulations! 🎉</h1>
                <p class="winner-name">You Won, ${playerName}! 💕</p>
                <p class="winner-sub">You successfully found all the pairs!</p>
                <button class="choice-btn next-btn">Next</button>
            </div>
        </div>

        <div class="images-column right-images">
            <img src="assets/image3.jpg" alt="Memory 3" class="side-img">
            <img src="assets/image4.jpg" alt="Memory 4" class="side-img">
        </div>
    `;
    
    body.appendChild(winnerModal);
    
    // Next button handler
    document.querySelector('.next-btn').addEventListener('click', () => {
        winnerModal.remove();
        showLetterPage();
    });
}

function showLetterPage() {
    const body = document.body;
    const playerName = localStorage.getItem('playerName') || 'Baby';
    
    const letterText = `Dear ${playerName},

I wanted to take a moment to tell you how much you mean to me. Every day with you is a blessing, and I'm grateful for every smile, every laugh, and every moment we share together.

You make my world brighter, and I love you more than words could ever express. Thank you for being my favorite person and for making life so much better just by being in it.

Forever yours,
Your Love 💕`;
    
    const letterModal = document.createElement('div');
    letterModal.classList.add('letter-modal');
    letterModal.innerHTML = `
        <div class="letter-container">
            <h2>A Letter For You 💌</h2>
            <div class="letter-text" id="letterText"></div>
            <button class="choice-btn" onclick="location.href='index.html'">Back Home</button>
        </div>
    `;
    
    body.appendChild(letterModal);
    
    // Create flowing hearts
    createFlowingHearts(letterModal);
    
    typeLetterEffect(letterText, 'letterText');
}

function createFlowingHearts(container) {
    const hearts = ['💕', '❤️', '💖', '😍', '💝'];
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('flowing-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
        container.appendChild(heart);
    }
}

function typeLetterEffect(text, elementId) {
    const element = document.getElementById(elementId);
    let index = 0;
    
    function type() {
        if (index < text.length) {
            const char = text[index];
            if (char === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += char;
            }
            index++;
            setTimeout(type, 30);
        }
    }
    
    type();
}

initGame();

if (localStorage.getItem('forceWin') === '1') {
    localStorage.removeItem('forceWin');
    matched = cards.map((_, i) => i);
    updateScore();
    setTimeout(() => showWinnerPage(), 300);
}