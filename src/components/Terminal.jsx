import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Terminal.css';

const Terminal = () => {
    const [history, setHistory] = useState([
        { type: 'output', text: 'Welcome to FTC Terminal v1.0.0' },
        { type: 'output', text: 'Available commands:\n  > team     - View core committee & developers\n  > domains  - Explore our operational domains\n  > events   - Upcoming hackathons & workshops\n  > connect  - Socials & contact info\n  > clear    - Clear terminal' }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Focus input on click
    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    const handleCommand = (cmd) => {
        const cleanCmd = cmd.trim().toLowerCase();
        const newHistory = [...history, { type: 'command', text: cmd }];

        switch (cleanCmd) {
            case 'help':
                newHistory.push({
                    type: 'output',
                    text: 'Available commands:\n  > team     - View core committee & developers\n  > domains  - Explore our operational domains\n  > events   - Upcoming hackathons & workshops\n  > connect  - Socials & contact info\n  > clear    - Clear terminal'
                });
                setHistory(newHistory);
                break;
            case 'team':
                newHistory.push({ type: 'output', text: 'Navigating to Team module...' });
                setHistory(newHistory);
                setTimeout(() => navigate('/team'), 800);
                break;
            case 'domains':
                newHistory.push({ type: 'output', text: 'Accessing Domains...' });
                setHistory(newHistory);
                setTimeout(() => navigate('/domains'), 800);
                break;
            case 'events':
                newHistory.push({ type: 'output', text: 'Fetching Event Timeline...' });
                setHistory(newHistory);
                setTimeout(() => navigate('/events'), 800);
                break;
            case 'connect':
                newHistory.push({ type: 'output', text: 'Establishing secure connection...' });
                setHistory(newHistory);
                setTimeout(() => navigate('/connect'), 800);
                break;
            case 'clear':
                setHistory([]);
                break;
            case '':
                setHistory(newHistory);
                break;
            default:
                newHistory.push({ type: 'error', text: `Command not found: ${cleanCmd}. Type "help" for assistance.` });
                setHistory(newHistory);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div className="terminal-window" onClick={handleContainerClick}>
            <div className="terminal-header">
                <div className="buttons">
                    <span className="close" />
                    <span className="minimize" />
                    <span className="maximize" />
                </div>
                <div className="title">ftc-terminal (Interactive)</div>
            </div>
            <div className="terminal-body">
                {history.map((line, idx) => (
                    <div key={idx} className={`line ${line.type}`}>
                        {line.type === 'command' && <span className="prompt">$ </span>}
                        <span className="content">{line.text}</span>
                    </div>
                ))}
                <div className="input-line">
                    <span className="prompt">$ </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="terminal-input"
                        autoFocus
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default Terminal;
