import React from 'react';
import './TBAAnimation.css';

const TBAAnimation = () => {
    return (
        <div className="tba-container">
            <div className="tba-text">
                <span className="tba-letter" style={{ '--delay': '0s' }}>T</span>
                <span className="tba-letter" style={{ '--delay': '0.1s' }}>O</span>
                <span className="tba-letter" style={{ '--delay': '0.2s' }}> </span>
                <span className="tba-letter" style={{ '--delay': '0.3s' }}>B</span>
                <span className="tba-letter" style={{ '--delay': '0.4s' }}>E</span>
                <span className="tba-letter" style={{ '--delay': '0.5s' }}> </span>
                <span className="tba-letter" style={{ '--delay': '0.6s' }}>A</span>
                <span className="tba-letter" style={{ '--delay': '0.7s' }}>N</span>
                <span className="tba-letter" style={{ '--delay': '0.8s' }}>N</span>
                <span className="tba-letter" style={{ '--delay': '0.9s' }}>O</span>
                <span className="tba-letter" style={{ '--delay': '1s' }}>U</span>
                <span className="tba-letter" style={{ '--delay': '1.1s' }}>N</span>
                <span className="tba-letter" style={{ '--delay': '1.2s' }}>C</span>
                <span className="tba-letter" style={{ '--delay': '1.3s' }}>E</span>
                <span className="tba-letter" style={{ '--delay': '1.4s' }}>D</span>
            </div>
            <div className="tba-pulse"></div>
        </div>
    );
};

export default TBAAnimation;
