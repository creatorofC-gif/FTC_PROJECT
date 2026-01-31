import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Background from './Background';
import './PageStyles.css';

const Domains = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="page-container" ref={containerRef}>
            <button className="back-btn" onClick={() => navigate('/')}>&larr; Terminal</button>
            <h1 className="page-title">Our <span className="highlight">Domains</span></h1>
            <div className="content-list">
                <div className="list-item">
                    <h2>Public Markets</h2>
                    <p>Equities, Derivatives, and Technical Analysis.</p>
                </div>
                <div className="list-item">
                    <h2>Private Markets</h2>
                    <p>Venture Capital, Private Equity, and Startup Valuation.</p>
                </div>
                <div className="list-item">
                    <h2>Fintech</h2>
                    <p>Algorithmic Trading, Blockchain, and Financial Software Development.</p>
                </div>
            </div>
            <Background />
        </div>
    );
};

export default Domains;
