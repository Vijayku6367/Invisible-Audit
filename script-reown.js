// Dashboard Animations & Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuBtn?.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu?.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // Animate stats
    function animateStats() {
        const stats = [
            { id: 'total-audits', target: 247, duration: 2000 },
            { id: 'secured-value', target: 42.8, duration: 2000 },
            { id: 'avg-score', target: 94.7, duration: 2000 }
        ];

        stats.forEach(stat => {
            const element = document.getElementById(stat.id);
            if (!element) return;

            const start = 0;
            const end = stat.target;
            const duration = stat.duration;
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                
                let value;
                if (stat.id === 'secured-value') {
                    value = start + (end - start) * easeOutQuart;
                    element.textContent = `$${value.toFixed(1)}M`;
                } else if (stat.id === 'avg-score') {
                    value = start + (end - start) * easeOutQuart;
                    element.textContent = value.toFixed(1);
                } else {
                    value = Math.floor(start + (end - start) * easeOutQuart);
                    element.textContent = value.toLocaleString();
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                }
            }

            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(updateCount);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(element);
        });
    }

    // Draw sparkline chart
    function drawSparkline() {
        const sparkline = document.querySelector('.sparkline-chart');
        if (!sparkline) return;

        const data = [30, 45, 35, 55, 40, 60, 50, 70, 65, 85, 75, 90];
        const width = sparkline.offsetWidth;
        const height = sparkline.offsetHeight;
        
        // Create SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        
        // Draw line
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - (value / 100) * height;
            return `${x},${y}`;
        }).join(' ');
        
        path.setAttribute('d', `M ${points}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#FFD700');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        
        // Add gradient
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'sparkline-gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#FFD700');
        stop1.setAttribute('stop-opacity', '0.8');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#FFD700');
        stop2.setAttribute('stop-opacity', '0');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        
        // Create area
        const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const areaPoints = `${points} ${width},${height} 0,${height}`;
        area.setAttribute('d', `M ${areaPoints}`);
        area.setAttribute('fill', 'url(#sparkline-gradient)');
        
        svg.appendChild(gradient);
        svg.appendChild(area);
        svg.appendChild(path);
        
        sparkline.appendChild(svg);
    }

    // Draw donut chart
    function drawDonutChart() {
        const donut = document.querySelector('.donut-chart svg');
        if (!donut) return;

        const data = [
            { value: 78, color: '#FFD700' },
            { value: 15, color: '#FFA000' },
            { value: 7, color: '#FF5722' }
        ];

        const radius = 50;
        const circumference = 2 * Math.PI * radius;
        let offset = 0;

        data.forEach(item => {
            const dashLength = (item.value / 100) * circumference;
            const gapLength = circumference - dashLength;
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '60');
            circle.setAttribute('cy', '60');
            circle.setAttribute('r', radius);
            circle.setAttribute('stroke', item.color);
            circle.setAttribute('stroke-width', '8');
            circle.setAttribute('fill', 'none');
            circle.setAttribute('stroke-dasharray', `${dashLength} ${gapLength}`);
            circle.setAttribute('stroke-dashoffset', offset);
            circle.setAttribute('transform', 'rotate(-90 60 60)');
            
            donut.appendChild(circle);
            offset += dashLength;
        });

        // Animate the chart
        const circles = donut.querySelectorAll('circle');
        circles.forEach(circle => {
            const length = circle.getTotalLength();
            circle.style.strokeDasharray = length;
            circle.style.strokeDashoffset = length;
            
            setTimeout(() => {
                circle.style.transition = 'stroke-dashoffset 2s ease-in-out';
                circle.style.strokeDashoffset = circle.getAttribute('stroke-dashoffset');
            }, 500);
        });
    }

    // Draw speed chart
    function drawSpeedChart() {
        const speedChart = document.querySelector('.speed-chart');
        if (!speedChart) return;

        const data = [2.8, 2.5, 2.3, 2.1, 2.0, 1.9, 2.2, 2.4];
        const width = speedChart.offsetWidth;
        const height = speedChart.offsetHeight;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        
        const maxValue = Math.max(...data);
        const barWidth = width / data.length - 4;
        
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * (height - 20);
            const x = index * (barWidth + 4);
            const y = height - barHeight;
            
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y + barHeight);
            rect.setAttribute('width', barWidth);
            rect.setAttribute('height', 0);
            rect.setAttribute('fill', '#FFD700');
            rect.setAttribute('rx', '2');
            
            svg.appendChild(rect);
            
            // Animate bar
            setTimeout(() => {
                rect.setAttribute('y', y);
                rect.setAttribute('height', barHeight);
                rect.style.transition = 'all 0.8s ease-out';
            }, index * 100);
        });
        
        speedChart.appendChild(svg);
    }

    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.classList.contains('view') ? 'view' :
                        this.classList.contains('download') ? 'download' : 'badge';
            
            const messages = {
                view: 'Opening audit details...',
                download: 'Downloading report...',
                badge: 'Minting audit badge...'
            };
            
            showNotification(messages[type], 'info');
        });
    });

    // Full action buttons
    const fullActionButtons = document.querySelectorAll('.action-btn-full');
    fullActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            showNotification(`${action} initiated...`, 'info');
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto remove
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

    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--dark);
            border: 1px solid rgba(255, 215, 0, 0.2);
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
            border-left: 4px solid var(--success);
        }
        
        .notification-warning {
            border-left: 4px solid var(--warning);
        }
        
        .notification-error {
            border-left: 4px solid var(--danger);
        }
        
        .notification-info {
            border-left: 4px solid var(--primary);
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification-success i { color: var(--success); }
        .notification-warning i { color: var(--warning); }
        .notification-error i { color: var(--danger); }
        .notification-info i { color: var(--primary); }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--light-gray);
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

    // Initialize everything
    animateStats();
    drawSparkline();
    drawDonutChart();
    drawSpeedChart();

    // Add hover effects to cards
    const cards = document.querySelectorAll('.risk-card, .analytics-card, .action-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Simulate real-time updates
    setInterval(() => {
        const liveBadge = document.querySelector('.live-badge .pulse');
        if (liveBadge) {
            liveBadge.style.animation = 'none';
            setTimeout(() => {
                liveBadge.style.animation = 'pulse 2s infinite';
            }, 10);
        }
        
        // Randomly update activity feed
        if (Math.random() > 0.7) {
            const activities = [
                'New audit submitted',
                'Risk score updated',
                'Vulnerability detected',
                'Audit completed'
            ];
            
            const activity = activities[Math.floor(Math.random() * activities.length)];
            showNotification(`Live Update: ${activity}`, 'info');
        }
    }, 10000);
});
