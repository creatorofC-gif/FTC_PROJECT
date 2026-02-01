import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Background from './Background';
import TBAAnimation from './TBAAnimation';
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
                    <div className="date-wrapper">
                        <TBAAnimation />
                    </div>
                    <div className="details">
                        <h3>General FTC Meetup</h3>
                        <p>Join us for our regular meetup session.</p>
                    </div>
                </div>
                <div className="event-item">
                    <div className="date-wrapper">
                        <TBAAnimation />
                    </div>
                    <div className="details">
                        <h3>Finance101 - Speaker Session on Finance</h3>
                        <p>Learn the fundamentals of finance from industry experts.</p>
                    </div>
                </div>
                <div className="event-item">
                    <div className="date-wrapper">
                        <TBAAnimation />
                    </div>
                    <div className="details">
                        <h3>Mock Stock Market Competition</h3>
                        <p>Test your trading skills in our virtual stock market simulation.</p>
                    </div>
                </div>
            </div>
            <Background />
        </div>
    );
};

export default Events;
