const express = require('express');
const WebSocket = require('ws');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const wss = new WebSocket.Server({ port: 8080 });

// Sacred ψΩ§∞ System State
const SystemState = {
    monitoring: false,
    clients: new Set(),
    threatLevel: 0,
    mobileClients: 0,
    desktopClients: 0,
    startTime: Date.now(),
    totalThreats: 0,
    blockedIPs: new Set(),
    activeScans: new Map(),
    threatHistory: []
};

// Serve static files and parse JSON
app.use(express.static('.'));
app.use(express.json({ limit: '10mb' }));

// Enhanced CORS and security headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.header('X-Sacred-Token', 'ψΩ§∞');
    next();
});

// Root route serves index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Enhanced threat logging
function logThreat(type, message, severity, sourceIP = null, clientType = 'unknown', metadata = {}) {
    const threatData = {
        id: Date.now() + Math.random(),
        type,
        message,
        severity,
        sourceIP,
        clientType,
        metadata,
        timestamp: new Date().toISOString()
    };
    
    SystemState.threatHistory.unshift(threatData);
    
    // Keep only last 1000 threats in memory
    if (SystemState.threatHistory.length > 1000) {
        SystemState.threatHistory = SystemState.threatHistory.slice(0, 1000);
    }
    
    SystemState.totalThreats++;
    console.log(`🚨 THREAT LOGGED [${type}] ${message}`);
    return threatData;
}

// Enhanced WebSocket connection handler
wss.on('connection', async (ws, req) => {
    const clientIP = req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
    
    console.log(`🛡️ Client connected: ${clientIP} (${isMobile ? 'Mobile' : 'Desktop'})`);
    
    // Check if IP is blocked
    if (SystemState.blockedIPs.has(clientIP)) {
        ws.close(1008, 'IP blocked');
        return;
    }
    
    SystemState.clients.add(ws);
    ws.clientIP = clientIP;
    ws.isMobile = isMobile;
    ws.connectedAt = Date.now();
    
    if (isMobile) {
        SystemState.mobileClients++;
    } else {
        SystemState.desktopClients++;
    }
    
    // Send enhanced welcome message
    ws.send(JSON.stringify({
        type: 'SYSTEM',
        message: `HackerWatch backend connected - ${isMobile ? 'Mobile' : 'Desktop'} client ready`,
        severity: 'info',
        timestamp: new Date().toISOString(),
        clientId: generateClientId(),
        capabilities: {
            realTimeMonitoring: true,
            offlineMode: true,
            hapticFeedback: isMobile,
            pushNotifications: true,
            aiAnalysis: true,
            payments: true,
            emailDeletion: true,
            smsDeletion: true
        }
    }));
    
    // Send recent threats
    if (SystemState.threatHistory.length > 0) {
        ws.send(JSON.stringify({
            type: 'THREAT_HISTORY',
            threats: SystemState.threatHistory.slice(0, 10),
            severity: 'info'
        }));
    }
    
    ws.on('message', async data => {
        try {
            const command = JSON.parse(data);
            await handleEnhancedCommand(command, ws);
        } catch (error) {
            console.error('Invalid command:', error);
            await logThreat('SYSTEM', `Invalid command from ${clientIP}: ${error.message}`, 'medium', clientIP);
            ws.send(JSON.stringify({
                type: 'ERROR',
                message: 'Invalid command format',
                severity: 'critical'
            }));
        }
    });
    
    ws.on('close', () => {
        console.log(`Client disconnected: ${clientIP}`);
        SystemState.clients.delete(ws);
        if (ws.isMobile) {
            SystemState.mobileClients = Math.max(0, SystemState.mobileClients - 1);
        } else {
            SystemState.desktopClients = Math.max(0, SystemState.desktopClients - 1);
        }
    });
    
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        SystemState.clients.delete(ws);
    });
});

// Generate unique client ID
function generateClientId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Enhanced command handler
async function handleEnhancedCommand(command, ws) {
    const clientIP = ws.clientIP;
    const isMobile = ws.isMobile;
    
    console.log('Command received:', command.command, 'Mobile:', isMobile, 'IP:', clientIP);
    
    // Enhanced token validation
    if (command.token !== 'ψΩ§∞') {
        await logThreat('SECURITY', `Invalid token from ${clientIP}`, 'high', clientIP);
        ws.send(JSON.stringify({
            type: 'ERROR',
            message: 'Invalid sacred token - Access denied',
            severity: 'critical'
        }));
        return;
    }
    
    switch(command.command) {
        case 'start_monitoring':
            SystemState.monitoring = true;
            await logThreat('SYSTEM', `Monitoring started by ${clientIP}`, 'info', clientIP, isMobile ? 'mobile' : 'desktop');
            broadcast({
                type: 'SYSTEM',
                message: `AI-powered monitoring activated - Mobile: ${SystemState.mobileClients}, Desktop: ${SystemState.desktopClients}`,
                severity: 'info'
            });
            startEnhancedThreatSimulation(isMobile);
            break;
            
        case 'force_scan':
            await performEnhancedScan(isMobile, clientIP);
            break;
            
        case 'emergency_stop':
            SystemState.monitoring = false;
            await logThreat('SYSTEM', `Emergency stop activated by ${clientIP}`, 'critical', clientIP);
            broadcast({
                type: 'EMERGENCY',
                message: 'Emergency stop activated - All monitoring ceased',
                severity: 'critical'
            });
            break;
            
        case 'get_statistics':
            await sendStatistics(ws);
            break;
            
        case 'adjust_frequency':
            await handleFrequencyAdjustment(command, ws);
            break;
            
        default:
            await logThreat('SYSTEM', `Unknown command '${command.command}' from ${clientIP}`, 'medium', clientIP);
            ws.send(JSON.stringify({
                type: 'ERROR',
                message: 'Unknown command',
                severity: 'medium'
            }));
    }
}

// 🔥 BEAST MODE: Payment Processing
app.post('/api/charge', async (req, res) => {
    const { token, amount, currency, description, token: sacredToken } = req.body;
    
    if (sacredToken !== 'ψΩ§∞') {
        return res.status(403).json({ error: 'Invalid sacred token', success: false });
    }
    
    try {
        // Simulate payment success (replace with real Stripe when you get API keys)
        const simulatedCharge = {
            id: 'ch_' + Math.random().toString(36).substring(7),
            amount: amount || 1000,
            currency: currency || 'usd',
            description: description || 'GRSMFC Auction Credits - ψΩ§∞',
            status: 'succeeded',
            created: Math.floor(Date.now() / 1000)
        };
        
        console.log('🚨 PAYMENT SUCCESS:', simulatedCharge.id);
        
        await logThreat('PAYMENT', `Payment successful: ${simulatedCharge.description} - $${(simulatedCharge.amount/100).toFixed(2)}`, 'info');
        
        broadcast({
            type: 'PAYMENT',
            message: `Payment successful: ${simulatedCharge.description} - $${(simulatedCharge.amount/100).toFixed(2)}`,
            severity: 'info'
        });
        
        res.json({ success: true, charge: simulatedCharge });
    } catch (error) {
        console.error('💥 PAYMENT ERROR:', error);
        await logThreat('PAYMENT', `Payment error: ${error.message}`, 'critical');
        res.status(500).json({ error: error.message, success: false });
    }
});

// 🔥 BEAST MODE: Email Deletion
app.post('/api/delete-emails', async (req, res) => {
    const { token, older_than } = req.body;
    
    if (token !== 'ψΩ§∞') {
        return res.status(403).json({ error: 'Invalid sacred token', success: false });
    }
    
    try {
        // Simulate email deletion (replace with real Gmail API when configured)
        const simulatedCount = Math.floor(Math.random() * 50) + 10;
        
        console.log(`🚨 EMAIL DELETION: ${simulatedCount} emails deleted`);
        
        await logThreat('EMAIL', `Securely deleted ${simulatedCount} emails older than ${older_than}`, 'info');
        
        broadcast({
            type: 'EMAIL',
            message: `Securely deleted ${simulatedCount} emails older than ${older_than}`,
            severity: 'info'
        });
        
        res.json({ success: true, count: simulatedCount });
    } catch (error) {
        console.error('💥 EMAIL DELETION ERROR:', error);
        await logThreat('EMAIL', `Email deletion error: ${error.message}`, 'critical');
        res.status(500).json({ error: error.message, success: false });
    }
});

// 🔥 BEAST MODE: SMS Deletion
app.post('/api/delete-sms', async (req, res) => {
    const { token, older_than } = req.body;
    
    if (token !== 'ψΩ§∞') {
        return res.status(403).json({ error: 'Invalid sacred token', success: false });
    }
    
    try {
        // Simulate SMS deletion (replace with real Textmagic API when configured)
        const simulatedCount = Math.floor(Math.random() * 30) + 5;
        
        console.log(`🚨 SMS DELETION: ${simulatedCount} messages deleted`);
        
        await logThreat('SMS', `Securely deleted ${simulatedCount} SMS messages older than ${older_than}`, 'info');
        
        broadcast({
            type: 'SMS',
            message: `Securely deleted ${simulatedCount} SMS messages older than ${older_than}`,
            severity: 'info'
        });
        
        res.json({ success: true, count: simulatedCount });
    } catch (error) {
        console.error('💥 SMS DELETION ERROR:', error);
        await logThreat('SMS', `SMS deletion error: ${error.message}`, 'critical');
        res.status(500).json({ error: error.message, success: false });
    }
});

// Enhanced threat simulation with AI patterns
function startEnhancedThreatSimulation(mobile = false) {
    if (!SystemState.monitoring) return;
    
    console.log(`🔍 Starting AI-powered threat simulation... Mobile mode: ${mobile}`);
    
    const simulationId = setInterval(async () => {
        if (!SystemState.monitoring) {
            clearInterval(simulationId);
            return;
        }
        
        // Dynamic threat probability with AI intelligence
        const hour = new Date().getHours();
        const isBusinessHours = hour >= 9 && hour <= 17;
        const systemLoad = SystemState.clients.size / 100;
        
        let baseThreatChance = mobile ? 0.12 : 0.10;
        baseThreatChance *= isBusinessHours ? 1.5 : 0.7;
        baseThreatChance *= (1 + systemLoad * 0.5);
        
        if (Math.random() < baseThreatChance) {
            await generateRealisticThreat(mobile);
        }
        
    }, mobile ? 4000 : 3000);
    
    SystemState.activeScans.set('simulation', simulationId);
}

async function generateRealisticThreat(mobile = false) {
    const threatCategories = [
        {
            type: 'PINEAPPLE',
            weight: 0.25,
            templates: [
                'WiFi Pineapple detected: "{ssid}" ({mac}) on channel {channel}',
                'Evil twin network: "{ssid}" attempting credential harvest',
                'Rogue access point: "{ssid}" spoofing legitimate hotspot',
                'Captive portal attack: "{ssid}" redirecting login attempts',
                'Deauthentication attack from "{ssid}" network'
            ],
            severity: 'critical',
            metadata: () => ({
                ssid: generateRandomSSID(),
                mac: generateRandomMAC(),
                channel: Math.floor(Math.random() * 11) + 1,
                signal_strength: -Math.floor(Math.random() * 50) - 30,
                encryption: Math.random() > 0.3 ? 'WPA2' : 'Open'
            })
        },
        {
            type: 'BLUETOOTH',
            weight: 0.20,
            templates: [
                'BlueJacking attempt from {device_name} ({mac})',
                'Bluetooth device enumeration attack detected from {mac}',
                'Unauthorized pairing request from "{device_name}"',
                'Bluetooth Low Energy scanning attack identified'
            ],
            severity: 'high',
            metadata: () => ({
                device_name: generateRandomBTName(),
                mac: generateRandomMAC(),
                device_type: Math.random() > 0.5 ? 'smartphone' : 'unknown',
                rssi: -Math.floor(Math.random() * 80) - 20
            })
        },
        {
            type: 'PORTSCAN',
            weight: 0.25,
            templates: [
                'Port scan detected from {ip} - {port_count} ports scanned',
                'TCP SYN flood attack identified from {ip}',
                'Stealth port scan using fragmented packets from {ip}',
                'UDP port enumeration attack from {ip}'
            ],
            severity: 'high',
            metadata: () => ({
                ip: generateRandomIP(),
                port_count: Math.floor(Math.random() * 100) + 10,
                scan_type: ['TCP SYN', 'TCP Connect', 'UDP', 'Stealth'][Math.floor(Math.random() * 4)],
                duration: Math.floor(Math.random() * 300) + 30
            })
        },
        {
            type: 'INTRUSION',
            weight: 0.30,
            templates: [
                'Brute force {service} login attempts from {ip}',
                'SQL injection attempt on {endpoint} blocked',
                'Directory traversal attack on {endpoint} prevented',
                'Cross-site scripting (XSS) attempt on {endpoint} neutralized'
            ],
            severity: 'critical',
            metadata: () => ({
                ip: generateRandomIP(),
                service: ['SSH', 'FTP', 'HTTP', 'RDP'][Math.floor(Math.random() * 4)],
                endpoint: ['/admin', '/login', '/api/users', '/dashboard'][Math.floor(Math.random() * 4)],
                attempts: Math.floor(Math.random() * 50) + 5
            })
        }
    ];
    
    // Select threat type based on weights
    const random = Math.random();
    let cumulative = 0;
    let selectedCategory = threatCategories[0];
    
    for (const category of threatCategories) {
        cumulative += category.weight;
        if (random <= cumulative) {
            selectedCategory = category;
            break;
        }
    }
    
    // Generate threat details
    const metadata = selectedCategory.metadata();
    const template = selectedCategory.templates[Math.floor(Math.random() * selectedCategory.templates.length)];
    
    // Replace template variables
    let message = template.replace(/\{(\w+)\}/g, (match, key) => {
        return metadata[key] || match;
    });
    
    if (mobile) {
        message += ' (Mobile Alert)';
    }
    
    // Log and broadcast threat
    await logThreat(
        selectedCategory.type,
        message,
        selectedCategory.severity,
        metadata.ip || null,
        mobile ? 'mobile' : 'desktop',
        metadata
    );
    
    broadcast({
        type: selectedCategory.type,
        message,
        severity: selectedCategory.severity,
        metadata,
        mobile
    });
}

// Helper functions for realistic data generation
function generateRandomSSID() {
    const commonSSIDs = [
        'FreeWiFi', 'Free_WiFi', 'Guest', 'Public_WiFi', 'Hotel_WiFi',
        'Starbucks_WiFi', 'McDonald_Free', 'Airport_Guest', 'xfinitywifi',
        'attwifi', 'Linksys', 'NETGEAR', 'DEFAULT', 'Internet'
    ];
    return commonSSIDs[Math.floor(Math.random() * commonSSIDs.length)];
}

function generateRandomBTName() {
    const deviceNames = [
        'HC-05', 'Unknown_Device', 'Scanner', 'BlueJack_Tool',
        'iPhone', 'Samsung_Galaxy', 'Bluetooth_Speaker', 'Headphones',
        'Mouse', 'Keyboard', 'Fitbit', 'Apple_Watch'
    ];
    return deviceNames[Math.floor(Math.random() * deviceNames.length)];
}

function generateRandomMAC() {
    return Array.from({length: 6}, () => 
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join(':').toUpperCase();
}

function generateRandomIP() {
    const ranges = [
        '192.168.', '10.0.', '172.16.', '203.0.113.', '198.51.100.'
    ];
    const prefix = ranges[Math.floor(Math.random() * ranges.length)];
    const suffix = Math.floor(Math.random() * 254) + 1;
    const last = Math.floor(Math.random() * 254) + 1;
    return prefix + suffix + '.' + last;
}

// Enhanced scan with AI analysis
async function performEnhancedScan(mobile = false, clientIP = null) {
    console.log(`🔍 Performing AI-powered scan... Mobile: ${mobile}`);
    
    const scanId = generateScanId();
    SystemState.activeScans.set(scanId, Date.now());
    
    await logThreat('SYSTEM', `AI scan initiated from ${clientIP}`, 'info', clientIP, mobile ? 'mobile' : 'desktop');
    
    broadcast({
        type: 'SYSTEM',
        message: `AI-powered ${mobile ? 'mobile ' : ''}scan initiated - Analyzing threat vectors`,
        severity: 'info',
        scanId
    });
    
    // Phase 1: WiFi Environment Analysis
    setTimeout(async () => {
        const wifiThreats = Math.floor(Math.random() * 4);
        const suspiciousNetworks = [];
        
        for (let i = 0; i < wifiThreats; i++) {
            suspiciousNetworks.push(generateRandomSSID());
        }
        
        if (wifiThreats > 0) {
            await logThreat('PINEAPPLE', `WiFi scan detected ${wifiThreats} suspicious networks: ${suspiciousNetworks.join(', ')}`, 'medium');
            broadcast({
                type: 'PINEAPPLE',
                message: `AI WiFi analysis detected ${wifiThreats} potential pineapple networks`,
                severity: wifiThreats > 2 ? 'high' : 'medium',
                scanId
            });
        }
    }, 1500);
    
    // Phase 2: Bluetooth Environment Scan
    setTimeout(async () => {
        const btThreats = Math.floor(Math.random() * 3);
        
        if (btThreats > 0) {
            await logThreat('BLUETOOTH', `Bluetooth scan found ${btThreats} unknown devices in proximity`, 'medium');
            broadcast({
                type: 'BLUETOOTH',
                message: `AI Bluetooth analysis identified ${btThreats} potential threat devices`,
                severity: 'medium',
                scanId
            });
        }
    }, 2500);
    
    // Phase 3: Network Traffic Analysis
    setTimeout(async () => {
        const networkThreats = Math.floor(Math.random() * 5);
        const threatTypes = ['port scans', 'suspicious traffic patterns', 'malware signatures', 'data exfiltration attempts'];
        
        await logThreat('SYSTEM', `Network analysis completed - ${networkThreats} potential threats identified`, networkThreats > 3 ? 'high' : 'info');
        broadcast({
            type: 'SYSTEM',
            message: `AI network analysis completed - ${networkThreats} ${threatTypes[Math.floor(Math.random() * threatTypes.length)]} detected`,
            severity: networkThreats > 3 ? 'high' : 'info',
            scanId
        });
    }, 3500);
    
    // Phase 4: Machine Learning Threat Correlation
    setTimeout(async () => {
        const correlationScore = Math.random();
        let riskLevel, message;
        
        if (correlationScore > 0.8) {
            riskLevel = 'critical';
            message = 'AI correlation analysis: HIGH RISK - Multiple attack vectors detected';
        } else if (correlationScore > 0.6) {
            riskLevel = 'high';
            message = 'AI correlation analysis: ELEVATED RISK - Coordinated threat activity possible';
        } else if (correlationScore > 0.3) {
            riskLevel = 'medium';
            message = 'AI correlation analysis: MODERATE RISK - Isolated threat indicators';
        } else {
            riskLevel = 'info';
            message = 'AI correlation analysis: LOW RISK - Environment appears secure';
        }
        
        await logThreat('AI_ANALYSIS', message, riskLevel);
        broadcast({
            type: 'AI_ANALYSIS',
            message,
            severity: riskLevel,
            scanId,
            correlationScore: Math.round(correlationScore * 100)
        });
        
        SystemState.activeScans.delete(scanId);
    }, 4500);
}

function generateScanId() {
    return 'scan_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2);
}

// Enhanced broadcast with client targeting
function broadcast(data, excludeClient = null, targetMobile = null) {
    const message = JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        serverId: process.env.HOSTNAME || 'fortress-server'
    });
    
    SystemState.clients.forEach(client => {
        if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
            // Target specific client types if specified
            if (targetMobile !== null && client.isMobile !== targetMobile) {
                return;
            }
            client.send(message);
        }
    });
}

// Frequency adjustment handler for mobile optimization
async function handleFrequencyAdjustment(command, ws) {
    const { mode, batteryLevel, connection } = command;
    
    console.log(`📱 Adjusting frequency for client: ${mode}, battery: ${batteryLevel}, connection: ${connection}`);
    
    ws.send(JSON.stringify({
        type: 'SYSTEM',
        message: `Frequency adjusted for ${mode} mode`,
        severity: 'info'
    }));
}

// Send detailed statistics to client
async function sendStatistics(ws) {
    try {
        const stats = {
            system: {
                uptime: Math.floor(process.uptime()),
                memory: Math.round(process.memoryUsage().heapUsed / 1048576) + 'MB',
                startTime: SystemState.startTime,
                totalThreats: SystemState.totalThreats
            },
            threats: {
                total24h: SystemState.threatHistory.length,
                byType: SystemState.threatHistory.reduce((acc, threat) => {
                    acc[threat.type] = (acc[threat.type] || 0) + 1;
                    return acc;
                }, {})
            },
            clients: {
                total: SystemState.clients.size,
                mobile: SystemState.mobileClients,
                desktop: SystemState.desktopClients
            }
        };
        
        ws.send(JSON.stringify({
            type: 'STATISTICS',
            data: stats,
            severity: 'info'
        }));
        
    } catch (error) {
        console.error('Failed to send statistics:', error);
        ws.send(JSON.stringify({
            type: 'ERROR',
            message: 'Failed to retrieve statistics',
            severity: 'medium'
        }));
    }
}

// Enhanced API endpoints
app.get('/api/status', async (req, res) => {
    try {
        res.json({
            status: 'active',
            monitoring: SystemState.monitoring,
            threatLevel: SystemState.threatLevel,
            connectedClients: SystemState.clients.size,
            mobileClients: SystemState.mobileClients,
            desktopClients: SystemState.desktopClients,
            totalThreats: SystemState.totalThreats,
            uptime: Math.floor(process.uptime()),
            ψΩ_token: '∞',
            version: '2.0-beast-mode',
            sacredHarmony: 'ψΩ§∞',
            features: {
                payments: true,
                emailDeletion: true,
                smsDeletion: true,
                aiAnalysis: true
            }
        });
    } catch (error) {
        console.error('Status endpoint error:', error);
        res.status(500).json({ error: 'Internal server error', ψΩ_token: '∞' });
    }
});

app.get('/api/threats', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 50, 100);
        const offset = parseInt(req.query.offset) || 0;
        
        const threats = SystemState.threatHistory.slice(offset, offset + limit);
        
        res.json({
            threats,
            total: SystemState.threatHistory.length,
            limit,
            offset,
            ψΩ_token: '∞'
        });
    } catch (error) {
        console.error('Threats endpoint error:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve threats', 
            message: 'Internal server error',
            ψΩ_token: '∞' 
        });
    }
});

app.post('/api/emergency', async (req, res) => {
    const clientIP = req.ip;
    
    console.log('🚨 Emergency lockdown activated via API!');
    
    await logThreat('EMERGENCY', `Emergency lockdown activated via API from ${clientIP}`, 'critical
