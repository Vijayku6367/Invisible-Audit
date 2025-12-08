// Demo Simulation for Invisible Audit Layer
// This is a mock simulation for Userland mobile compatibility
// Actual FHEVM integration code is in integration/ folder (commented out)

class DemoAuditSystem {
    constructor() {
        this.audits = [];
        this.encryptionEnabled = true;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadDemoData();
        this.updateUI();
    }

    bindEvents() {
        // Mobile menu
        document.querySelector('.mobile-menu-btn')?.addEventListener('click', () => {
            document.querySelector('.mobile-nav-overlay').style.display = 'block';
        });

        document.querySelector('.close-mobile-nav')?.addEventListener('click', () => {
            document.querySelector('.mobile-nav-overlay').style.display = 'none';
        });

        // Connect wallet button
        document.querySelector('.connect-wallet-btn')?.addEventListener('click', () => {
            this.simulateWalletConnect();
        });

        // Close mobile nav on link click
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                document.querySelector('.mobile-nav-overlay').style.display = 'none';
            });
        });
    }

    simulateWalletConnect() {
        const btn = document.querySelector('.connect-wallet-btn');
        if (btn.textContent.includes('Connect')) {
            btn.innerHTML = '<i class="fas fa-check"></i> 0x742d...C3b5';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            this.currentUser = '0x742d35Cc6634C0532925a3b844Bc9eC4C3b5';
            
            // Show success notification
            this.showNotification('Wallet connected successfully!', 'success');
        } else {
            btn.innerHTML = '<i class="fas fa-plug"></i> Connect Wallet';
            btn.style.background = 'linear-gradient(135deg, var(--primary), var(--primary-dark))';
            this.currentUser = null;
        }
    }

    encryptData(data) {
        // Mock encryption for demo
        return {
            ciphertext: btoa(JSON.stringify(data)),
            nonce: '0x' + Array(32).fill(0).map(() => 
                Math.floor(Math.random() * 16).toString(16)).join(''),
            publicKey: '0x' + Array(64).fill(0).map(() => 
                Math.floor(Math.random() * 16).toString(16)).join('')
        };
    }

    decryptData(encryptedData) {
        // Mock decryption for demo
        try {
            return JSON.parse(atob(encryptedData.ciphertext));
        } catch {
            return { error: 'Decryption failed' };
        }
    }

    simulateAudit(contractConfig) {
        // Mock audit simulation
        const encryptedInput = this.encryptData(contractConfig);
        
        // Simulate FHE computation
        const riskScore = this.calculateRiskScore(contractConfig);
        const vulnerabilities = this.detectVulnerabilities(contractConfig);
        
        const auditResult = {
            riskScore: riskScore,
            vulnerabilities: vulnerabilities,
            timestamp: Date.now(),
            auditor: 'Zama Security',
            encryptedScore: this.encryptData({ score: riskScore, vulnerabilities })
        };
        
        this.audits.push(auditResult);
        return auditResult;
    }

    calculateRiskScore(config) {
        // Mock risk scoring algorithm
        let score = 0;
        
        if (config.feeRate < 5 || config.feeRate > 50) score += 25;
        if (config.maxLeverage > 20) score += 30;
        if (config.oracleUpdateDelay > 30) score += 20;
        if (config.poolDepth < 50000) score += 25;
        
        return Math.min(score, 100);
    }

    detectVulnerabilities(config) {
        const vulnerabilities = [];
        
        if (config.feeRate < 1) vulnerabilities.push('Fee too low for sustainability');
        if (config.feeRate > 50) vulnerabilities.push('Fee too high for competitiveness');
        if (config.maxLeverage > 100) vulnerabilities.push('Excessive leverage risk');
        if (config.oracleUpdateDelay > 60) vulnerabilities.push('Oracle latency risk');
        if (config.poolDepth < 10000) vulnerabilities.push('Liquidity risk detected');
        
        return vulnerabilities.length > 0 ? vulnerabilities : ['No critical vulnerabilities found'];
    }

    loadDemoData() {
        // Load demo audits
        this.audits = [
            {
                id: 1,
                contractName: 'Uniswap V4 Pool',
                riskScore: 15,
                vulnerabilities: ['No critical issues'],
                timestamp: Date.now() - 86400000,
                encryptedScore: { ciphertext: 'encrypted_data_1' }
            },
            {
                id: 2,
                contractName: 'AAVE Lending Pool',
                riskScore: 28,
                vulnerabilities: ['Oracle update delay > 30s'],
                timestamp: Date.now() - 172800000,
                encryptedScore: { ciphertext: 'encrypted_data_2' }
            }
        ];
    }

    updateUI() {
        // Update stats on dashboard page
        if (document.querySelector('.dashboard-stats')) {
            this.updateDashboardStats();
        }
        
        // Update audit history
        if (document.querySelector('.audit-history')) {
            this.updateAuditHistory();
        }
    }

    updateDashboardStats() {
        const totalAudits = this.audits.length;
        const avgScore = this.audits.reduce((sum, audit) => sum + audit.riskScore, 0) / totalAudits || 0;
        
        document.querySelector('.total-audits').textContent = totalAudits;
        document.querySelector('.avg-score').textContent = avgScore.toFixed(1);
        document.querySelector('.high-risk').textContent = 
            this.audits.filter(a => a.riskScore > 50).length;
    }

    updateAuditHistory() {
        const container = document.querySelector('.audit-history');
        if (!container) return;
        
        container.innerHTML = this.audits.map(audit => `
            <div class="audit-card">
                <div class="audit-header">
                    <h3>${audit.contractName}</h3>
                    <span class="risk-badge risk-${audit.riskScore < 30 ? 'low' : audit.riskScore < 70 ? 'medium' : 'high'}">
                        Risk: ${audit.riskScore}/100
                    </span>
                </div>
                <div class="audit-details">
                    <p><strong>Vulnerabilities:</strong> ${audit.vulnerabilities.join(', ')}</p>
                    <p><strong>Auditor:</strong> ${audit.auditor || 'Zama Security'}</p>
                    <p><strong>Date:</strong> ${new Date(audit.timestamp).toLocaleDateString()}</p>
                </div>
                <div class="audit-actions">
                    <button class="btn-small" onclick="demoSystem.viewAuditDetails(${audit.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn-small btn-secondary" onclick="demoSystem.mintBadge(${audit.id})">
                        <i class="fas fa-award"></i> Mint Badge
                    </button>
                </div>
            </div>
        `).join('');
    }

    viewAuditDetails(auditId) {
        const audit = this.audits.find(a => a.id === auditId);
        if (!audit) return;
        
        // In a real app, this would show encrypted details
        this.showNotification(`Viewing audit #${auditId}. Score: ${audit.riskScore}`, 'info');
    }

    mintBadge(auditId) {
        if (!this.currentUser) {
            this.showNotification('Please connect wallet first!', 'warning');
            return;
        }
        
        const audit = this.audits.find(a => a.id === auditId);
        if (!audit) return;
        
        // Simulate badge minting
        this.showNotification(`Audit badge minted for ${audit.contractName}!`, 'success');
        
        // Update UI
        const badges = JSON.parse(localStorage.getItem('auditBadges') || '[]');
        badges.push({
            auditId: auditId,
            contractName: audit.contractName,
            score: audit.riskScore,
            mintedAt: Date.now(),
            tokenId: 'BADGE-' + Date.now()
        });
        localStorage.setItem('auditBadges', JSON.stringify(badges));
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// Initialize demo system
const demoSystem = new DemoAuditSystem();

// Add notification styles
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 3000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left: 4px solid #10b981;
}

.notification-warning {
    border-left: 4px solid #f59e0b;
}

.notification-error {
    border-left: 4px solid #ef4444;
}

.notification-info {
    border-left: 4px solid var(--primary);
}

.notification i {
    font-size: 1.2rem;
}

.notification-success i { color: #10b981; }
.notification-warning i { color: #f59e0b; }
.notification-error i { color: #ef4444; }
.notification-info i { color: var(--primary); }

.notification-close {
    background: none;
    border: none;
    color: var(--gray);
    cursor: pointer;
    padding: 5px;
    margin-left: auto;
}

@media (max-width: 768px) {
    .notification {
        left: 20px;
        right: 20px;
        max-width: none;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);