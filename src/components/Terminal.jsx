import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Terminal.css';

const commands = [
    { id: 'team', label: 'team', path: '/team', desc: 'View core committee & developers' },
    { id: 'domains', label: 'domains', path: '/domains', desc: 'Explore our operational domains' },
    { id: 'events', label: 'events', path: '/events', desc: 'Upcoming hackathons & workshops' },
    { id: 'connect', label: 'connect', path: '/connect', desc: 'Socials & contact info' },
    { id: 'tools', label: 'tools', path: '/tools', desc: 'Financial calculators & simulators' },
];

const TerminalLoader = ({ progress }) => {
    return (
        <div className="terminal-loader">
            <div className="loader-text">
                <span>ESTABLISHING SECURE CONNECTION...</span>
                <span className="loader-percentage">{progress}%</span>
            </div>
            <div className="loader-bar-container">
                <div className="loader-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="loader-status">
                {progress < 30 && "INITIALIZING PROTOCOLS..."}
                {progress >= 30 && progress < 70 && "VERIFYING ENCRYPTION KEYS..."}
                {progress >= 70 && progress < 100 && "DOWNLOADING ASSETS..."}
                {progress === 100 && "ACCESS GRANTED."}
            </div>
        </div>
    );
};

const Terminal = () => {
    const navigate = useNavigate();
    const [clickedId, setClickedId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = React.useRef(null);
    const timeoutRef = React.useRef(null);
    const terminalBodyRef = React.useRef(null);

    // Cleanup on unmount
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = 0;
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleClick = (cmd) => {
        if (clickedId !== null) return; // Prevent double clicks

        setClickedId(cmd.id);
        setIsLoading(true);
        setProgress(0);

        // Simulate loading process
        let currentProgress = 0;

        // Clear any existing intervals just in case
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 15) + 5;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(intervalRef.current);

                timeoutRef.current = setTimeout(() => {
                    navigate(cmd.path);
                }, 500);
            }
            setProgress(currentProgress);
        }, 150);
    };

    return (
        <div className="terminal-window">
            <div className="terminal-header">
                <div className="buttons">
                    <span className="close" />
                    <span className="minimize" />
                    <span className="maximize" />
                </div>
                <div className="title">ftc-terminal</div>
            </div>
            <div className="terminal-body" ref={terminalBodyRef}>
                {isLoading ? (
                    <TerminalLoader progress={progress} />
                ) : (
                    <>
                        <div className="line output">
                            <span className="content">Welcome to FTC Terminal v1.0.0</span>
                        </div>
                        <div className="line output">
                            <span className="content">Select a module to navigate:</span>
                        </div>
                        <div className="terminal-buttons">
                            {commands.map((cmd) => (
                                <button
                                    key={cmd.id}
                                    type="button"
                                    className={`terminal-btn ${clickedId === cmd.id ? 'terminal-btn--clicked' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent default touch actions behavior
                                        handleClick(cmd);
                                    }}
                                    disabled={clickedId !== null}
                                >
                                    <span className="prompt">$ </span>
                                    <span className="btn-label">{cmd.label}</span>
                                    <span className="btn-desc"> — {cmd.desc}</span>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Terminal;
