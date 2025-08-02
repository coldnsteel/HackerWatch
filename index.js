window.spinCosmicSlots = () => {
  console.log('[Kozmic Kasino] Spinning cosmic slots... 1000 CTOK earned!');
  const canvas = document.createElement('canvas');
  canvas.width = 800; canvas.height = 600;
  document.body.appendChild(canvas);
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    console.error('WebGL not supported');
    alert('WebGL not supported. Please update your browser or device.');
    return;
  }
  gl.clearColor(0.2, 0.4, 0.6, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  console.log('WebGL initialized for cosmic slots');
};

window.ultimateCosmicJam = () => {
  console.log('[Kozmic Kasino] Starting ultimate cosmic jam...');
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 2000);
    console.log('Cosmic jam audio playing');
  } catch (e) {
    console.error('Audio error:', e);
    alert('Audio failed. Please ensure audio permissions are enabled.');
  }
};

window.generateRockRiff = () => {
  console.log('[MasterConsole] Generating rock riff...');
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 2000);
    console.log('Rock riff audio playing');
  } catch (e) {
    console.error('Audio error:', e);
    alert('Audio failed. Please ensure audio permissions are enabled.');
  }
};

window.runFullSystemTest = () => {
  console.log('[System] Running full system test...');
  fetch('https://coldnsteel.github.io/HackerWatch/public/status.json')
    .then(response => response.json())
    .then(data => console.log('[System] Status:', data.status))
    .catch(error => console.error('[System] Status error:', error));
  fetch('https://hacker-watch-academy-qs414y04r-karla-gottschalks-projects.vercel.app/api/threats')
    .then(response => response.json())
    .then(data => console.log('[System] Threats:', data.threats))
    .catch(error => console.error('[System] Threats error:', error));
};

window.detectIntrusion = () => {
  console.log('[System] Detecting intrusions...');
  fetch('https://hacker-watch-academy-qs414y04r-karla-gottschalks-projects.vercel.app/api/threats')
    .then(response => response.json())
    .then(data => console.log('[System] Threats:', data.threats))
    .catch(error => console.error('[System] Intrusion detection error:', error));
};
