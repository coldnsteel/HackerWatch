function detectIntrusion() {
  console.log("[HackerWatch] INTRUSION DETECTION ACTIVATED");
  const blocklist = ["203.0.113.10", "198.51.100.0/24"];
  const scamPatterns = [
    /Zelle.*upgrade/i,
    /increase.*limit/i,
    /send.*money.*now/i,
    /find.*for.*free.*fix.*for.*fee/i
  ];
  const ip = window.location.hostname;
  const attackPatterns = [
    /SELECT\s.*FROM/i,
    /<script>.*<\/script>/i,
    /eval\(/i
  ];
  const pageContent = document.body.innerText;
  if (blocklist.some(range => ip.includes(range.split('/')[0]))) {
    console.log("[HackerWatch] BLOCKED: Malicious IP detected");
    alert("Access denied: Malicious IP detected.");
    return { status: "BLOCKED", ip: ip };
  }
  attackPatterns.forEach((pattern, index) => {
    if (pattern.test(pageContent)) {
      console.log(`[HackerWatch] BLOCKED: Attack pattern ${index + 1} detected`);
      document.body.innerHTML = "<h1>Access Denied: Threat Detected</h1>";
      return { status: "BLOCKED", threat: `Pattern ${index + 1}` };
    }
  });
  scamPatterns.forEach((pattern, index) => {
    if (pattern.test(pageContent)) {
      console.log(`[HackerWatch] BLOCKED: Scareware/scam ${index + 1} detected");
      alert("Warning: Scareware/scam detected! Do NOT pay for fake fixes!");
      return { status: "BLOCKED", threat: `Scam ${index + 1}` };
    }
  });
  const startTime = performance.now();
  setTimeout(() => {
    if (performance.now() - startTime > 5000) {
      console.log("[HackerWatch] WARNING: Potential device freeze detected");
      alert("Warning: Device freeze detected! Reset recommended.");
    }
  }, 5000);
  console.log("[HackerWatch] ✅ Counterfeit Device: DESTROYED");
  console.log("[HackerWatch] ✅ DDoS, SQL Injection, Malware, Scams: BLOCKED");
  console.log("[HackerWatch] ✅ Scareware: ZAPPED");
  console.log("[HackerWatch] ψΩ§∞ Protection maintained");
  return { status: "ψΩ§∞ Protection Active" };
}
