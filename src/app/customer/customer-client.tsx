'use client';

import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

// Data hardcoded
const attentionBoostData = {
    ugc: [
        { trend: 'up', rank: 1, category: 'Lifestyle & Tech', sentiment: { pos: 70, neu: 20, neg: 10 }, history: [3, 2, 2, 1] },
        { trend: 'down', rank: 2, category: 'Gaming & Comedy', sentiment: { pos: 60, neu: 30, neg: 10 }, history: [1, 1, 1, 2] },
        { trend: 'up', rank: 3, category: 'Food & Travel', sentiment: { pos: 85, neu: 10, neg: 5 }, history: [5, 4, 4, 3] },
        { trend: 'neutral', rank: 4, category: 'Beauty & Fashion', sentiment: { pos: 50, neu: 40, neg: 10 }, history: [4, 4, 4, 4] },
    ],
    clipper: [
        { trend: 'up', rank: 1, category: 'Gaming Montages', sentiment: { pos: 90, neu: 5, neg: 5 }, history: [2, 2, 1, 1] },
        { trend: 'up', rank: 2, category: 'Podcast Clips', sentiment: { pos: 65, neu: 25, neg: 10 }, history: [4, 3, 3, 2] },
        { trend: 'down', rank: 3, category: 'Educational Shorts', sentiment: { pos: 55, neu: 35, neg: 10 }, history: [1, 2, 2, 3] },
    ]
};

const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m18 11-6-6-6 6" /></svg>;
    if (trend === 'down') return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m18 13-6 6-6-6" /></svg>;
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12" /></svg>;
};


export default function CustomerPageClient() {
    const [activeAttentionTab, setActiveAttentionTab] = useState('ugc');
    const [attentionData, setAttentionData] = useState(attentionBoostData.ugc);

    const mainChartRef = useRef<HTMLCanvasElement>(null);
    const chartTooltipRef = useRef<HTMLDivElement>(null);
    const sliderWrapperRef = useRef<HTMLDivElement>(null);
    const sliderDotsRef = useRef<HTMLDivElement>(null);
    const attentionTableBodyRef = useRef<HTMLTableSectionElement>(null);

    // Theme switcher
    useEffect(() => {
        const themeToggleButton = document.getElementById('theme-toggle');
        const body = document.body;
        if (localStorage.getItem('theme') === 'dark' ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
            body.classList.add('dark');
        }
        const handleThemeToggle = () => {
            body.classList.toggle('dark');
            localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
        };
        themeToggleButton?.addEventListener('click', handleThemeToggle);

        return () => {
            themeToggleButton?.removeEventListener('click', handleThemeToggle);
        }
    }, []);

    // AI Trends Chart
    useEffect(() => {
        if (!mainChartRef.current) return;
        const ctx = mainChartRef.current.getContext('2d');
        if (!ctx) return;

        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        const chart = new Chart(mainChartRef.current, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'AI Topic Interest', data: [65, 59, 80, 81, 56, 75, 90],
                    fill: true, backgroundColor: gradient, borderColor: '#3B82F6',
                    pointBackgroundColor: '#fff', pointBorderColor: '#3B82F6',
                    pointHoverRadius: 8, pointHoverBorderWidth: 2, pointRadius: 6,
                    borderWidth: 3,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: false,
                        external: (context) => {
                            const { chart, tooltip } = context;
                            const tooltipEl = chartTooltipRef.current;
                            if (!tooltipEl) return;

                            if (tooltip.opacity === 0) {
                                tooltipEl.style.opacity = '0';
                                return;
                            }

                            if (tooltip.body) {
                                const titleLines = tooltip.title || [];
                                const bodyLines = tooltip.body.map(b => b.lines);
                                let innerHtml = '';
                                titleLines.forEach(title => innerHtml += `<div class="tooltip-title">${title}</div>`);
                                bodyLines.forEach(body => {
                                    const parts = body[0].split(': ');
                                    innerHtml += `<div>${parts[0]}: <strong>${parts[1]}</strong></div>`;
                                });
                                tooltipEl.innerHTML = innerHtml;
                            }

                            const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
                            tooltipEl.style.opacity = '1';
                            tooltipEl.style.left = positionX + tooltip.caretX + 'px';
                            tooltipEl.style.top = positionY + tooltip.caretY + 'px';
                            tooltipEl.style.transform = 'translate(-50%, -120%)';
                        }
                    }
                },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' }, ticks: { color: '#64748B' } },
                    x: { grid: { display: false }, ticks: { color: '#64748B' } }
                }
            }
        });

        return () => chart.destroy();
    }, []);

    // Data Market Slider
    useEffect(() => {
        const sliderContainer = sliderWrapperRef.current?.parentElement;
        if (!sliderContainer || !sliderWrapperRef.current || !sliderDotsRef.current) return;

        const sliderWrapper = sliderWrapperRef.current;
        const sliderDotsContainer = sliderDotsRef.current;
        const slides = Array.from(sliderWrapper.children);
        let currentSlideIndex = 0;
        let slideInterval: NodeJS.Timeout;

        const goToSlide = (index: number) => {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
            Array.from(sliderDotsContainer.children).forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
            currentSlideIndex = index;
        };

        const nextSlide = () => goToSlide(currentSlideIndex + 1);
        const startSlider = () => { slideInterval = setInterval(nextSlide, 8000); };
        const stopSlider = () => clearInterval(slideInterval);
        const resetInterval = () => { stopSlider(); startSlider(); };

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => { goToSlide(index); resetInterval(); });
            sliderDotsContainer.appendChild(dot);
        });

        let isDown = false;
        let startX: number;

        const handleMouseDown = (e: MouseEvent) => { isDown = true; startX = e.pageX; stopSlider(); sliderContainer.classList.add('active'); };
        const handleMouseLeave = () => { if (!isDown) return; isDown = false; sliderContainer.classList.remove('active'); startSlider(); };
        const handleMouseUp = (e: MouseEvent) => {
            if (!isDown) return;
            isDown = false;
            sliderContainer.classList.remove('active');
            if (Math.abs(startX - e.pageX) > 50) { (startX > e.pageX) ? nextSlide() : goToSlide(currentSlideIndex - 1); }
            startSlider();
        };
        const handleMouseMove = (e: MouseEvent) => { if (isDown) e.preventDefault(); };

        sliderContainer.addEventListener('mousedown', handleMouseDown);
        sliderContainer.addEventListener('mouseleave', handleMouseLeave);
        sliderContainer.addEventListener('mouseup', handleMouseUp);
        sliderContainer.addEventListener('mousemove', handleMouseMove);

        startSlider();

        return () => {
            stopSlider();
            sliderContainer.removeEventListener('mousedown', handleMouseDown);
            sliderContainer.removeEventListener('mouseleave', handleMouseLeave);
            sliderContainer.removeEventListener('mouseup', handleMouseUp);
            sliderContainer.removeEventListener('mousemove', handleMouseMove);
            sliderDotsContainer.innerHTML = '';
        };
    }, []);

    // Attention Boost Table
    useEffect(() => {
        const activeSparklines: Chart[] = [];
        const initializeSparkline = (canvas: HTMLCanvasElement, history: number[], trend: string) => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            let lineColor = '#94a3b8'; // Neutral color
            if (trend === 'up') lineColor = '#22c55e';
            if (trend === 'down') lineColor = '#ef4444';

            const sparkline = new Chart(canvas, {
                type: 'line',
                data: {
                    labels: Array(history.length).fill(''),
                    datasets: [{
                        data: history,
                        borderColor: lineColor,
                        borderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                        pointBackgroundColor: lineColor,
                        tension: 0.4,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: { x: { display: false }, y: { display: false, reverse: true } }
                }
            });
            activeSparklines.push(sparkline);
        };

        attentionData.forEach((item, index) => {
            const canvas = document.getElementById(`sparkline-${activeAttentionTab}-${index}`) as HTMLCanvasElement;
            if (canvas) initializeSparkline(canvas, item.history, item.trend);
        });

        return () => {
            activeSparklines.forEach(chart => chart.destroy());
        };
    }, [attentionData, activeAttentionTab]);

    // Fade-in Animation
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('is-visible');
            });
        }, { rootMargin: '0px 0px -100px 0px' });
        document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const handleAttentionTabClick = (type: 'ugc' | 'clipper') => {
        setActiveAttentionTab(type);
        setAttentionData(attentionBoostData[type]);
    };

    return (
        <>
            <main id="customer-homepage" className="main-content">
                {/* AI Trends Section */}
                <section className="fade-in-section">
                    <div className="section-header">
                        <h2>AI Trends</h2>
                        <a href="#" className="see-more-button">See more <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                    </div>
                    <div className="card chart-card">
                        <h3 className="card-title">Social Media Engagement</h3>
                        <p className="card-description">Topic velocity analysis across major platforms.</p>
                        <div className="chart-container">
                            <canvas ref={mainChartRef}></canvas>
                            <div ref={chartTooltipRef} role="tooltip" className="chart-tooltip"></div>
                        </div>
                    </div>
                </section>

                {/* Data Market Slider Section */}
                <section className="fade-in-section">
                    <div className="section-header">
                        <h2>Data Market</h2>
                        <a href="#" className="see-more-button">
                            See more
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </a>
                    </div>
                    <div className="data-slider-container">
                        <div className="data-slider-wrapper" ref={sliderWrapperRef}>
                            {/* Slide 1 */}
                            <div className="data-slider-card">
                                <span className="slider-card-icon primary-text">🛍️</span>
                                <div className="slider-card-info">
                                    <h3 className="slider-card-title">Consumer Behavior Analysis</h3>
                                    <p className="slider-card-description">E-commerce purchasing patterns dataset.</p>
                                </div>
                                <p className="slider-card-price primary-text">Rp 7.450.000</p>
                            </div>
                            {/* Slide 2 */}
                            <div className="data-slider-card">
                                <span className="slider-card-icon primary-text">📈</span>
                                <div className="slider-card-info">
                                    <h3 className="slider-card-title">Fintech Adoption Rates</h3>
                                    <p className="slider-card-description">Digital wallet usage report across SEA.</p>
                                </div>
                                <p className="slider-card-price primary-text">Rp 11.250.000</p>
                            </div>
                            {/* Slide 3 */}
                            <div className="data-slider-card">
                                <span className="slider-card-icon primary-text">🎮</span>
                                <div className="slider-card-info">
                                    <h3 className="slider-card-title">Mobile Gaming Trends</h3>
                                    <p className="slider-card-description">Player engagement and monetization metrics.</p>
                                </div>
                                <p className="slider-card-price primary-text">Rp 5.250.000</p>
                            </div>
                        </div>
                        <div className="slider-dots" ref={sliderDotsRef}></div>
                    </div>
                </section>

                {/* Attention Boost Section */}
                <section className="fade-in-section">
                    <div className="section-header">
                        <h2>Attention Boost</h2>
                        <a href="#" className="see-more-button">See more <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                    </div>

                    <div className="attention-boost-tabs">
                        <div className={`attention-tab ${activeAttentionTab === 'ugc' ? 'active' : ''}`} onClick={() => handleAttentionTabClick('ugc')}>UGC</div>
                        <div className={`attention-tab ${activeAttentionTab === 'clipper' ? 'active' : ''}`} onClick={() => handleAttentionTabClick('clipper')}>Clipper</div>
                    </div>

                    <div className="attention-table-container card">
                        <table className="attention-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '5%' }}></th>
                                    <th style={{ width: '5%' }}>Rank</th>
                                    <th style={{ width: '30%' }}>Category</th>
                                    <th style={{ width: '30%' }}>Sentiment</th>
                                    <th style={{ width: '30%' }}>History</th>
                                </tr>
                            </thead>
                            <tbody ref={attentionTableBodyRef}>
                                {attentionData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{getTrendIcon(item.trend)}</td>
                                        <td className="rank-cell">{item.rank}</td>
                                        <td className="category-cell">{item.category}</td>
                                        <td>
                                            <div className="sentiment-bar">
                                                <div className="sentiment-positive" style={{ width: `${item.sentiment.pos}%` }}></div>
                                                <div className="sentiment-neutral" style={{ width: `${item.sentiment.neu}%` }}></div>
                                                <div className="sentiment-negative" style={{ width: `${item.sentiment.neg}%` }}></div>
                                            </div>
                                        </td>
                                        <td className="history-chart-cell">
                                            <canvas id={`sparkline-${activeAttentionTab}-${index}`}></canvas>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="main-footer">
                <p>&copy; 2025 XOLVON. All rights reserved.</p>
            </footer>

            {/* Theme Toggle Button */}
            <button id="theme-toggle" className="theme-toggle-button">
                <svg id="theme-toggle-dark-icon" className="w-6 h-6 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                <svg id="theme-toggle-light-icon" className="w-6 h-6 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            </button>
        </>
    );
}
