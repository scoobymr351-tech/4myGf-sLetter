document.getElementById('detailsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const playerName = document.getElementById('playerName').value;
    const difficulty = document.getElementById('difficulty').value;
    const message = document.getElementById('message').value;
    
    // Store the data in localStorage
    localStorage.setItem('playerName', playerName);
    localStorage.setItem('difficulty', difficulty);
    localStorage.setItem('message', message);
    
    // Redirect to the actual game
    window.location.href = 'game.html';
});