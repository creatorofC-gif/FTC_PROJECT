import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './FlyingPigeon.css';

const FlyingPigeon = () => {
    const birdRef = useRef(null);

    useEffect(() => {
        // Flight path animation
        const bird = birdRef.current;

        // Initial position off-screen left
        gsap.set(bird, { x: -80, y: '20vh' });

        // Continuous flight loop
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });

        tl.to(bird, {
            x: '110vw',
            y: '+=40', // slight dip
            duration: 18,
            ease: 'none',
        });

        // Gentle bobbing so the small emoji feels alive
        gsap.to(bird, {
            y: '+=6',
            yoyo: true,
            repeat: -1,
            duration: 0.8,
            ease: 'sine.inOut',
        });

        return () => tl.kill();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Redirect to LinkedIn profile
        window.open(
            'https://www.linkedin.com/in/shrish-alva-a3135a31b/?originalSubdomain=in',
            '_blank',
            'noopener,noreferrer'
        );
    };

    return (
        <div
            className="pigeon-container"
            ref={birdRef}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleClick(e);
            }}
        >
            <span className="pigeon-emoji" role="img" aria-label="pigeon">
                🕊️
            </span>
        </div>
    );
};

export default FlyingPigeon;
