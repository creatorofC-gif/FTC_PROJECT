import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Navbar.css';

const Navbar = () => {
    const navRef = useRef(null);
    const [time, setTime] = React.useState(new Date().toLocaleTimeString('en-GB', { hour12: false }));

    useEffect(() => {
        // Clock timer
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
        }, 1000);

        gsap.fromTo(navRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
        );

        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="navbar" ref={navRef}>
            <div className="logo">
                <div className="sub-info">
                    <span>Mumbai</span>
                    <span className="separator">•</span>
                    <span>{time}</span>
                </div>
            </div>

            <div className="nav-links">
            </div>
        </nav>
    );
};

export default Navbar;
