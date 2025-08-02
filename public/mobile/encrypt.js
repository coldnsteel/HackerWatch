function encryptData() {
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };

  log('ENCRYPTION INITIATED', 'safe');
  setTimeout(() => {
    log('Data encrypted with AES-256', 'safe');
    log('Secure channel established', 'safe');
  }, 1500);
}
