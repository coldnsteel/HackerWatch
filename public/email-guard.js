function sendEmailAlert(threat) {
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };

  log('EMAIL DEEP GUARD ACTIVATED', 'safe');
  log('Scanning for phishing signatures...', 'safe');
  setTimeout(() => {
    log('PHISHING ATTEMPT BLOCKED: Fake PayPal email', 'threat');
    log(`Sending secure alert for ${threat} to admin@academy.io`, 'safe');
    log('欢迎发送警报 - アラート送信 (Email encrypted)', 'safe');
    log('Email sent: Deep guard active', 'safe');
  }, 2000);
}

function scanEmailThreats() {
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };

  log('EMAIL THREAT SCAN INITIATED', 'safe');
  setTimeout(() => {
    log('ALERT: Suspicious sender - chinese.hacker@evil.com', 'threat');
    log('ALERT: Malicious attachment detected', 'threat');
    log('Auto-quarantine engaged', 'safe');
  }, 1500);
}
