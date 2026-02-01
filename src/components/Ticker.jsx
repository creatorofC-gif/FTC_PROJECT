import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Ticker.css';

const statusItems = [
    { word: 'DOUBT', color: 'red', trend: 'down' },
    { word: 'LEARNING', color: 'green', trend: 'up' },
    { word: 'NOISE', color: 'red', trend: 'down' },
    { word: 'FOCUS', color: 'green', trend: 'up' },
    { word: 'COMPLACENCY', color: 'red', trend: 'down' },
    { word: 'CONSISTENCY', color: 'green', trend: 'up' },
    { word: 'FEAR', color: 'red', trend: null },
    { word: 'CONFIDENCE', color: 'green', trend: 'up' },
    { word: 'FAILURES', color: 'red', trend: 'down' },
    { word: 'DISCIPLINE', color: 'green', trend: 'up' },
    { word: 'RISK', color: 'red', trend: 'down' },
    { word: 'EXECUTION', color: 'green', trend: null },
];

const Ticker = () => {
    const tickerRef = useRef(null);

    useEffect(() => {
        // Infinite horizontal scroll
        const ctx = gsap.context(() => {
            const content = tickerRef.current.querySelector('.ticker-content');
            const clone = content.cloneNode(true);
            tickerRef.current.appendChild(clone);

            const totalWidth = content.offsetWidth;

            gsap.to('.ticker-content', {
                x: -totalWidth,
                duration: 20,
                ease: 'none',
                repeat: -1,
            });
        }, tickerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="ticker-wrapper" ref={tickerRef}>
            <div className="ticker-content">
                {statusItems.map((item, index) => (
                    <div className={`ticker-item status-item ${item.color}`} key={index}>
                        <span className="status-word">{item.word}</span>
                        {item.trend && (
                            <span className={`trend-indicator ${item.trend}`}>
                                {item.trend === 'up' ? '▲' : '▼'}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ticker;
