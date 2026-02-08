import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Background from './Background';
import FlyingPigeon from './FlyingPigeon';
import './PageStyles.css';

const Team = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="page-container" ref={containerRef}>
            <button className="back-btn" onClick={() => navigate('/')}>&larr; Terminal</button>
            <h1 className="page-title">The <span className="highlight">Team</span></h1>

            <div className="team-grid">
                {/* Row 1: Mentors & Founders */}
                <div className="card full-width-mobile">
                    <h3>FACULTY MENTORS</h3>
                    <p style={{ position: 'relative', zIndex: 10 }}>
                        <a href="https://www.linkedin.com/in/dr-vaibhav-vasani-phd-460a4162/" target="_blank" rel="noopener noreferrer" className="team-link" onClick={(e) => e.stopPropagation()}>
                            Dr. Vaibhav Prakash Vasani <span className="icon">in</span>
                        </a>
                    </p>
                    <p style={{ position: 'relative', zIndex: 10 }}>
                        <a href="https://www.linkedin.com/in/swapnil-pawar-60144b23/" target="_blank" rel="noopener noreferrer" className="team-link" onClick={(e) => e.stopPropagation()}>
                            Mr. Swapnil Pawar <span className="icon">in</span>
                        </a>
                    </p>
                </div>
                <div className="card full-width-mobile">
                    <h3>FOUNDERS</h3>
                    <p style={{ position: 'relative', zIndex: 10 }}>
                        <a href="https://www.linkedin.com/in/jehdadina/" target="_blank" rel="noopener noreferrer" className="team-link" onClick={(e) => e.stopPropagation()}>
                            Jeh Dadina <span className="icon">in</span>
                        </a>
                    </p>
                    <p style={{ position: 'relative', zIndex: 10 }}>
                        <a href="https://www.linkedin.com/in/vansh-dang/" target="_blank" rel="noopener noreferrer" className="team-link" onClick={(e) => e.stopPropagation()}>
                            Vansh Dang <span className="icon">in</span>
                        </a>
                    </p>
                </div>

                {/* Row 2: Domains */}
                <div className="card">
                    <h3>PUBLIC MARKETS</h3>
                    <p className="role-head">Head: Vansh Dang</p>
                    <p className="role-label">Members</p>
                    <p>Atharva Ghate</p>
                    <p>Chirayu Chandiramani</p>
                    <p>Nikunj Rathee</p>
                </div>
                <div className="card">
                    <h3>PRIVATE MARKETS</h3>
                    <p className="role-head">Head: Vansh Dang</p>
                </div>
                <div className="card">
                    <h3>FINTECH</h3>
                    <p className="role-head">Head: Jeh Dadina</p>
                    <p className="role-label">Members</p>
                    <p>Jaineel Patel</p>
                    <p>Naitik Gupta</p>
                    <p>Shreya Shetty</p>
                </div>

                {/* Row 3: Creative & Ops */}
                <div className="card">
                    <h3>CREATIVE & PR</h3>
                    <p className="role-head">Head: Doree Kasliwal</p>
                </div>
                <div className="card">
                    <h3>MARKETING & OPS</h3>
                    <p className="role-head">Head: Vivin Dube</p>
                    <p className="role-label">Members</p>
                    <p>Anshul Das</p>
                    <p>Jasraj Singh Bindra</p>
                    <p>Varad Surve</p>
                </div>

                {/* Row 4: FY Reps */}
                <div className="card full-width">
                    <h3>FY REPRESENTATIVES</h3>
                    <p className="reps-list">
                        Adyant Singh • Anuj Singh • Eshan Desai • Kalpita Ray • Malay Thakkar •
                        Mrudula Jadhav • Nalin Mahendran • Ruhan Advani • Swar Seth
                    </p>
                </div>
            </div>
            <FlyingPigeon />
            <Background />
        </div>
    );
};

export default Team;
