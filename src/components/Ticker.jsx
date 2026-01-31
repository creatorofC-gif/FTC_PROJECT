import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Ticker.css';

const tickerData = [
    { symbol: 'SENSEX', price: '78,782.24', change: '+1.89%', up: true },
    { symbol: 'BTC/USD', price: '95,234.5', change: '-1.23%', up: false },
    { symbol: 'ETH/USD', price: '3,421.18', change: '+3.45%', up: true },
    { symbol: 'RELIANCE', price: '1,285.45', change: '+0.87%', up: true },
    { symbol: 'TCS', price: '4,123.9', change: '-0.45%', up: false },
    { symbol: 'NIFTY 50', price: '23,847.9', change: '+2.34%', up: true },
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
                {tickerData.map((item, index) => (
                    <div className="ticker-item" key={index}>
                        <span className="symbol">{item.symbol}</span>
                        <span className="price">{item.price}</span>
                        <span className={`change ${item.up ? 'up' : 'down'}`}>
                            {item.change}
                        </span>
                    </div>
                ))}
                {/* Duplicate for seamless loop if needed logic, but GSAP duplicate approach above handles it lightly or we render twice here */}
            </div>
        </div>
    );
};

export default Ticker;
