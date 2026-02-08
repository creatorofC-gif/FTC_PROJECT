import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Terminal from './Terminal';
import './Hero.css';
import whatsappImg from '../assets/WhatsApp_Image_2026-02-01_at_12.27.03-removebg-preview.png';

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-badge', { opacity: 0, duration: 0.8, delay: 0.2 });
            gsap.from('.hero-logo-img', { opacity: 0, duration: 0.8, delay: 0.4 });
            gsap.from('.hero-desc', { opacity: 0, duration: 0.8, delay: 0.6 });
            gsap.from('.hero-actions', { opacity: 0, duration: 0.8, delay: 0.8 });
            gsap.from('.hero-stats', { opacity: 0, duration: 0.8, delay: 1.0 });
            // Simplified animation to prevent scroll jumping
            gsap.from('.hero-visual', { opacity: 0, duration: 1.2, delay: 0.2 });
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="hero-section" ref={heroRef}>
            <div className="hero-content">
                <div className="hero-logo-block">
                    <img src={whatsappImg} alt="Finance & Tech Club" className="hero-logo-img" />
                    <p className="hero-sig">SIG SwDC</p>
                </div>
            </div>

            <div className="hero-visual">
                <Terminal />
            </div>
        </section>
    );
};

export default Hero;
