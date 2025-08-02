function fetchThreatIntel() {
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };

  log('THREAT INTEL FEED ACTIVE', 'safe');
  setTimeout(() => {
    log('ALERT: Chinese C2 server (203.0.113.10) on threat list', 'threat');
    log('Updating firewall rules...', 'safe');
    log('Threat intelligence synced', 'safe');
  }, 2000);
}
