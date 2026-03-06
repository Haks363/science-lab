// Fullscreen button logic
document.addEventListener('DOMContentLoaded', function() {
  const fsBtn = document.getElementById('fullscreen-btn');
  if (fsBtn) {
    fsBtn.onclick = function() {
      const frame = document.getElementById('game-frame');
      if (frame.requestFullscreen) {
        frame.requestFullscreen();
      } else if (frame.webkitRequestFullscreen) {
        frame.webkitRequestFullscreen();
      } else if (frame.mozRequestFullScreen) {
        frame.mozRequestFullScreen();
      } else if (frame.msRequestFullscreen) {
        frame.msRequestFullscreen();
      }
    };
  }
});
// Entry point for the app
function startApp() {
  // Render games
  function renderGames(games) {
    const container = document.getElementById('games-container');
    container.innerHTML = '';
    games.forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';
      let thumbHtml = '';
      if (typeof game.thumbnail === 'string' && game.thumbnail.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
        thumbHtml = `<img src="${game.thumbnail}" alt="${game.title}" style="width:90px;height:90px;display:block;margin:0 auto 0.5rem auto;border-radius:18px;background:#ffe;object-fit:cover;box-shadow:0 2px 8px #0001;" />`;
      } else {
        thumbHtml = `<span style="display:inline-block;width:90px;height:90px;line-height:90px;font-size:3.2rem;border-radius:18px;background:#ffe;box-shadow:0 2px 8px #0001;text-align:center;margin:0 auto 0.5rem auto;">${game.thumbnail}</span>`;
      }
      card.innerHTML = `
        <div class="game-emoji">${thumbHtml}</div>
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
    // Add or update game description below the iframe
    let desc = document.getElementById('game-description-modal');
    if (!desc) {
      desc = document.createElement('div');
      desc.id = 'game-description-modal';
      desc.style = 'margin-top:1.2rem;padding:1rem 0.5rem 0.5rem 0.5rem;color:#23234a;background:#f4f6fa;border-radius:10px;font-size:1.05rem;max-height:180px;overflow:auto;';
      frame.parentNode.appendChild(desc);
    }
    desc.innerHTML = game.description.replace(/\n/g, '<br>');
    modal.style.display = 'flex';
  }
  document.getElementById('close-modal').onclick = function() {
    document.getElementById('game-modal').style.display = 'none';
    document.getElementById('game-frame').src = '';
    let desc = document.getElementById('game-description-modal');
    if (desc) desc.remove();
  };
  window.onclick = function(event) {
    const modal = document.getElementById('game-modal');
    if (event.target === modal) {
      modal.style.display = 'none';
      document.getElementById('game-frame').src = '';
      let desc = document.getElementById('game-description-modal');
      if (desc) desc.remove();
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
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
