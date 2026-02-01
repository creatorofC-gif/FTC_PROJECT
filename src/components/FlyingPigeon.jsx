import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './FlyingPigeon.css';

const FlyingPigeon = () => {
    const birdRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Flight path animation
        const bird = birdRef.current;

        // Initial position off-screen left
        gsap.set(bird, { x: -100, y: '20vh' });

        // Continuous flight loop
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });

        tl.to(bird, {
            x: '110vw',
            y: '+=50', // slight dip
            duration: 15,
            ease: 'none',
            modifiers: {
                y: (y) => {
                    // Add some sine wave wobble
                    return parseFloat(y) + Math.sin(Date.now() / 500) * 20 + 'px';
                }
            }
        });

        // Wing flapping (simulated with scale/rotation or sprite)
        gsap.to(bird.querySelector('.wing'), {
            rotate: 20,
            scaleY: 0.8,
            yoyo: true,
            repeat: -1,
            duration: 0.2
        });

        return () => tl.kill();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Redirect to LinkedIn profile
        window.open('https://www.linkedin.com/in/shrish-alva-a3135a31b/?originalSubdomain=in', '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="pigeon-container" ref={birdRef} onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); }}>
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
                <g className="bird-body">
                    {/* Simple white dove/pigeon shape - smaller size */}
                    <path d="M10,50 Q30,20 60,40 Q90,50 80,70 Q60,90 30,70 Q10,80 10,50 Z" fill="white" opacity="0.9" />
                    <circle cx="70" cy="45" r="3" fill="black" />
                    <path className="wing" d="M30,50 Q50,10 70,50 Z" fill="#e0e0e0" />
                </g>
            </svg>
        </div>
    );
};

export default FlyingPigeon;
