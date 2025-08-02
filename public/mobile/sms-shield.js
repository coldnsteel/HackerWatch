function sendSMSAlert(threat) {
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };

  log('SMS SHIELD ACTIVATED', 'safe');
  log('Filtering spam numbers...', 'safe');
  setTimeout(() => {
    log('SPAM BLOCKED: +86-xxx-xxx-xxxx (China)', 'threat');
    log(`Sending secure SMS for ${threat} to +1-555-SECURE`, 'safe');
    log('欢迎发送短信 - SMS送信 (Number protected)', 'safe');
    log('SMS sent: Shield active', 'safe');
  }, 2000);
}

function guardPhoneNumber() {
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };

  log('PHONE NUMBER GUARD ACTIVE', 'safe');
  setTimeout(() => {
    log('Blocking robocalls and scam numbers', 'safe');
    log('Number privacy protected', 'safe');
  }, 1000);
}
