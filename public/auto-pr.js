function autoAdvertising() {
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };

  log('AUTO-ADVERTISING ACTIVATED', 'safe');
  log('警告：自动公关 - アラート：自動PR', 'safe');
  log('X POST LIVE: HackerWatch crushes CCCP surveillance!', 'safe');
  log('LinkedIn: Professional cyber defense platform', 'safe');
  log('GitHub: Open source security for the Republic', 'safe');
  log('Auto-PR campaign: NO PAVEMENT POUNDING REQUIRED!', 'safe');
  log('Academy recruitment boosted across all channels', 'safe');
}
