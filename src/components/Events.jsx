import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Background from './Background';
import './PageStyles.css';

const Events = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="page-container" ref={containerRef}>
            <button className="back-btn" onClick={() => navigate('/')}>&larr; Terminal</button>
            <h1 className="page-title">Upcoming <span className="highlight">Events</span></h1>
            <div className="events-timeline">
                <div className="event-item">
                    <span className="date">FEB 15</span>
                    <div className="details">
                        <h3>Algo-Trading Workshop</h3>
                        <p>Introduction to Python for Finance.</p>
                    </div>
                </div>
                <div className="event-item">
                    <span className="date">MAR 10</span>
                    <div className="details">
                        <h3>Market Showdown</h3>
                        <p>Virtual Stock Market Simulation Competition.</p>
                    </div>
                </div>
            </div>
            <Background />
        </div>
    );
};

export default Events;
