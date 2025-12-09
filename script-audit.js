// Invisible Audit - Audit Page with ALL Working Buttons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Current step tracking
    let currentStep = 1;
    let selectedAuditor = 'zama';
    let walletConnected = false;
    let walletAddress = '';

    // DOM Elements
    const steps = document.querySelectorAll('.audit-section');
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletText = document.getElementById('walletText');

    // Step Navigation Elements
    const nextStep1Btn = document.getElementById('nextStep1Btn');
    const nextStep2Btn = document.getElementById('nextStep2Btn');
    const backStep1Btn = document.getElementById('backStep1Btn');
    const backStep2Btn = document.getElementById('backStep2Btn');
    const submitAuditBtn = document.getElementById('submitAuditBtn');

    // Form Elements
    const resetFormBtn = document.getElementById('resetFormBtn');
    const formatJsonBtn = document.getElementById('formatJsonBtn');
    const editContractBtn = document.getElementById('editContractBtn');
    const editPrivacyBtn = document.getElementById('editPrivacyBtn');
    const editAuditorBtn = document.getElementById('editAuditorBtn');
    const copyEncryptedBtn = document.getElementById('copyEncryptedBtn');

    // Results Elements
    const decryptResultsBtn = document.getElementById('decryptResultsBtn');
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    const mintBadgeBtn = document.getElementById('mintBadgeBtn');
    const newAuditBtn = document.getElementById('newAuditBtn');

    // Input Sliders
    const feeRateSlider = document.getElementById('feeRateSlider');
    const feeRateInput = document.getElementById('feeRate');
    const leverageSlider = document.getElementById('leverageSlider');
    const leverageInput = document.getElementById('maxLeverage');
    const delaySlider = document.getElementById('delaySlider');
    const delayInput = document.getElementById('oracleDelay');
    const depthSlider = document.getElementById('depthSlider');
    const depthInput = document.getElementById('poolDepth');

    // Auditor Selection
    const auditorSelectBtns = document.querySelectorAll('.auditor-select-btn');
    
    // Preview Tabs
    const previewTabs = document.querySelectorAll('.preview-tab');
    const codePreviews = document.querySelectorAll('.code-preview');

    // Mobile Menu Toggle
    menuBtn?.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenuBtn?.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // Wallet Connection
    connectWalletBtn?.addEventListener('click', function() {
        if (!walletConnected) {
            // Simulate wallet connection
            walletAddress = '0x742d35Cc6634C0532925a3b844Bc9eC4C3b5';
            walletConnected = true;
            walletText.textContent = walletAddress.substring(0, 8) + '...' + walletAddress.substring(walletAddress.length - 4);
            this.innerHTML = `<i class="fas fa-check"></i> <span id="walletText">${walletText.textContent}</span>`;
            this.style.background = 'rgba(16, 185, 129, 0.2)';
            this.style.borderColor = 'var(--success)';
            
            showNotification('Wallet connected successfully!', 'success');
        } else {
            // Disconnect wallet
            walletConnected = false;
            walletAddress = '';
            walletText.textContent = 'Connect Wallet';
            this.innerHTML = `<i class="fas fa-wallet"></i> <span id="walletText">Connect Wallet</span>`;
            this.style.background = 'rgba(255, 215, 0, 0.1)';
            this.style.borderColor = 'rgba(255, 215, 0, 0.2)';
            
            showNotification('Wallet disconnected', 'info');
        }
    });

    // Step Navigation Functions
    function showStep(stepNumber) {
        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));
        
        // Show selected step
        document.getElementById(`step${stepNumber}`).classList.add('active');
        
        // Update current step
        currentStep = stepNumber;
        
        // Scroll to top of step
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update step indicator
        updateStepIndicator();
        
        // Update review data if on step 3
        if (stepNumber === 3) {
            updateReviewData();
        }
    }

    function updateStepIndicator() {
        const steps = document.querySelectorAll('.step-indicator .step');
        const lines = document.querySelectorAll('.step-line');
        
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < currentStep) {
                step.classList.add('completed');
                step.innerHTML = '✓';
            } else if (index + 1 === currentStep) {
                step.classList.add('active');
            }
        });
        
        lines.forEach((line, index) => {
            line.classList.remove('active');
            if (index + 1 < currentStep) {
                line.classList.add('active');
            }
        });
    }

    // Step Navigation Event Listeners
    nextStep1Btn?.addEventListener('click', () => {
        if (validateStep1()) {
            showStep(2);
        }
    });

    nextStep2Btn?.addEventListener('click', () => {
        if (validateStep2()) {
            showStep(3);
        }
    });

    backStep1Btn?.addEventListener('click', () => showStep(1));
    backStep2Btn?.addEventListener('click', () => showStep(2));

    editContractBtn?.addEventListener('click', () => showStep(1));
    editPrivacyBtn?.addEventListener('click', () => showStep(2));
    editAuditorBtn?.addEventListener('click', () => showStep(2));

    // Submit Audit
    submitAuditBtn?.addEventListener('click', function() {
        if (!walletConnected) {
            showNotification('Please connect your wallet first!', 'warning');
            return;
        }

        const contractName = document.getElementById('contractName').value;
        if (!contractName.trim()) {
            showNotification('Please enter a contract name', 'warning');
            return;
        }

        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        this.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            showStep(4);
            this.innerHTML = originalText;
            this.disabled = false;
            
            // Start processing simulation
            simulateProcessing();
        }, 1500);
    });

    // Form Validation Functions
    function validateStep1() {
        const contractName = document.getElementById('contractName').value;
        if (!contractName.trim()) {
            showNotification('Please enter a contract name', 'warning');
            return false;
        }
        return true;
    }

    function validateStep2() {
        if (!selectedAuditor) {
            showNotification('Please select an auditor', 'warning');
            return false;
        }
        return true;
    }

    // Form Reset
    resetFormBtn?.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
            // Reset form fields
            document.getElementById('contractName').value = 'My AMM Contract';
            document.getElementById('contractType').value = 'amm';
            document.getElementById('contractAddress').value = '';
            document.getElementById('network').value = 'ethereum';
            document.getElementById('feeRate').value = '30';
            document.getElementById('feeRateSlider').value = '30';
            document.getElementById('maxLeverage').value = '10';
            document.getElementById('leverageSlider').value = '10';
            document.getElementById('oracleDelay').value = '45';
            document.getElementById('delaySlider').value = '45';
            document.getElementById('poolDepth').value = '120000';
            document.getElementById('depthSlider').value = '120000';
            document.getElementById('additionalParams').value = `{
  "slippageTolerance": 50,
  "maxPositionSize": 10000,
  "withdrawalDelay": 3600,
  "emergencyPause": true,
  "governanceDelay": 86400
}`;
            
            // Reset privacy settings
            document.getElementById('hideLogic').checked = true;
            document.getElementById('hideRules').checked = true;
            document.getElementById('anonymousAudit').checked = true;
            document.getElementById('e2eEncryption').checked = true;
            
            // Reset auditor selection
            selectedAuditor = 'zama';
            auditorSelectBtns.forEach(btn => {
                if (btn.dataset.auditor === 'zama') {
                    btn.classList.add('selected');
                    btn.innerHTML = '<i class="fas fa-check"></i> Selected';
                } else {
                    btn.classList.remove('selected');
                    btn.innerHTML = '<i class="fas fa-check"></i> Select';
                }
            });
            
            showNotification('Form reset successfully', 'success');
        }
    });

    // Format JSON Button
    formatJsonBtn?.addEventListener('click', function() {
        const textarea = document.getElementById('additionalParams');
        try {
            const json = JSON.parse(textarea.value);
            textarea.value = JSON.stringify(json, null, 2);
            showNotification('JSON formatted successfully', 'success');
        } catch (error) {
            showNotification('Invalid JSON format', 'error');
        }
    });

    // Input Slider Synchronization
    function syncSliderInput(slider, input) {
        slider.addEventListener('input', () => {
            input.value = slider.value;
        });
        
        input.addEventListener('input', () => {
            slider.value = input.value;
        });
    }

    // Initialize slider sync
    if (feeRateSlider && feeRateInput) syncSliderInput(feeRateSlider, feeRateInput);
    if (leverageSlider && leverageInput) syncSliderInput(leverageSlider, leverageInput);
    if (delaySlider && delayInput) syncSliderInput(delaySlider, delayInput);
    if (depthSlider && depthInput) syncSliderInput(depthSlider, depthInput);

    // Auditor Selection
    auditorSelectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selected class from all buttons
            auditorSelectBtns.forEach(b => {
                b.classList.remove('selected');
                b.innerHTML = '<i class="fas fa-check"></i> Select';
            });
            
            // Add selected class to clicked button
            this.classList.add('selected');
            this.innerHTML = '<i class="fas fa-check"></i> Selected';
            
            // Update selected auditor
            selectedAuditor = this.dataset.auditor;
            
            // Update auditor card styles
            document.querySelectorAll('.auditor-card').forEach(card => {
                card.classList.remove('selected');
            });
            this.closest('.auditor-card').classList.add('selected');
            
            showNotification(`Selected ${this.closest('.auditor-card').querySelector('h4').textContent}`, 'success');
        });
    });

    // Preview Tabs
    previewTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Update active tab
            previewTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding preview
            codePreviews.forEach(preview => {
                preview.classList.remove('active');
                if (preview.id === `${tabName}Preview`) {
                    preview.classList.add('active');
                }
            });
        });
    });

    // Copy Encrypted Data
    copyEncryptedBtn?.addEventListener('click', function() {
        const activePreview = document.querySelector('.code-preview.active');
        if (activePreview) {
            navigator.clipboard.writeText(activePreview.textContent)
                .then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    showNotification('Copied to clipboard!', 'success');
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                })
                .catch(() => {
                    showNotification('Failed to copy', 'error');
                });
        }
    });

    // Update Review Data
    function updateReviewData() {
        // Contract details
        document.getElementById('reviewName').textContent = 
            document.getElementById('contractName').value || 'My AMM Contract';
        document.getElementById('reviewType').textContent = 
            document.getElementById('contractType').options[document.getElementById('contractType').selectedIndex].text;
        document.getElementById('reviewNetwork').textContent = 
            document.getElementById('network').options[document.getElementById('network').selectedIndex].text;
        document.getElementById('reviewFee').textContent = 
            document.getElementById('feeRate').value + ' bps';
        document.getElementById('reviewLeverage').textContent = 
            document.getElementById('maxLeverage').value + 'x';
        
        // Auditor details
        const selectedAuditorCard = document.querySelector('.auditor-card.selected');
        if (selectedAuditorCard) {
            document.getElementById('reviewAuditor').textContent = 
                selectedAuditorCard.querySelector('h4').textContent;
        }
    }

    // Simulate Processing
    function simulateProcessing() {
        const logContainer = document.getElementById('auditLog');
        const steps = document.querySelectorAll('.processing-steps .process-step');
        
        // Clear existing log entries (except first 3)
        const existingLogs = logContainer.querySelectorAll('.log-entry');
        if (existingLogs.length > 3) {
            for (let i = 3; i < existingLogs.length; i++) {
                existingLogs[i].remove();
            }
        }
        
        // Step 3: Running Analysis (already active)
        setTimeout(() => {
            // Update step 3 to completed
            steps[2].classList.remove('active');
            steps[2].classList.add('completed');
            steps[2].querySelector('.step-check').innerHTML = '<i class="fas fa-check"></i>';
            
            // Activate step 4
            steps[3].classList.add('active');
            
            // Add log entry
            addLogEntry('Running encrypted mathematical analysis...', 'info');
        }, 3000);
        
        setTimeout(() => {
            // Add log entry
            addLogEntry('✓ Mathematical analysis completed', 'success');
            
            // Update step 4 to completed
            steps[3].classList.remove('active');
            steps[3].classList.add('completed');
            steps[3].querySelector('.step-check').innerHTML = '<i class="fas fa-check"></i>';
            
            // Add final log entry
            addLogEntry('✓ Audit completed successfully!', 'success');
            
            // Show results after delay
            setTimeout(() => {
                showStep(5);
                showNotification('Audit completed! Results are ready.', 'success');
            }, 1000);
        }, 6000);
    }

    function addLogEntry(message, type) {
        const logContainer = document.getElementById('auditLog');
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
        
        logEntry.innerHTML = `
            <span class="log-time">${time}</span>
            <span class="log-message">${type === 'success' ? '✓' : '⏳'} ${message}</span>
        `;
        
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    // Results Page Buttons
    decryptResultsBtn?.addEventListener('click', function() {
        if (!walletConnected) {
            showNotification('Please connect wallet to decrypt results', 'warning');
            return;
        }
        
        // Simulate decryption
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Decrypting...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            
            // Show decrypted results in a modal
            showDecryptedResults();
        }, 2000);
    });

    downloadReportBtn?.addEventListener('click', function() {
        // Create and download report
        const report = `
            INVISIBLE AUDIT REPORT
            =====================
            
            Contract: ${document.getElementById('reviewName').textContent}
            Security Score: 90/100
            Status: Excellent
            
            VULNERABILITIES FOUND:
            1. Oracle Update Delay (High Priority)
               - Description: 45 seconds exceeds recommended 30s threshold
               - Recommendation: Adjust oracle update to 30s or less
            
            2. Liquidity Depth (Medium Priority)
               - Description: Pool depth below optimal level for high volume
               - Recommendation: Increase pool depth to $100,000 minimum
            
            3. Fee Structure (Low Priority)
               - Description: Consider dynamic fee model for volatility
               - Recommendation: Implement dynamic fees based on volume
            
            AUDITOR: Zama Security
            DATE: ${new Date().toLocaleDateString()}
            
            ---
            This report was generated using FHE technology.
            No sensitive data was exposed during audit.
        `;
        
        const blob = new Blob([report], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'audit-report.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification('Report downloaded successfully', 'success');
    });

    mintBadgeBtn?.addEventListener('click', function() {
        if (!walletConnected) {
            showNotification('Please connect wallet to mint badge', 'warning');
            return;
        }
        
        // Simulate badge minting
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Minting...';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            
            // Generate random token ID
            const tokenId = 'BADGE-' + Date.now().toString(36).toUpperCase();
            
            showNotification(`Audit badge minted! Token ID: ${tokenId}`, 'success');
            
            // Update button
            this.innerHTML = '<i class="fas fa-check"></i> Badge Minted!';
            this.disabled = true;
            this.style.background = 'var(--success)';
        }, 3000);
    });

    newAuditBtn?.addEventListener('click', () => {
        showStep(1);
        showNotification('Starting new audit...', 'info');
    });

    // Show Decrypted Results Modal
    function showDecryptedResults() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-key"></i> Decrypted Results</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="result-summary">
                        <div class="score-display">
                            <div class="score-value">90/100</div>
                            <div class="score-label">Security Score</div>
                        </div>
                        <div class="result-details">
                            <h4>Detailed Findings:</h4>
                            <ul>
                                <li><strong>Oracle Update Delay:</strong> 45s (recommended: 30s)</li>
                                <li><strong>Liquidity Depth:</strong> $120,000 (minimum recommended: $100,000)</li>
                                <li><strong>Fee Structure:</strong> Static 30 bps (consider dynamic model)</li>
                            </ul>
                        </div>
                    </div>
                    <div class="recommendations">
                        <h4><i class="fas fa-lightbulb"></i> Recommendations:</h4>
                        <ol>
                            <li>Reduce oracle update delay to 30 seconds</li>
                            <li>Increase pool depth to $100,000 minimum</li>
                            <li>Consider implementing dynamic fee model</li>
                        </ol>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" id="closeModalBtn">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                z-index: 4000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal-content {
                background: var(--dark);
                border: 1px solid var(--primary);
                border-radius: var(--border-radius-lg);
                width: 90%;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(255, 215, 0, 0.1);
            }
            
            .modal-header h3 {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--white);
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--light-gray);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 5px;
                transition: var(--transition);
            }
            
            .modal-close:hover {
                color: var(--white);
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .result-summary {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .score-display {
                text-align: center;
                padding: 2rem;
                background: rgba(255, 215, 0, 0.1);
                border-radius: var(--border-radius);
                border: 2px solid var(--primary);
            }
            
            .score-value {
                font-size: 3rem;
                font-weight: 800;
                background: var(--gradient-primary);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 0.5rem;
            }
            
            .score-label {
                color: var(--light-gray);
                font-size: 1.1rem;
            }
            
            .result-details h4 {
                color: var(--white);
                margin-bottom: 1rem;
            }
            
            .result-details ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .result-details li {
                padding: 0.5rem 0;
                color: var(--light-gray);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .result-details li:last-child {
                border-bottom: none;
            }
            
            .recommendations h4 {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--white);
                margin-bottom: 1rem;
            }
            
            .recommendations ol {
                padding-left: 1.5rem;
                color: var(--light-gray);
            }
            
            .recommendations li {
                padding: 0.5rem 0;
            }
            
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                text-align: right;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const closeModalBtn = modal.querySelector('#closeModalBtn');
        
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                modal.remove();
                style.remove();
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeModal);
        closeModalBtn.addEventListener('click', closeModal);
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Add fadeOut animation
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        
        notification.innerHTML = `
            <i class="fas fa-${icons[type]}"></i>
            <div class="notification-content">
                <div class="notification-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Add slideOut animation
        if (!document.querySelector('#notificationAnimations')) {
            const style = document.createElement('style');
            style.id = 'notificationAnimations';
            style.textContent = `
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(400px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize form with default values
    updateReviewData();
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, .auditor-card, .setting-card, .review-card, .result-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'var(--transition)';
        });
    });

    // Add real-time updates to the process steps
    setInterval(() => {
        if (currentStep === 4) {
            const processSteps = document.querySelectorAll('.processing-steps .process-step');
            const activeStep = document.querySelector('.processing-steps .process-step.active');
            if (activeStep) {
                const checkIcon = activeStep.querySelector('.step-check i');
                if (checkIcon && checkIcon.classList.contains('fa-spin')) {
                    // Add subtle pulse animation
                    activeStep.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.1)';
                    setTimeout(() => {
                        activeStep.style.boxShadow = 'none';
                    }, 500);
                }
            }
        }
    }, 1000);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl + Enter to submit current step
        if (e.ctrlKey && e.key === 'Enter') {
            if (currentStep === 1) {
                nextStep1Btn?.click();
            } else if (currentStep === 2) {
                nextStep2Btn?.click();
            } else if (currentStep === 3) {
                submitAuditBtn?.click();
            }
        }
        
        // Escape to close modals/mobile menu
        if (e.key === 'Escape') {
            mobileMenu.classList.remove('active');
            const modal = document.querySelector('.modal');
            if (modal) {
                modal.querySelector('.modal-close')?.click();
            }
        }
    });

    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to Invisible Audit! Submit your contract for privacy-preserving analysis.', 'info');
    }, 1000);
});
