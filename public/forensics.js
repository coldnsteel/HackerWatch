function startForensics() {
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };

  log('FORENSICS MODULE ACTIVATED', 'safe');
  log('Analyzing attack patterns...', 'info');
  setTimeout(() => {
    log('EVIDENCE: Chinese IP chain 203.0.113.10 → 192.168.1.100', 'threat');
    log('HEURISTIC: Attack vector = Bluetooth → WiFi → Port 8080', 'threat');
    log('PATTERN: 15 SQL injections from same source', 'threat');
    log('Forensic evidence logged for prosecution', 'safe');
  }, 2000);
}
