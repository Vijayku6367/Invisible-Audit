// script-reown.js

document.addEventListener('DOMContentLoaded', function() {
    // AOS Animation
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Mobile Menu
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // View Toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    const badgesGrid = document.getElementById('badgesGrid');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            badgesGrid.className = view === 'grid' ? 'badges-grid' : 'badges-list';
        });
    });

    // Category Filters
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Filter functionality would go here
        });
    });

    // Sort Badges
    const sortSelect = document.getElementById('sortBadges');
    sortSelect.addEventListener('change', (e) => {
        // Sorting functionality would go here
        console.log('Sort by:', e.target.value);
    });

    // Sample Badges Data
    const sampleBadges = [
        {
            id: 1,
            title: "Secure Audit Badge",
            description: "Highest security score certification",
            icon: "shield-alt",
            color: "gold",
            score: 100,
            category: "security",
            tags: ["Security", "Gold", "Verified"],
            date: "2024-01-15"
        },
        {
            id: 2,
            title: "Lending Protocol Badge",
            description: "Complete lending security audit",
            icon: "hand-holding-usd",
            color: "silver",
            score: 95,
            category: "lending",
            tags: ["Lending", "Silver", "Verified"],
            date: "2024-01-14"
        },
        {
            id: 3,
            title: "Bridge Security Badge",
            description: "Cross-chain bridge certification",
            icon: "bridge",
            color: "bronze",
            score: 92,
            category: "bridge",
            tags: ["Bridge", "Bronze", "Verified"],
            date: "2024-01-13"
        }
    ];

    // Load Badges
    function loadBadges() {
        badgesGrid.innerHTML = '';
        
        sampleBadges.forEach(badge => {
            const badgeCard = document.createElement('div');
            badgeCard.className = 'badge-card';
            badgeCard.setAttribute('data-aos', 'zoom-in');
            
            badgeCard.innerHTML = `
                <div class="badge-header">
                    <div class="badge-icon ${badge.color}">
                        <i class="fas fa-${badge.icon}"></i>
                    </div>
                    <div class="badge-actions">
                        <button class="action-btn view-badge" data-id="${badge.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn share-badge" data-id="${badge.id}">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        <button class="action-btn verify-badge" data-id="${badge.id}">
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </div>
                <h3 class="badge-title">${badge.title}</h3>
                <p class="badge-description">${badge.description}</p>
                <div class="badge-meta">
                    <div class="meta-item">
                        <i class="fas fa-chart-line"></i>
                        <span>Score: ${badge.score}/100</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${badge.date}</span>
                    </div>
                </div>
                <div class="badge-tags">
                    ${badge.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
            
            badgesGrid.appendChild(badgeCard);
        });

        // Add event listeners to badge buttons
        document.querySelectorAll('.view-badge').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                showNotification(`Viewing badge #${id}`, 'info');
            });
        });

        document.querySelectorAll('.share-badge').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                shareBadge(id);
            });
        });

        document.querySelectorAll('.verify-badge').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                verifyBadge(id);
            });
        });
    }

    // Wallet Connection
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletText = document.getElementById('walletText');

    connectWalletBtn.addEventListener('click', async () => {
        try {
            // Simulate wallet connection
            walletText.textContent = 'Connecting...';
            
            setTimeout(() => {
                walletText.textContent = '0x1234...5678';
                showNotification('Wallet connected successfully!', 'success');
                
                // Update UI for connected state
                connectWalletBtn.classList.add('connected');
                document.getElementById('connectWarning').style.display = 'none';
            }, 1000);
        } catch (error) {
            walletText.textContent = 'Connect Wallet';
            showNotification('Failed to connect wallet', 'error');
        }
    });

    // Badge Actions
    const mintNewBadgeBtn = document.getElementById('mintNewBadgeBtn');
    const verifyBadgeBtn = document.getElementById('verifyBadgeBtn');
    const startAuditBtn = document.getElementById('startAuditBtn');

    mintNewBadgeBtn.addEventListener('click', () => {
        showNotification('Minting new badge...', 'info');
        // Mint badge functionality would go here
    });

    verifyBadgeBtn.addEventListener('click', () => {
        document.getElementById('verificationModal').classList.add('active');
    });

    startAuditBtn.addEventListener('click', () => {
        window.location.href = 'audit-reown.html';
    });

    // Verification Tabs
    const verificationTabs = document.querySelectorAll('.verification-tab');
    const verificationForms = document.querySelectorAll('.verification-form');

    verificationTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            verificationTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            verificationForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabName}Form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // QR Scan
    const startScanBtn = document.getElementById('startScanBtn');
    startScanBtn.addEventListener('click', () => {
        showNotification('Starting QR scanner...', 'info');
        // QR scanning functionality would go here
    });

    // Modals
    const customizeModal = document.getElementById('customizeModal');
    const verificationModal = document.getElementById('verificationModal');
    const modalCloses = document.querySelectorAll('.modal-close');

    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            customizeModal.classList.remove('active');
            verificationModal.classList.remove('active');
        });
    });

    // Close modals when clicking outside
    [customizeModal, verificationModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Customize Badge Modal
    const customizeBadgeBtn = document.getElementById('customizeBadgeBtn');
    const cancelCustomizeBtn = document.getElementById('cancelCustomizeBtn');
    const saveCustomizeBtn = document.getElementById('saveCustomizeBtn');

    customizeBadgeBtn.addEventListener('click', () => {
        customizeModal.classList.add('active');
    });

    cancelCustomizeBtn.addEventListener('click', () => {
        customizeModal.classList.remove('active');
    });

    saveCustomizeBtn.addEventListener('click', () => {
        customizeModal.classList.remove('active');
        showNotification('Badge design saved!', 'success');
    });

    // Customize Tabs
    const customizeTabs = document.querySelectorAll('.customize-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    customizeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            customizeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabName}Tab`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Color Options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // Icon Options
    const iconOptions = document.querySelectorAll('.icon-option');
    iconOptions.forEach(option => {
        option.addEventListener('click', () => {
            iconOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // Notification System
    function showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--dark);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            min-width: 300px;
            max-width: 400px;
            z-index: 3000;
            animation: slideIn 0.3s ease forwards;
        }
        
        .notification.success {
            border-left: 4px solid var(--secondary);
        }
        
        .notification.error {
            border-left: 4px solid var(--danger);
        }
        
        .notification.info {
            border-left: 4px solid var(--primary);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--gray);
            font-size: 1.25rem;
            margin-left: auto;
            cursor: pointer;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize
    loadBadges();

    // Slider functionality
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function updateSlider() {
        const slideWidth = slides[0].offsetWidth + 32; // including gap
        sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Previous/Next buttons
    document.getElementById('prevSlide').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    });

    document.getElementById('nextSlide').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }, 5000);

    // Paste address button
    document.getElementById('pasteAddressBtn').addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            document.getElementById('badgeAddress').value = text;
            showNotification('Address pasted!', 'success');
        } catch (error) {
            showNotification('Failed to paste address', 'error');
        }
    });

    // Verify address button
    document.getElementById('verifyAddressBtn').addEventListener('click', () => {
        const address = document.getElementById('badgeAddress').value;
        if (address && address.length > 0) {
            document.getElementById('verificationResult').style.display = 'block';
            showNotification('Verification complete!', 'success');
        } else {
            showNotification('Please enter a badge address', 'error');
        }
    });

    // Share result button
    document.getElementById('shareResultBtn').addEventListener('click', async () => {
        try {
            await navigator.share({
                title: 'Audit Badge Verification',
                text: 'Check out this verified audit badge!',
                url: window.location.href
            });
            showNotification('Result shared successfully!', 'success');
        } catch (error) {
            showNotification('Failed to share result', 'error');
        }
    });

    // Helper functions
    function shareBadge(id) {
        const badge = sampleBadges.find(b => b.id == id);
        if (badge) {
            navigator.clipboard.writeText(`Check out my ${badge.title} badge!`);
            showNotification('Badge link copied to clipboard!', 'success');
        }
    }

    function verifyBadge(id) {
        const badge = sampleBadges.find(b => b.id == id);
        if (badge) {
            showNotification(`Verifying ${badge.title}...`, 'info');
            setTimeout(() => {
                showNotification(`${badge.title} verified successfully!`, 'success');
            }, 1500);
        }
    }
});
