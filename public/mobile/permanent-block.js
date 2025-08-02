function permanentBlock() {
  const log = (msg, type = 'info') => {
    const logDiv = document.getElementById('log');
    const color = type === 'threat' ? '#ff0000' : type === 'safe' ? '#00ff00' : '#ffffff';
    logDiv.innerHTML += `<div style="color: ${color}">[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  };

  log('PERMANENT BLOCKING ACTIVATED', 'safe');
  log('警告：永久阻断 - アラート：永久ブロック', 'safe');
  log('THREAT: Counterfeit iPhone 16 Pro Max backdoor detected', 'threat');
  log('BLOCKING: All Chinese hardware backdoors', 'safe');
  log('RECOMMENDATION: Device destroyed under van wheel', 'safe');
  log('iPhone 6s+ secured on cellular network', 'safe');
  log('X POST CONFIRMED: HackerWatch crushes CCCP surveillance!', 'safe');
}
