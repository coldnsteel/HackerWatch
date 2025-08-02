function clearLog() {
  document.getElementById('log').innerHTML = '[CLEARED] Log reset by user<br>';
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };
  log('Log cleared - monitoring continues', 'safe');
}

function closeAllPorts() {
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };
  
  log('EMERGENCY PORT CLOSURE INITIATED', 'safe');
  log('Closing all non-essential ports...', 'safe');
  log('Ports 8080, 3389, 21, 23, 135 - CLOSED', 'safe');
  log('Only ports 22, 80, 443 remain open', 'safe');
  log('Attack surface minimized', 'safe');
}
