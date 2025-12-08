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
                    <p><
