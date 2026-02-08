import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Linkedin, Instagram, Mail, MapPin } from 'lucide-react';
import Background from './Background';
import './PageStyles.css';

const Connect = () => {
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
            <h1 className="page-title">Connect <span className="highlight">With Us</span></h1>

            <div className="connect-grid">
                <a href="https://www.linkedin.com/company/ftckjsse/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="connect-card">
                    <Linkedin size={48} color="#0077b5" />
                    <h3>LinkedIn</h3>
                    <p>FTC</p>
                </a>

                <a href="https://www.instagram.com/ftc.kjsse" target="_blank" rel="noopener noreferrer" className="connect-card">
                    <Instagram size={48} color="#E1306C" />
                    <h3>Instagram</h3>
                    <p>ftc.kjsse</p>
                </a>

                <a href="https://www.google.com/maps/search/K+J+Somaiya+College+of+Engineering" target="_blank" rel="noopener noreferrer" className="connect-card">
                    <MapPin size={48} color="#00ffa3" />
                    <h3>Location</h3>
                    <p>K J Somaiya School of Engineering</p>
                </a>
            </div>

            <Background />
        </div>
    );
};

export default Connect;
