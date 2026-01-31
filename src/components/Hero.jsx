import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Terminal from './Terminal';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8, delay: 0.2 });
            gsap.from('.hero-title', { y: 30, opacity: 0, duration: 0.8, delay: 0.4 });
            gsap.from('.hero-desc', { y: 30, opacity: 0, duration: 0.8, delay: 0.6 });
            gsap.from('.hero-actions', { y: 30, opacity: 0, duration: 0.8, delay: 0.8 });
            gsap.from('.hero-stats', { y: 30, opacity: 0, duration: 0.8, delay: 1.0 });
            gsap.from('.hero-visual', { x: 50, opacity: 0, duration: 1, delay: 0.5 });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="hero-section" ref={heroRef}>
            <div className="hero-content">
                <div className="hero-badge">Est. 2024</div>
                <h1 className="hero-title">
                    FINANCE &<br />
                    <span className="highlight">TECH CLUB</span>
                </h1>
                <p className="hero-desc">
                    An execution-driven student body operating across markets,
                    capital, and financial technology at K J Somaiya School of
                    Engineering.
                </p>

                {/* Actions and Stats removed as per request */}
            </div>

            <div className="hero-visual">
                <Terminal />
            </div>
        </section>
    );
};

export default Hero;
