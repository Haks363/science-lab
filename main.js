// Render games
function renderGames(games) {
  const container = document.getElementById('games-container');
  container.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <div class="game-emoji">${game.thumbnail}</div>
      <div class="game-title">${game.title}</div>
      <div class="game-category">${game.category}</div>
      <div class="game-description">${game.description}</div>
    `;
    card.onclick = () => openGameModal(game);
    container.appendChild(card);
  });
}

// Modal logic
function openGameModal(game) {
  const modal = document.getElementById('game-modal');
  const frame = document.getElementById('game-frame');
  frame.src = game.url;
  modal.style.display = 'flex';
}
document.getElementById('close-modal').onclick = function() {
  document.getElementById('game-modal').style.display = 'none';
  document.getElementById('game-frame').src = '';
};
window.onclick = function(event) {
  const modal = document.getElementById('game-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
    document.getElementById('game-frame').src = '';
  }
};

// Search logic
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const filtered = window.GAMES.filter(game =>
    game.title.toLowerCase().includes(query) ||
    game.category.toLowerCase().includes(query) ||
    game.description.toLowerCase().includes(query)
  );
  renderGames(filtered);
});

// Initial render
renderGames(window.GAMES);
