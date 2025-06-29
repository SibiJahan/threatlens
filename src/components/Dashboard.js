import React, { useState, useEffect, useRef, useCallback } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './Dashboard.css'; // Optional: external styles
import { useNavigate } from 'react-router-dom';
// Define total scenes as a constant, or pass as a prop if dynamic
const TOTAL_SCENES = 15;
const AUTO_PLAY_INTERVAL = 5000; // 5 seconds per scene

function Dashboard() {
      const [currentSceneIndex, setCurrentSceneIndex] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);
    const [uploadStatus, setUploadStatus] = useState('');
    const autoPlayTimerRef = useRef(null);
    const progressBarRef = useRef(null);
    const sceneIndicatorRef = useRef(null);
    const navigate = useNavigate();

    const showScene = useCallback((num) => {
        let nextNum = num;
        if (nextNum < 1) nextNum = 1;
        if (nextNum > TOTAL_SCENES) nextNum = TOTAL_SCENES;

        setCurrentSceneIndex(nextNum);

        if (progressBarRef.current) {
            const progress = ((nextNum - 1) / (TOTAL_SCENES - 1)) * 100;
            progressBarRef.current.style.width = `${progress}%`;
        }

        if (sceneIndicatorRef.current) {
            sceneIndicatorRef.current.textContent = `${nextNum} / ${TOTAL_SCENES}`;
        }

        if (autoPlayTimerRef.current) {
            clearTimeout(autoPlayTimerRef.current);
        }

        if (isPlaying && nextNum < TOTAL_SCENES) {
            autoPlayTimerRef.current = setTimeout(() => {
                showScene(nextNum + 1);
            }, AUTO_PLAY_INTERVAL);
        }
    }, [isPlaying]);

    const nextScene = useCallback(() => {
        if (currentSceneIndex < TOTAL_SCENES) {
            showScene(currentSceneIndex + 1);
            setUploadStatus('');
        } else {
            showScene(1);
        }
    }, [currentSceneIndex, showScene]);

    const prevScene = useCallback(() => {
        if (currentSceneIndex > 1) {
            showScene(currentSceneIndex - 1);
        }
    }, [currentSceneIndex, showScene]);

    const togglePlayPause = useCallback(() => {
        setIsPlaying(prev => {
            const newIsPlaying = !prev;
            if (!newIsPlaying) {
                if (autoPlayTimerRef.current) {
                    clearTimeout(autoPlayTimerRef.current);
                }
            } else {
                showScene(currentSceneIndex);
            }
            return newIsPlaying;
        });
    }, [showScene, currentSceneIndex]);

    const restart = useCallback(() => {
        showScene(1);
        setIsPlaying(true);
    }, [showScene]);

    const skip = useCallback(() => {
        Swal.fire({
            title: 'Exit the demo?',
            showCancelButton: true,
            confirmButtonText: 'Yes, exit',
            cancelButtonText: 'No',
            customClass: { popup: 'my-swal-popup', confirmButton: 'my-swal-confirm-button', cancelButton: 'my-swal-cancel-button' },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/';
            }
        });
    }, []);
    const handleSkipDemo = useCallback(() => {
    if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
    }
    setIsPlaying(false); // Stop auto-play
    navigate('/'); // Navigate to the root route
}, [navigate]);

    const handleSimulateUpload = useCallback(() => {
        setUploadStatus('Uploading file...');
        setTimeout(() => {
            setUploadStatus('File scanned → Verdict: Malicious (InfoStealer)');
        }, 2000);
    }, []);

    // --- Effects ---
    // useEffect(() => {
    //     showScene(1);
    //     return () => {
    //         if (autoPlayTimerRef.current) {
    //             clearTimeout(autoPlayTimerRef.current);
    //         }
    //     };
    // }, [showScene]);
    // --- Effects ---
    useEffect(() => {
        // By using an empty dependency array [], this effect will only run once
        // when the component mounts, preventing it from resetting on every state change.
        showScene(1);

        return () => {
            if (autoPlayTimerRef.current) {
                clearTimeout(autoPlayTimerRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // <-- Corrected dependency array

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextScene();
            else if (e.key === 'ArrowLeft') prevScene();
            else if (e.key === ' ') {
                e.preventDefault();
                togglePlayPause();
            } else if (e.key === 'Escape') skip();
            else if (e.key >= '1' && e.key <= '9') {
                const num = parseInt(e.key);
                // --- Change starts here ---
                if (num <= TOTAL_SCENES) { // Ensure num is within bounds
                    showScene(num); // Directly call showScene instead of goToScene
                }
                // --- Change ends here ---
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [nextScene, prevScene, togglePlayPause, skip, showScene]);
    return (
        <div className='all'>
            <div className='dbbody'>
                <div className="demo-container">
                        <button className="skip-btn" id="skipBtn" onClick={handleSkipDemo}>Skip Demo</button>
                    <div className="scene-indicator" ref={sceneIndicatorRef}>1 / 15</div>
                    <div className="progress-bar" ref={progressBarRef} style={{ width: "0%" }}></div>
                    {/* */}
                    <div className={currentSceneIndex === 1 ? 'scene active' : 'scene'} id="scene1">
                        <div className="center-content">
                            {/* <svg className="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 5 L85 25 L85 65 Q85 85 50 95 Q15 85 15 65 L15 25 Z" fill="none" stroke="#0096FF" strokeWidth="2"></path>
                                <path d="M50 20 L70 30 L70 55 Q70 70 50 80 Q30 70 30 55 L30 30 Z" fill="#00D84A" opacity="0.3"></path>
                                <circle cx="50" cy="50" fill="#FF8C00" opacity="0.5" r="15"></circle>
                                <path d="M35 50 L45 60 L65 40" fill="none" stroke="#0096FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                            </svg> */}
                            <img style={{width: '10%', height: '10%', objectFit: 'contain', transform: 'scale(1.4)'}} src="/images/threatlens_logo_short.png" alt='logo'/>
                            <h1>ThreatLens Core</h1>
                            <p>AI-Powered Threat Intelligence, Analysis &amp; Automation Platform</p>
                            <button id="startBtn" onClick={nextScene}>Start Demo</button>
                        </div>
                    </div>
                    <div className={currentSceneIndex === 2 ? 'scene active' : 'scene'} id="scene2">
                        <div className="center-content">
                            <h1 style={{animation: "fadeIn 1s ease-in-out"}}>ThreatLens Core Engine Powered with LLM</h1>
                            <div className="flow-grid">
                                <div className="flow-step">📝 Input Submitted<br /><span>File / Hash / URL / Domain</span></div>
                                <div className="flow-step">💡 Analysis<br /><span>Static + Dynamic + AI/LLM Context</span></div>
                                <div className="flow-step">🔎 Scan Results<br /><span>AI Summary + Risk Score + Threat Type</span></div>
                            </div>
                            <div className="flow-result">
                                <ul>
                                    <li><strong>AI Verdict:</strong> Malicious (High Confidence)</li>
                                    <li><strong>Threat Type:</strong> InfoStealer / Loader</li>
                                    <li><strong>MITRE Mapped:</strong> T1059, T1105, T1071.001</li>
                                    <li><strong>Static Risk:</strong> 76/100</li>
                                    <li><strong>Behavioral Risk:</strong> 89/100</li>
                                    <li><strong>Overall ThreatLens Score:</strong> 82/100 – Critical</li>
                                    <li><strong>Graph Context:</strong> Related to asyncRAT Campaign / Cluster A</li>
                                    <li><strong>Export Options:</strong> PDF Report, Shareable Link, Tags, Comment</li>
                                </ul>
                                {/* Add the onClick handler here and display uploadStatus */}
                                <button id="simulateUploadBtn" style={{marginTop: "20px", background:"#00C851"}} onClick={handleSimulateUpload}>▶ Simulate File Upload</button>
                                <p id="uploadStatus" style={{marginTop: "15px", color: "#ccc"}}>{uploadStatus}</p>
                            </div>
                        </div>
                    </div>

                    <div className={currentSceneIndex === 3 ? 'scene active' : 'scene'} id="scene3">
                        <div className="scene-content">
                            <h2>Threat Results – AI-Based</h2>
                            <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "25px", borderRadius: "15px", margin: "20px 0" }}>
                                <h3>🧠 AI-Based Verdict Summary</h3>
                                <p><em>“This file is likely a variant of an infostealer. Exhibits credential harvesting, persistence, and C2 communication behavior.”</em></p>
                                <ul>
                                    <li>Backed by AI + sandbox + heuristics</li>
                                    <li>Includes a <strong>risk score</strong> (0–100)</li>
                                    <li>Key indicators: suspicious domains, injected DLLs, etc.</li>
                                </ul>
                            </div>
                            <div style={{ background: " rgba(0, 150, 255, 0.1)", padding: "25px", borderRadius: "15px", margin: "20px 0" }}>
                                <h3>🔳 Visual Threat Profile Card</h3>
                                <table style={{ width: "100%", borderCollapse: "collapse", color: "white" }}>
                                    <tbody><tr><td><strong>Risk Level</strong></td><td>High</td></tr>
                                    <tr><td><strong>Behavior Type</strong></td><td>Keylogger / Dropper / RAT</td></tr>
                                    <tr><td><strong>First Seen</strong></td><td>June 2024</td></tr>
                                    <tr><td><strong>Spread Method</strong></td><td>Malicious Email</td></tr>
                                    <tr><td><strong>Tags</strong></td><td>Stealer, Windows, Info Exfiltration</td></tr>
                                    <tr><td><strong>Summary</strong></td><td>Auto-generated by LLM</td></tr></tbody>
                                </table>
                            </div>
                            <div style={{ background: "rgba(255, 0, 0, 0.1)", padding: "25px", borderRadius: "15px", margin: "20px 0" }}>
                                <h3>📉 Threat Score Breakdown</h3>
                                <ul>
                                    <li><strong>Static Risk:</strong> 76%</li>
                                    <li><strong>Behavioral Risk:</strong> 89%</li>
                                    <li><strong>Overall ThreatLens Score:</strong> 82% – Critical</li>
                                </ul>
                            </div>
                            <div style={{ background: "rgba(0, 216, 74, 0.1)", padding: "25px", borderRadius: "15px", margin: "20px 0" }}>
                                <h3>📜 Narrative Report (LLM-Powered)</h3>
                                <p><em>“This sample shows behavior consistent with the AsyncRAT family. It establishes persistence via registry, downloads secondary payloads, and uses TLS-encrypted C2 channels.”</em></p>
                                <p>• More human-friendly<br />• Avoids hard labels<br />• Can be private/internal use</p>
                            </div>
                            <div style={{ background: 'rgba(255, 255, 0, 0.1)', padding: '25px', borderRadius: '15px', margin: '20px 0', }}>
                                <h3>🔄 MITRE ATT&amp;CK Mapping</h3>
                                <code>
                                    ✅ T1059 - Command and Scripting Interpreter<br />
                                    ✅ T1105 - Ingress Tool Transfer<br />
                                    ✅ T1071.001 - Application Layer Protocol (Web)
                                </code>
                            </div>
                            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '25px', borderRadius: '15px', margin: '20px 0' }}>
                                <h3>🔘 ThreatLens Verdict Only</h3>
                                <p>
                                    <strong>ThreatLens AI Verdict:</strong> Malicious (High Confidence)
                                </p>
                                <p>
                                    <a href="/Dashboard" style={{ color: '#00D84A' }}>
                                        View Similar Samples
                                    </a>{' '}
                                    •{' '}
                                    <a href="/Dashboard" style={{ color: '#00D84A' }}>
                                        Related Threats
                                    </a>{' '}
                                    •{' '}
                                    <a href="/Dashboard" style={{ color: '#00D84A' }}>
                                        Historical Behavior
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* */}
                   <div className={currentSceneIndex === 13 ? 'scene active' : 'scene'} id="scene13">
                        <div className="scene-content">
                            {/* <h2>Unified Security Dashboard</h2>
                            <div className="metric-grid">
                                <div className="metric-card">
                                    <div className="metric-value">15,847</div>
                                    <p>Assets Protected</p>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-value">2,341</div>
                                    <p>Threats Blocked Today</p>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-value">47ms</div>
                                    <p>Avg Response Time</p>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-value">98.7%</div>
                                    <p>Detection Accuracy</p>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-value">127</div>
                                    <p>Incidents Auto-Resolved Today</p>
                                </div>
                                <div className="metric-card">
                                    <div className="metric-value">99.99%</div>
                                    <p>Platform Uptime</p>
                                </div>
                            </div>
                            <h3>Real-Time Threat Feed</h3>
                            <div className="threat-feed">
                                <div className="threat-item">
                                    <strong>CRITICAL:</strong> Ransomware detected on endpoint WIN-SERVER-01
                                </div>
                                <div className="threat-item">
                                    <strong>HIGH:</strong> Suspicious data transfer to IP 185.220.101.45
                                </div>
                                <div className="threat-item">
                                    <strong>MEDIUM:</strong> Failed login attempts from 203.0.113.0/24
                                </div>
                            </div> */}

                            <h3 style={{ marginTop: "40px" }}>Enhanced Intelligence Panels</h3>
                            <div className="metric-grid">
                                <div className="metric-card">
                                    <h4>🌍 Live IOC Map</h4>
                                    <p>Real-time visual of IOC hits across global locations</p>
                                </div>
                                <div className="metric-card">
                                    <h4>🔥 Trending Threats &amp; Actors</h4>
                                    <p>Top threats affecting your industry in the past 24h</p>
                                </div>
                                <div className="metric-card">
                                    <h4>🧬 Malware Family Breakdown</h4>
                                    <p>Infostealers, Ransomware, RATs – dynamic categorization</p>
                                </div>
                                <div className="metric-card">
                                    <h4>📊 Submission Analytics</h4>
                                    <p>Files, URLs, Hashes scanned – volume &amp; verdict trends</p>
                                </div>
                                <div className="metric-card">
                                    <h4>🤖 AI Verdicts Panel</h4>
                                    <p>Last 100 samples – risk score &amp; verdict heatmap</p>
                                </div>
                                <div className="metric-card">
                                    <h4>🧠 MITRE Technique Overlay</h4>
                                    <p>Observed behavior mapped to MITRE ATT&amp;CK</p>
                                </div>
                                <div className="metric-card">
                                    <h4>👤 User Scan History + Watchlist</h4>
                                    <p>Last activity + flagged submissions with alerts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={currentSceneIndex === 4 ? 'scene active' : 'scene'} id="scene4">
                        <div className="scene-content">
                            <h2>AI-Powered Threat Analysis</h2>
                            {/* */}
                            <div
                                style={{
                                    background: 'rgba(255, 0, 0, 0.1)',
                                    border: '2px solid #ff0066',
                                    padding: '30px',
                                    borderRadius: '15px',
                                    margin: '20px 0',
                                }}
                            >
                                <h3 style={{ color: '#ff0066' }}>
                                    🚨 CRITICAL: CVE-2024-21887 Active Exploitation Detected
                                </h3>
                                <div
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        margin: '15px 0',
                                    }}
                                >
                                    <h4>AI Contextualized Analysis for YOUR Environment:</h4>
                                    <p>
                                        <strong>Affected Asset:</strong> Your RDP-exposed Windows Server
                                        2022 (PROD-WIN-DC01) running on AWS us-east-1
                                    </p>
                                    <p>
                                        <strong>Critical Context:</strong> This server hosts your Active
                                        Directory and has access to 2,500+ user credentials
                                    </p>
                                    <p>
                                        <strong>Exploitation Impact:</strong> Attackers could achieve
                                        domain admin privileges → lateral movement to all systems → complete
                                        network compromise
                                    </p>
                                    <p>
                                        <strong>Business Impact:</strong> $12.5M potential loss (based on
                                        your industry average of $5K per compromised credential)
                                    </p>
                                    <p>
                                        <strong>Compliance Risk:</strong> GDPR violation - 4% annual revenue
                                        fine ($8.2M based on your $205M revenue)
                                    </p>
                                </div>
                                <div
                                    style={{
                                        background: '#00D84A',
                                        color: 'black',
                                        padding: '15px',
                                        borderRadius: '10px',
                                        margin: '15px 0',
                                    }}
                                >
                                    <strong>✅ ThreatLens Already Took Action:</strong> Firewall rules
                                    updated, RDP disabled, patch deployment initiated. Time saved: 4.5 hours
                                    of manual work.
                                </div>
                            </div>
                            {/* */}
                            <div
                                style={{
                                    background: 'rgba(255, 140, 0, 0.1)',
                                    border: '1px solid #FF8C00',
                                    padding: '25px',
                                    borderRadius: '15px',
                                    margin: '20px 0',
                                }}
                            >
                                <h3 style={{ color: '#FF8C00' }}>
                                    ⚠️ Industry-Specific Attack: Healthcare Ransomware Campaign
                                </h3>
                                <p>
                                    <strong>TTP in Plain English:</strong> "Attackers are using fake COVID
                                    vaccine shipment emails to target healthcare organizations. They're
                                    exploiting your Citrix NetScaler (CVE-2023-4966) to steal session
                                    cookies."
                                </p>
                                <p>
                                    <strong>Your Specific Risk:</strong> 3 of your 12 Citrix gateways are
                                    vulnerable. These provide access to:
                                </p>
                                <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                    <li>
                                        Electronic Health Records (EHR) system - 450,000 patient records
                                    </li>
                                    <li>Medical imaging PACS server - 2.1M radiology images</li>
                                    <li>Pharmacy management system - controlled substance tracking</li>
                                </ul>
                                <p>
                                    <strong>HIPAA Implications:</strong> Breach notification required
                                    within 72 hours, potential $50K-$2M fine per violation
                                </p>
                            </div>
                            {/* */}
                            <div
                                style={{
                                    background: 'rgba(0, 150, 255, 0.1)',
                                    border: '1px solid #0096FF',
                                    padding: '25px',
                                    borderRadius: '15px',
                                    margin: '20px 0',
                                }}
                            >
                                <h3 style={{ color: '#0096FF' }}>
                                    🔗 Supply Chain Risk: SolarWinds-Style Attack Detected
                                </h3>
                                <p>
                                    <strong>AI Discovery:</strong> Unusual activity in your Jenkins CI/CD
                                    pipeline - possible supply chain compromise attempt
                                </p>
                                <p>
                                    <strong>Attack Chain Simplified:</strong>
                                </p>
                                <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                    <li>
                                        Compromised npm package 'logger-utils' (used in 47 of your
                                        microservices)
                                    </li>
                                    <li>Backdoor activates only in production builds</li>
                                    <li>Exfiltrates AWS credentials and database connection strings</li>
                                    <li>Could inject malicious code into customer-facing applications</li>
                                </ol>
                                <p>
                                    <strong>Downstream Impact:</strong> 15,000 B2B customers using your
                                    SaaS platform at risk
                                </p>
                                <p>
                                    <strong>Regulatory Exposure:</strong> SOC2 breach, potential loss of
                                    FedRAMP authorization
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* */}
                   <div className={currentSceneIndex === 5 ? 'scene active' : 'scene'} id="scene5">
                        <div className="scene-content">
                            <h2>Hardware &amp; IoT Security Intelligence</h2>
                            {/* */}
                            <div
                                style={{
                                    background: 'rgba(255, 0, 0, 0.1)',
                                    border: '2px solid #ff0066',
                                    padding: '30px',
                                    borderRadius: '15px',
                                    margin: '20px 0',
                                }}
                            >
                                <h3 style={{ color: '#ff0066' }}>
                                    🏭 CRITICAL: Industrial Control System Under Attack
                                </h3>
                                <div
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        margin: '15px 0',
                                    }}
                                >
                                    <p>
                                        <strong>Affected Systems:</strong> Siemens S7-1200 PLCs (Firmware
                                        4.4.0) controlling production line #3
                                    </p>
                                    <p>
                                        <strong>Attack Vector:</strong> TRITON/TRISIS variant targeting
                                        safety instrumented systems (SIS)
                                    </p>
                                    <p>
                                        <strong>Real Impact:</strong>
                                    </p>
                                    <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                        <li>Production capacity: 10,000 units/day ($2.5M daily revenue)</li>
                                        <li>
                                            Safety risk: Override of temperature controls could cause
                                            equipment damage
                                        </li>
                                        <li>
                                            Environmental: Potential chemical release requiring EPA
                                            notification
                                        </li>
                                    </ul>
                                    <p>
                                        <strong>Insurance Impact:</strong> Cyber policy may not cover
                                        physical damage - $45M exposure
                                    </p>
                                </div>
                                <button style={{ background: '#ff0066', marginTop: '10px' }}>
                                    Emergency OT Response Activated
                                </button>
                            </div>
                            {/* */}
                            <div
                                style={{
                                    background: 'rgba(255, 140, 0, 0.1)',
                                    border: '1px solid #FF8C00',
                                    padding: '25px',
                                    borderRadius: '15px',
                                    margin: '20px 0',
                                }}
                            >
                                <h3 style={{ color: '#FF8C00' }}>
                                    🌐 Network Infrastructure: Cisco ASA Zero-Day
                                </h3>
                                <p>
                                    <strong>Your Exposure:</strong> 23 Cisco ASA firewalls (ASA 5506-X) at
                                    branch offices
                                </p>
                                <p>
                                    <strong>Critical Finding:</strong> "Attackers can bypass authentication
                                    and execute commands. Your Atlanta and Chicago offices' firewalls show
                                    suspicious login attempts matching the exploit signature."
                                </p>
                                <p>
                                    <strong>Connected Systems at Risk:</strong>
                                </p>
                                <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                    <li>Point-of-Sale systems processing $1.2M daily transactions</li>
                                    <li>Guest WiFi serving 5,000+ customers daily (liability risk)</li>
                                    <li>Site-to-site VPN to corporate datacenter</li>
                                </ul>
                                <p>
                                    <strong>PCI-DSS Alert:</strong> Network segmentation breach = immediate
                                    non-compliance
                                </p>
                            </div>
                            {/* */}
                            <div
                                style={{
                                    background: 'rgba(0, 150, 255, 0.1)',
                                    border: '1px solid #0096FF',
                                    padding: '25px',
                                    borderRadius: '15px',
                                    margin: '20px 0',
                                }}
                            >
                                <h3 style={{ color: '#0096FF' }}>
                                    🏢 Smart Building Systems Compromised
                                </h3>
                                <p>
                                    <strong>Affected Devices:</strong> 847 IoT devices across 3 office
                                    buildings
                                </p>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '15px',
                                        margin: '15px 0',
                                    }}
                                >
                                    <div
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            padding: '15px',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <strong>HVAC System (BACnet)</strong>
                                        <p>• Attackers could disable cooling for server rooms</p>
                                        <p>• $2.3M in equipment at risk of overheating</p>
                                    </div>
                                    <div
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            padding: '15px',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <strong>Access Control (HID)</strong>
                                        <p>• 1,200 keycards could be cloned</p>
                                        <p>• Physical security breach possible</p>
                                    </div>
                                </div>
                                <p style={{ color: '#00D84A' }}>
                                    <strong>AI Recommendation:</strong> Segment IoT devices to isolated
                                    VLAN. Estimated implementation: 2 hours. Risk reduction: 94%
                                </p>
                            </div>
                        </div>
                    </div>
                   <div className={currentSceneIndex === 6 ? 'scene active' : 'scene'} id="scene6">
                        <div className="scene-content">
                            <h2>Cloud-Native &amp; Container Threat Intelligence</h2>
                            {/* */}
                            <div
                                style={{
                                    background: 'rgba(255, 0, 0, 0.1)',
                                    border: '2px solid #ff0066',
                                    padding: '30px',
                                    borderRadius: '15px',
                                    margin: '20px 0',
                                }}
                            >
                                <h3 style={{ color: '#ff0066' }}>
                                    ☸️ Kubernetes Cluster Breach in Progress
                                </h3>
                                <div
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        margin: '15px 0',
                                    }}
                                >
                                    <p>
                                        <strong>Cluster:</strong> prod-k8s-cluster (EKS 1.28) running 234
                                        microservices
                                    </p>
                                    <p>
                                        <strong>Attack Details:</strong> Cryptomining pods deployed using
                                        exposed Kubernetes API (no RBAC)
                                    </p>
                                    <p>
                                        <strong>Current Impact:</strong>
                                    </p>
                                    <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                        <li>AWS bill spike: +$47,000 this month from crypto mining</li>
                                        <li>Customer API latency increased 340% (SLA breaches)</li>
                                        <li>Attacker has access to 14 database connection secrets</li>
                                    </ul>
                                    <p>
                                        <strong>Data at Risk:</strong> 4.7M customer records, 890GB of
                                        transaction data
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '10px',
                                        margin: '15px 0',
                                    }}
                                >
                                    <button style={{ background: '#ff0066', fontSize: '14px' }}>
                                        Isolate Cluster
                                    </button>
                                    <button style={{ background: '#FF8C00', fontSize: '14px' }}>
                                        Kill Rogue Pods
                                    </button>
                                    <button style={{ background: '#0096FF', fontSize: '14px' }}>
                                        Rotate Secrets
                                    </button>
                                </div>
                            </div>
                            {/* */}
                            <div
                                style={{
                                    background: 'rgba(255, 140, 0, 0.1)',
                                    border: '1px solid #FF8C00',
                                    padding: '25px',
                                    borderRadius: '15px',
                                    margin: '20px 0',
                                }}
                            >
                                <h3 style={{ color: '#FF8C00' }}>
                                    ☁️ Critical: Public S3 Buckets with PII Detected
                                </h3>
                                <p>
                                    <strong>AI Found:</strong> 3 S3 buckets misconfigured after yesterday's
                                    deployment
                                </p>
                                <div
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '15px',
                                        borderRadius: '10px',
                                        margin: '10px 0',
                                    }}
                                >
                                    <p>
                                        <strong>Bucket: customer-backups-prod</strong>
                                    </p>
                                    <p>• Contains: 2.3M customer SSNs, credit card data</p>
                                    <p>• Exposed for: 18 hours</p>
                                    <p>• Access logs show: 47 unauthorized downloads from TOR exit nodes</p>
                                </div>
                                <p style={{ color: '#ff0066' }}>
                                    <strong>Legal Alert:</strong> All 50 states breach notification laws
                                    triggered. CCPA fine potential: $7,500 per record = $17.25B maximum
                                    exposure
                                </p>
                                <p style={{ color: '#00D84A' }}>
                                    <strong>Actions Taken:</strong> Buckets secured, CloudTrail analysis
                                    running, legal team notified
                                </p>
                            </div>
                            {/* */}
                            <div
                                style={{
                                    background: 'rgba(0, 150, 255, 0.1)',
                                    border: '1px solid #0096FF',
                                    padding: '25px',
                                    borderRadius: '15px',
                                    margin: '20px 0',
                                }}
                            >
                                <h3 style={{ color: '#0096FF' }}>
                                    🐳 Malicious Container Image in Production
                                </h3>
                                <p>
                                    <strong>Discovery:</strong> Base image 'node:16-alpine' replaced with
                                    backdoored version in your registry
                                </p>
                                <p>
                                    <strong>Affected Applications:</strong> 67 microservices rebuilt in last
                                    72 hours
                                </p>
                                <p>
                                    <strong>Backdoor Capabilities:</strong>
                                </p>
                                <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                    <li>Reverse shell to C2 server in Russia</li>
                                    <li>Memory scraping for API keys and passwords</li>
                                    <li>Persistent even after container restart</li>
                                </ul>
                                <p>
                                    <strong>Customer Impact:</strong> Payment processing service affected -
                                    handling $4.2M daily volume
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* */}
                   <div className={currentSceneIndex === 7 ? 'scene active' : 'scene'} id="scene7">
                        <div className="scene-content">
                            <h2>Real-Time Business Impact Analysis</h2>
                            {/* */}
                            <div
                                style={{
                                    background: 'white',
                                    color: '#333',
                                    padding: '40px',
                                    borderRadius: '15px',
                                    margin: '20px 0',
                                }}
                            >
                                <h3 style={{ color: '#333', textAlign: 'center', marginBottom: '30px' }}>
                                    AI-Calculated Financial Impact This Quarter
                                </h3>
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        gap: '30px',
                                    }}
                                >
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            padding: '30px',
                                            background: '#ffebee',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: '48px',
                                                fontWeight: 'bold',
                                                color: '#c62828',
                                                margin: '0',
                                            }}
                                        >
                                            $47.3M
                                        </p>
                                        <p style={{ color: '#c62828', fontWeight: 'bold', margin: '10px 0 0 0' }}>
                                            Total Risk Exposure Identified
                                        </p>
                                        <ul style={{ textAlign: 'left', marginTop: '15px', paddingLeft: '20px', color: '#666' }}>
                                            <li>Ransomware risk: $12.5M</li>
                                            <li>Compliance fines: $17.25M</li>
                                            <li>Operational downtime: $8.4M</li>
                                            <li>Data breach costs: $9.15M</li>
                                        </ul>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            padding: '30px',
                                            background: '#e8f5e9',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: '48px',
                                                fontWeight: 'bold',
                                                color: '#2e7d32',
                                                margin: '0',
                                            }}
                                        >
                                            $44.7M
                                        </p>
                                        <p style={{ color: '#2e7d32', fontWeight: 'bold', margin: '10px 0 0 0' }}>
                                            Losses Prevented by ThreatLens
                                        </p>
                                        <ul style={{ textAlign: 'left', marginTop: '15px', paddingLeft: '20px', color: '#666' }}>
                                            <li>Blocked attacks: $31.2M</li>
                                            <li>Prevented downtime: $7.8M</li>
                                            <li>Compliance maintained: $4.1M</li>
                                            <li>Reputation protected: $1.6M</li>
                                        </ul>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginTop: '30px',
                                        padding: '20px',
                                        background: '#e3f2fd',
                                        borderRadius: '10px',
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: '32px',
                                            fontWeight: 'bold',
                                            color: '#1565c0',
                                            margin: '0',
                                        }}
                                    >
                                        ROI: 1,247%
                                    </p>
                                    <p style={{ color: '#666', margin: '10px 0 0 0' }}>
                                        Every $1 spent on ThreatLens saved $12.47 in prevented losses
                                    </p>
                                </div>
                                <div
                                    style={{
                                        marginTop: '30px',
                                        padding: '20px',
                                        background: '#fff3e0',
                                        borderRadius: '10px',
                                    }}
                                >
                                    <h4 style={{ color: '#e65100', marginBottom: '10px' }}>
                                        🕐 Time Savings This Month
                                    </h4>
                                    <p style={{ color: '#666', margin: '0' }}>
                                        <strong>487 hours</strong> of manual security analysis automated
                                    </p>
                                    <p style={{ color: '#666', margin: '5px 0' }}>
                                        • CVE research &amp; prioritization: 210 hours saved
                                    </p>
                                    <p style={{ color: '#666', margin: '5px 0' }}>
                                        • Compliance reporting: 145 hours saved
                                    </p>
                                    <p style={{ color: '#666', margin: '5px 0' }}>
                                        • Incident investigation: 132 hours saved
                                    </p>
                                    <p style={{ color: '#e65100', marginTop: '10px' }}>
                                        <strong>Team efficiency increased 340%</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* */}
                    <div className={currentSceneIndex === 8 ? 'scene active' : 'scene'} id="scene8">
                        <div className="scene-content">
                            <h2 style={{animation: "fadeInZoom 1s ease-in-out forwards"}}>Natural Language Security Assistant</h2>
                            <div style={{ textAlign: 'center', margin: '40px 0' }}>
                                <div
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        margin: '0 auto 30px',
                                        background: 'linear-gradient(135deg, #0096FF, #00D84A)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        animation: "fadeInZoom 1s ease-in-out forwards 0.3s"
                                    }}
                                >
                                    <span style={{ fontSize: '60px' }}>🎤</span>
                                </div>
                                <h3 style={{animation: "fadeInZoom 1s ease-in-out forwards"}}>Ask me anything about your security in plain English</h3>
                            </div>
                            <div
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    padding: '30px',
                                    borderRadius: '15px',
                                }}
                            >
                                <h3 style={{animation: "fadeInStep 0.8s ease forwards 0.6s", opacity: 0}}>Real Examples from Today:</h3>
                                <div
                                    style={{
                                        background: 'rgba(0, 150, 255, 0.1)',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        margin: '15px 0',
                                    }}
                                >
                                    <p style={{ color: '#0096FF', fontWeight: 'bold',animation: "fadeInStep 0.8s ease forwards 0.9s", opacity: 0 }}>
                                        Q: "Which of our databases could be accessed if someone compromised
                                        our Jenkins server?"
                                    </p>
                                    <p style={{ marginTop: '10px' ,animation: "fadeInStep 0.8s ease forwards 1.2s", opacity: 0}}>
                                        <strong>AI:</strong> Your Jenkins server has stored credentials for 3
                                        production databases: customer-db-prod (4.7M records),
                                        transactions-db (890GB), and analytics-warehouse (12TB). If
                                        compromised, an attacker could access all three. I recommend
                                        implementing HashiCorp Vault for credential management -
                                        implementation time: 4 hours.
                                    </p>
                                </div>
                                <div
                                    style={{
                                        background: 'rgba(0, 216, 74, 0.1)',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        margin: '15px 0',
                                        animation: "fadeInStep 0.8s ease forwards 1.5s", opacity: 0
                                    }}
                                >
                                    <p style={{ color: '#00D84A', fontWeight: 'bold' ,animation: "fadeInStep 0.8s ease forwards 1.8s", opacity: 0}}>
                                        Q: "Are we vulnerable to the new Microsoft Exchange zero-day?"
                                    </p>
                                    <p style={{ marginTop: '10px' ,animation: "fadeInStep 0.8s ease forwards 2.1s", opacity: 0}}>
                                        <strong>AI:</strong> Yes, 2 of your 5 Exchange servers (EXCH-NYC-01
                                        and EXCH-SF-02) are vulnerable. They're running version 15.2.1118.7.
                                        I've already applied temporary mitigations and scheduled patching for
                                        tonight's maintenance window. 847 mailboxes potentially at risk - all
                                        VIP users have been moved to the patched servers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* */}
                   <div className={currentSceneIndex === 9 ? 'scene active' : 'scene'} id="scene9">
                        <div className="scene-content">
                            <h2>Executive Security Report</h2>
                            <div
                                style={{
                                    background: 'white',
                                    color: '#333',
                                    borderRadius: '15px',
                                    padding: '40px',
                                    margin: '20px 0',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '30px',
                                    }}
                                >
                                    <div>
                                        <h3 style={{ color: '#333', margin: '0' }}>Monthly Security Report</h3>
                                        <p style={{ color: '#666', margin: '5px 0 0 0' }}>
                                            Generated: March 21, 2024
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button style={{ background: '#007bff', padding: '8px 16px', fontSize: '14px' }}>
                                            Export PDF
                                        </button>
                                        <button style={{ background: '#28a745', padding: '8px 16px', fontSize: '14px' }}>
                                            Board Presentation
                                        </button>
                                    </div>
                                </div>
                                {/* */}
                                <div
                                    style={{
                                        background: '#f8f9fa',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <h4 style={{ color: '#333', marginBottom: '15px' }}>Executive Summary</h4>
                                    <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                                        Overall Security Score: 94/100
                                        <span style={{ fontSize: '14px', color: '#666', fontWeight: 'normal' }}>
                                            ↑ 12 points from last month
                                        </span>
                                    </p>
                                </div>
                                {/* */}
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '20px',
                                        marginBottom: '30px',
                                    }}
                                >
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            padding: '20px',
                                            background: '#d4edda',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: '32px',
                                                fontWeight: 'bold',
                                                color: '#155724',
                                                margin: '0',
                                            }}
                                        >
                                            $44.7M
                                        </p>
                                        <p style={{ color: '#155724', margin: '5px 0 0 0' }}>Losses Prevented</p>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            padding: '20px',
                                            background: '#cce5ff',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: '32px',
                                                fontWeight: 'bold',
                                                color: '#004085',
                                                margin: '0',
                                            }}
                                        >
                                            99.91%
                                        </p>
                                        <p style={{ color: '#004085', margin: '5px 0 0 0' }}>Threat Prevention</p>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            padding: '20px',
                                            background: '#fff3cd',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: '32px',
                                                fontWeight: 'bold',
                                                color: '#856404',
                                                margin: '0',
                                            }}
                                        >
                                            487hrs
                                        </p>
                                        <p style={{ color: '#856404', margin: '5px 0 0 0' }}>Time Saved</p>
                                    </div>
                                </div>
                                {/* */}
                                <div
                                    style={{
                                        background: '#ffebee',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        borderLeft: '4px solid #f44336',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <h4 style={{ color: '#c62828', marginBottom: '10px' }}>
                                        Critical Incidents Prevented This Month
                                    </h4>
                                    <ul style={{ margin: '0', paddingLeft: '20px', color: '#666' }}>
                                        <li>
                                            <strong>Ransomware Attack:</strong> Saved $12.5M, protected 2,500
                                            endpoints
                                        </li>
                                        <li>
                                            <strong>Data Breach:</strong> Prevented exposure of 4.7M customer
                                            records
                                        </li>
                                        <li>
                                            <strong>Supply Chain Attack:</strong> Detected compromised npm
                                            packages before deployment
                                        </li>
                                        <li>
                                            <strong>Insider Threat:</strong> Stopped unauthorized data
                                            exfiltration of source code
                                        </li>
                                    </ul>
                                </div>
                                {/* */}
                                <div
                                    style={{
                                        background: '#e8f5e9',
                                        padding: '20px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <h4 style={{ color: '#2e7d32', marginBottom: '15px' }}>
                                        Strategic Security Metrics
                                    </h4>
                                    <ul style={{ margin: '0', paddingLeft: '20px', color: '#666' }}>
                                        <li>
                                            <strong>Cyber Insurance Premium:</strong> Reduced by 32% due to
                                            improved security posture
                                        </li>
                                        <li>
                                            <strong>Compliance Status:</strong> 100% compliant across GDPR,
                                            HIPAA, SOC2, PCI-DSS
                                        </li>
                                        <li>
                                            <strong>Mean Time to Detect:</strong> 47 seconds (industry
                                            average: 207 days)
                                        </li>
                                        <li>
                                            <strong>Security ROI:</strong> 1,247% - Every $1 spent saved
                                            $12.47
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                   <div className={currentSceneIndex === 10 ? 'scene active' : 'scene'} id="scene10">
                        <div className="scene-content">
                            <h2>Automated Compliance &amp; Audit Readiness</h2>
                            <div className="compliance-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                <div className="compliance-card" style={{ background: 'rgba(0, 216, 74, 0.1)', border: '1px solid #00D84A', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                                    <h3>🛡️ GDPR Compliance</h3>
                                    <p style={{ fontSize: '2rem', color: '#00D84A' }}>95%</p>
                                    <p>AI-generated DPO report ready</p>
                                    <button style={{ background: '#00D84A', marginTop: '10px', fontSize: '14px', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Download GDPR Evidence Package</button>
                                </div>
                                <div className="compliance-card" style={{ background: 'rgba(0, 216, 74, 0.1)', border: '1px solid #00D84A', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                                    <h3>🏥 HIPAA Compliance</h3>
                                    <p style={{ fontSize: '2rem', color: '#00D84A' }}>98%</p>
                                    <p>PHI access fully audited</p>
                                    <button style={{ background: '#00D84A', marginTop: '10px', fontSize: '14px', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Generate HIPAA Audit Trail</button>
                                </div>
                                <div className="compliance-card" style={{ background: 'rgba(255, 215, 0, 0.1)', border: '1px solid #FFD700', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                                    <h3>📋 SOC2 Type II</h3>
                                    <p style={{ fontSize: '2rem', color: '#FFD700' }}>87%</p>
                                    <p>2 controls need attention</p>
                                    <button style={{ background: '#FFD700', marginTop: '10px', fontSize: '14px', color: 'black', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>View Gap Analysis</button>
                                </div>
                                <div className="compliance-card" style={{ background: 'rgba(0, 216, 74, 0.1)', border: '1px solid #00D84A', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                                    <h3>💳 PCI DSS 4.0</h3>
                                    <p style={{ fontSize: '2rem', color: '#00D84A' }}>100%</p>
                                    <p>Passed automated scan</p>
                                    <button style={{ background: '#00D84A', marginTop: '10px', fontSize: '14px', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Export PCI Report</button>
                                </div>
                            </div>
                            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '30px', borderRadius: '15px', margin: '30px 0' }}>
                                <h3 style={{ color: '#0096FF' }}>🚀 AI Compliance Assistant Saves 145 Hours/Month</h3>
                                <p>• Automatic evidence collection across 2,500+ systems</p>
                                <p>• Real-time compliance drift detection and auto-remediation</p>
                                <p>• One-click audit packages with full chain of custody</p>
                                <p>• Predictive compliance: "You'll fail PCI scan in 3 days if SSL cert expires"</p>
                            </div>
                        </div>
                    </div>
                    {/* */}
                  <div className={currentSceneIndex === 11 ? 'scene active' : 'scene'} id="scene11">
                        <div className="scene-content">
                            <h2>Seamless Integrations - Your Entire Stack Protected</h2>
                            <p style={{ textAlign: 'center', marginBottom: '30px' }}>ThreatLens enhances your existing security investments with AI-powered intelligence</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', margin: '40px 0' }}>
                                <div className="metric-card" style={{ cursor: 'pointer', transition: 'all 0.3s', background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>Splunk 🔍</h3>
                                    <p>2.3B events/day analyzed</p>
                                    <p style={{ color: '#00D84A', fontSize: '12px' }}>↓ 89% false positives</p>
                                </div>
                                <div className="metric-card" style={{ cursor: 'pointer', transition: 'all 0.3s', background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>AWS Security ☁️</h3>
                                    <p>GuardDuty + SecurityHub</p>
                                    <p style={{ color: '#00D84A', fontSize: '12px' }}>Auto-remediation enabled</p>
                                </div>
                                <div className="metric-card" style={{ cursor: 'pointer', transition: 'all 0.3s', background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>CrowdStrike 🦅</h3>
                                    <p>15,847 endpoints</p>
                                    <p style={{ color: '#00D84A', fontSize: '12px' }}>AI-enhanced EDR</p>
                                </div>
                                <div className="metric-card" style={{ cursor: 'pointer', transition: 'all 0.3s', background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>ServiceNow 🎫</h3>
                                    <p>Automated ticketing</p>
                                    <p style={{ color: '#00D84A', fontSize: '12px' }}>↓ 67% MTTR</p>
                                </div>
                                <div className="metric-card" style={{ cursor: 'pointer', transition: 'all 0.3s', background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>Microsoft 365 📧</h3>
                                    <p>Email security enhanced</p>
                                    <p style={{ color: '#00D84A', fontSize: '12px' }}>Zero-hour protection</p>
                                </div>
                                <div className="metric-card" style={{ cursor: 'pointer', transition: 'all 0.3s', background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>Palo Alto 🔥</h3>
                                    <p>23 firewalls managed</p>
                                    <p style={{ color: '#00D84A', fontSize: '12px' }}>AI rule optimization</p>
                                </div>
                                <div className="metric-card" style={{ cursor: 'pointer', transition: 'all 0.3s', background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>Kubernetes ☸️</h3>
                                    <p>Runtime protection</p>
                                    <p style={{ color: '#00D84A', fontSize: '12px' }}>Container scanning</p>
                                </div>
                                <div className="metric-card" style={{ cursor: 'pointer', transition: 'all 0.3s', background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>1,200+ More 🔗</h3>
                                    <p>Universal API</p>
                                    <p style={{ color: '#00D84A', fontSize: '12px' }}>Any tool, any vendor</p>
                                </div>
                            </div>
                            <div style={{ background: 'linear-gradient(135deg, rgba(0, 150, 255, 0.1), rgba(0, 216, 74, 0.1))', padding: '30px', borderRadius: '15px', textAlign: 'center' }}>
                                <h3>🎯 Integration ROI: 340% Efficiency Gain</h3>
                                <p>ThreatLens correlates data from all your tools, eliminating swivel-chair analysis</p>
                            </div>
                        </div>
                    </div>
                    {/* */}
                   <div className={currentSceneIndex === 15 ? 'scene active' : 'scene'} id="scene16">
                        <div className="center-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', height: '100%' }}>
                            <h1>Your Security Transformation Starts Now</h1>
                            <p style={{ fontSize: '1.5rem', margin: '30px 0' }}>Join 500+ organizations preventing millions in losses with AI</p>
                            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '30px', borderRadius: '15px', margin: '30px 0', width: '100%', maxWidth: '700px' }}>
                                <h3 style={{ marginBottom: '20px' }}>What You Get with ThreatLens:</h3>
                                <ul style={{ listStyle: 'none', padding: '0', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                                    <li style={{ margin: '10px 0' }}>✅ 99.91% threat prevention rate</li>
                                    <li style={{ margin: '10px 0' }}>✅ 47-second average response time</li>
                                    <li style={{ margin: '10px 0' }}>✅ $44.7M average losses prevented</li>
                                    <li style={{ margin: '10px 0' }}>✅ 487 hours saved monthly on security tasks</li>
                                    <li style={{ margin: '10px 0' }}>✅ 100% compliance across major frameworks</li>
                                </ul>
                            </div>
                            {/* <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                                <button style={{ background: '#00D84A', padding: '15px 40px', fontSize: '18px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Start 14-Day Free Trial</button>
                                <button style={{ background: 'transparent', border: '2px solid #0096FF', padding: '15px 40px', fontSize: '18px', color: '#0096FF', borderRadius: '5px', cursor: 'pointer' }}>Schedule Live Demo</button>
                            </div> */}
                            {/* <p style={{ marginTop: '30px', color: '#666' }}>No credit card required • Deploy in 15 minutes • Cancel anytime</p> */}
                        </div>
                    </div>
                    {/* */}
                     <div className="controls" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: '1000' }}>
                        <button id="prevBtn" onClick={prevScene} style={{ background: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Previous</button>
                        <button id="playPauseBtn" onClick={togglePlayPause} style={{ background: '#6c757d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button id="nextBtn" onClick={nextScene} style={{ background: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Next</button>
                        <button id="restartBtn" onClick={restart} style={{ background: '#dc3545', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Restart</button>
                    </div>
                    {/* */}
                   {/* <div className={currentSceneIndex === 12 ? 'scene active' : 'scene'} id="scene12">
                        <div className="scene-content">
                            <h2>PatchPilot – Autonomous Vulnerability Remediation</h2>
                            <div style={{ background: 'rgba(0, 216, 74, 0.1)', border: '2px solid #00D84A', padding: '30px', borderRadius: '15px', margin: '20px 0' }}>
                                <h3 style={{ color: '#00D84A' }}>🚀 Agentic Patch Management with AI</h3>
                                <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                    <li>🧠 CVE Ingestion &amp; Analysis from scanners (Wazuh, Tenable, Rapid7)</li>
                                    <li>🧪 Sandbox testing before live patching</li>
                                    <li>✅ AI decision-making: apply, defer, or escalate</li>
                                    <li>♻️ Auto-rollback if application fails post-patch</li>
                                </ul>
                                <div style={{ marginTop: '20px' }}>
                                    <strong>📊 Metrics:</strong>
                                    <ul>
                                        <li>4,812 CVEs assessed</li>
                                        <li>2,974 safely patched</li>
                                        <li>38 flagged for human review</li>
                                        <li>Patch failure reduced by 91%</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* */}

                    {/* */}
                   <div className={currentSceneIndex === 12 ? 'scene active' : 'scene'} id="scene14">
                        <div className="scene-content">
                            <h2>ThreatLens Core API &amp; Agent SDK</h2>
                            <p>Build, customize, and automate security workflows using our open integration platform.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
                                <div className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>🔐 REST API</h3>
                                    <p>Secure endpoints for automation</p>
                                    <p style={{ color: '#00D84A' }}>Used by 94% clients</p>
                                </div>
                                <div className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>⚙️ Agent SDK</h3>
                                    <p>Create custom sensors</p>
                                    <p style={{ color: '#00D84A' }}>Python / Rust / Go support</p>
                                </div>
                                <div className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3>📦 Webhooks</h3>
                                    <p>Ingest IOCs and alerts</p>
                                    <p style={{ color: '#00D84A' }}>Real-time enrichment</p>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                <button style={{ background: '#0096FF', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '0 10px' }}>Download API Docs</button>
                                <button style={{ background: '#00D84A', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '0 10px' }}>View SDK on GitHub</button>
                            </div>
                        </div>
                    </div>

                    {/* */}
                   <div className={currentSceneIndex === 14 ? 'scene active' : 'scene'} id="scene15">
                        <div className="scene-content">
                            <h2>Low-Code SOC Automation &amp; SOAR Playbooks</h2>
                            <div style={{ background: 'rgba(0, 150, 255, 0.1)', border: '1px solid #0096FF', padding: '25px', borderRadius: '15px', margin: '20px 0' }}>
                                <h3 style={{ color: '#0096FF' }}>🎯 Accelerate Response. Eliminate Noise.</h3>
                                <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                                    <li>🛡️ Isolate endpoint via CrowdStrike API</li>
                                    <li>📢 Notify Slack &amp; create Jira ticket</li>
                                    <li>🔐 Auto-block S3 bucket via AWS Lambda</li>
                                    <li>📈 Visual Playbook Builder with triggers and outcomes</li>
                                </ul>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                <button style={{ background: '#0096FF', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '0 10px' }}>View Sample Playbook</button>
                                <button style={{ background: '#00D84A', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '0 10px' }}>Launch SOAR Simulator</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard