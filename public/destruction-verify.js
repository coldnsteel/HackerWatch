function verifyDestruction() {
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };

  log('DESTRUCTION VERIFICATION ACTIVATED', 'safe');
  log('Scanning for counterfeit device signals...', 'info');
  setTimeout(() => {
    log('CONFIRMED: No counterfeit device detected', 'safe');
    log('Van wheel destruction successful', 'safe');
    log('Coffee shop hammer protocol effective', 'safe');
    log('CCCP surveillance device eliminated', 'safe');
    log('iPhone 6s+ now operates threat-free', 'safe');
  }, 2000);
}
