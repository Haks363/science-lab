// Fullscreen button logic and settings modal logic
document.addEventListener('DOMContentLoaded', function() {
  // Fullscreen
  const fsBtn = document.getElementById('fullscreen-btn');
  if (fsBtn) {
    fsBtn.onclick = function() {
      const frame = document.getElementById('activity-frame');
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

  // Settings modal logic
  const settingsBtn = document.getElementById('settings-btn');
  const settingsModal = document.getElementById('settings-modal');
  const closeSettingsModal = document.getElementById('close-settings-modal');
  const saveSettingsBtn = document.getElementById('save-settings-btn');
  const disableSoundCheckbox = document.getElementById('disable-sound-checkbox');
  const themeSelect = document.getElementById('theme-select');

  // Load settings from localStorage
  function loadSettings() {
    const soundDisabled = localStorage.getItem('disableSound') === 'true';
    const theme = localStorage.getItem('theme') || 'default';
    disableSoundCheckbox.checked = soundDisabled;
    themeSelect.value = theme;
    applyTheme(theme);
  }

  // Save settings to localStorage
  function saveSettings() {
    localStorage.setItem('disableSound', disableSoundCheckbox.checked);
    localStorage.setItem('theme', themeSelect.value);
    applyTheme(themeSelect.value);
    settingsModal.style.display = 'none';
  }

  // Theme switching
  function applyTheme(theme) {
    document.body.classList.remove('theme-dark', 'theme-light');
    if (theme === 'dark') {
      document.body.classList.add('theme-dark');
    } else if (theme === 'light') {
      document.body.classList.add('theme-light');
    }
  }

  if (settingsBtn && settingsModal && closeSettingsModal && saveSettingsBtn && disableSoundCheckbox && themeSelect) {
    settingsBtn.onclick = () => {
      settingsModal.style.display = 'block';
      loadSettings();
    };
    closeSettingsModal.onclick = () => {
      settingsModal.style.display = 'none';
    };
    saveSettingsBtn.onclick = saveSettings;
    window.onclick = function(event) {
      if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
      }
    };
    loadSettings();
  }

  // Optionally, you can mute/unmute all audio elements if needed
  if (disableSoundCheckbox) {
    disableSoundCheckbox.addEventListener('change', function() {
      const allAudio = document.querySelectorAll('audio, video');
      allAudio.forEach(el => { el.muted = disableSoundCheckbox.checked; });
    });
  }
});
// Entry point for the app
function startApp() {
  // Render activities
  function renderActivities(activities) {
    const container = document.getElementById('activities-container');
    container.innerHTML = '';
    activities.forEach(activity => {
      const card = document.createElement('div');
      card.className = 'activity-card';
      let thumbHtml = '';
      if (typeof activity.thumbnail === 'string' && activity.thumbnail.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
        thumbHtml = `<img src="${activity.thumbnail}" alt="${activity.title}" style="width:90px;height:90px;display:block;margin:0 auto 0.5rem auto;border-radius:18px;background:#ffe;object-fit:cover;box-shadow:0 2px 8px #0001;" />`;
      } else {
        thumbHtml = `<span style="display:inline-block;width:90px;height:90px;line-height:90px;font-size:3.2rem;border-radius:18px;background:#ffe;box-shadow:0 2px 8px #0001;text-align:center;margin:0 auto 0.5rem auto;">${activity.thumbnail}</span>`;
      }
      card.innerHTML = `
        <div class="activity-emoji">${thumbHtml}</div>
        <div class="activity-title">${activity.title}</div>
        <div class="activity-category">${activity.category}</div>
        <div class="activity-description">${activity.description}</div>
        <button class="activity-play-btn">Open</button>
      `;
      card.querySelector('.activity-play-btn').onclick = (e) => {
        e.stopPropagation();
        openActivityModal(activity);
      };
      card.onmouseenter = () => card.classList.add('hovered');
      card.onmouseleave = () => card.classList.remove('hovered');
      card.onclick = () => openActivityModal(activity);
      container.appendChild(card);
    });
  }

  // Modal logic
  function openActivityModal(activity) {
    const modal = document.getElementById('activity-modal');
    const frame = document.getElementById('activity-frame');
    frame.src = activity.url;
    // Add or update activity description below the iframe
    let desc = document.getElementById('activity-description-modal');
    if (!desc) {
      desc = document.createElement('div');
      desc.id = 'activity-description-modal';
      desc.style = 'margin-top:1.2rem;padding:1rem 0.5rem 0.5rem 0.5rem;color:#23234a;background:#f4f6fa;border-radius:10px;font-size:1.05rem;max-height:180px;overflow:auto;';
      frame.parentNode.appendChild(desc);
    }
    desc.innerHTML = activity.description.replace(/\n/g, '<br>');
    modal.style.display = 'flex';
  }
  document.getElementById('close-modal').onclick = function() {
    document.getElementById('activity-modal').style.display = 'none';
    document.getElementById('activity-frame').src = '';
    let desc = document.getElementById('activity-description-modal');
    if (desc) desc.remove();
  };
  window.onclick = function(event) {
    const modal = document.getElementById('activity-modal');
    if (event.target === modal) {
      modal.style.display = 'none';
      document.getElementById('activity-frame').src = '';
      let desc = document.getElementById('activity-description-modal');
      if (desc) desc.remove();
    }
  };

  // Search logic
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filtered = window.ACTIVITIES.filter(activity =>
      activity.title.toLowerCase().includes(query) ||
      activity.category.toLowerCase().includes(query) ||
      activity.description.toLowerCase().includes(query)
    );
    renderActivities(filtered);
  });

  // Initial render
  renderActivities(window.ACTIVITIES);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
