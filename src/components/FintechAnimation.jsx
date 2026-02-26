import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './FintechAnimation.css';

const FintechAnimation = () => {
    const [value, setValue] = useState(10000);
    const navigate = useNavigate();

    useEffect(() => {
        // Start animation automatically on mount

        // Animate the value counting up
        let start = 10000;
        const end = 125000;
        const duration = 2000;
        const increment = (end - start) / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setValue(end);
                clearInterval(timer);
            } else {
                setValue(Math.floor(start));
            }
        }, 16);

        // Redirect after animation
        const redirectTimer = setTimeout(() => {
            navigate('/tools');
        }, 3500);

        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    // Generate chart path data points
    const generateChartPath = () => {
        const points = [
            { x: 0, y: 80 },
            { x: 10, y: 75 },
            { x: 20, y: 78 },
            { x: 30, y: 70 },
            { x: 40, y: 65 },
            { x: 50, y: 55 },
            { x: 60, y: 45 },
            { x: 70, y: 35 },
            { x: 80, y: 25 },
            { x: 90, y: 15 },
            { x: 100, y: 10 },
        ];

        const path = points.map((point, i) => {
            return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
        }).join(' ');

        return path;
    };

    const particles = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 30; i++) {
            const left = (i * 7) % 100;
            const delay = (i % 6) * 0.25;
            arr.push({ left, delay });
        }
        return arr;
    }, []);

    return (
        <div className="fintech-container">
            <div className="animation-overlay">
                {/* Stock Chart Animation */}
                <div className="chart-container">
                    <div className="chart-header">
                        <div className="stock-symbol">PORTFOLIO</div>
                        <div className="stock-value">₹{value.toLocaleString('en-IN')}</div>
                        <div className="stock-change">+1150% 🚀</div>
                    </div>

                    <svg className="stock-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="25" x2="100" y2="25" className="grid-line" />
                        <line x1="0" y1="50" x2="100" y2="50" className="grid-line" />
                        <line x1="0" y1="75" x2="100" y2="75" className="grid-line" />

                        {/* Gradient fill under the line */}
                        <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#00ff9d" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Area under the chart */}
                        <path
                            className="chart-area"
                            d={`${generateChartPath()} L 100 100 L 0 100 Z`}
                            fill="url(#chartGradient)"
                        />

                        {/* Main chart line */}
                        <path
                            className="chart-line"
                            d={generateChartPath()}
                            fill="none"
                            stroke="#00ff9d"
                            strokeWidth="0.5"
                        />

                        {/* Glowing dot at the end */}
                        <circle className="chart-dot" cx="100" cy="10" r="1.5" fill="#00ff9d" />
                    </svg>

                    {/* Floating stats */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-label">ROI</div>
                            <div className="stat-value">+1150%</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Profit</div>
                            <div className="stat-value">₹1.15L</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-label">Period</div>
                            <div className="stat-value">12 months</div>
                        </div>
                    </div>
                </div>

                {/* Particle effects */}
                <div className="particles">
                    {particles.map((p, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                left: `${p.left}%`,
                                animationDelay: `${p.delay}s`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FintechAnimation;
