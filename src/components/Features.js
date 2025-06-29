import React from 'react'

function Features() {
  return (
     <section className="features" id="features">
        <div className="container">
            <h2 className="section-title">Built for Security Teams</h2>
            
            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Multi-Format Analysis</h3>
                    <p>Submit files, URLs, IP addresses, domain names, or hashes for analysis. See detailed threat reports with IoCs, behavior analysis, and risk scoring.</p>
                </div>
                
                <div className="feature-card">
                    <div className="feature-icon">🧠</div>
                    <h3>Smart Detection Engine</h3>
                    <p>Get accurate malware family identification, anomaly detection, and threat classification from AI models trained on millions of samples.</p>
                </div>
                
                <div className="feature-card">
                    <div className="feature-icon">🛡️</div>
                    <h3>Threat Context</h3>
                    <p>Act on automated reports that explain the significance of the compromised infrastructure, the exploitation impact, potential financial losses, and compliance risks.</p>
                </div>
                
                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Compliance Tracking</h3>
                    <p>See how your infrastructure meets GDPR, HIPAA, SOC2 Type II, and PCI DSS 4.0 requirements. Get actionable recommendations to address compliance gaps.</p>
                </div>
                
                <div className="feature-card">
                    <div className="feature-icon">🔐</div>
                    <h3>Out-of-The-Box Integrations</h3>
                    <p>Connect your security tools: Splunk, Amazon GuardDuty and AWS Security Hub, CrowdStrike, ServiceNow, Palo Alto, Kubernetes, and 1,200 more.</p>
                </div>
                
                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Developer-First API</h3>
                    <p>Integrate threat analysis into your custom security stack with our RESTful API. Use comprehensive documentation to get up and running in minutes, not months.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features