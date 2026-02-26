import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Background from './Background';
import './Tools.css';
import './PageStyles.css';

// format helpers
const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const Tools = () => {
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        // Entrance Anim
        gsap.to(headerRef.current, { opacity: 1, duration: 1, y: 0, ease: "power3.out" });
        gsap.fromTo(cardsRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }
        );
    }, []);

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <div className="page-container tools-container">
            <Background />
            <button className="back-btn" onClick={() => navigate('/')} style={{ position: 'relative', zIndex: 100 }}>&larr; Terminal</button>

            <div className="tools-header" ref={headerRef} style={{ opacity: 0, transform: 'translateY(-20px)' }}>
                <h1>Financial Toolkit</h1>
                <p>Interactive simulations for the intelligent investor.</p>
            </div>

            <div className="tools-grid">
                <SipCalculator refProp={addToRefs} />
                <RiskAnalyzer refProp={addToRefs} />
                <PortfolioSim refProp={addToRefs} />
            </div>
        </div>
    );
};

// --- 1. Interactive SIP Calculator with Live Graph ---
const SipCalculator = ({ refProp }) => {
    const [monthly, setMonthly] = useState(5000);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(12);
    const data = useMemo(() => {
        const r = rate / 12 / 100;
        const n = years * 12;
        const inv = monthly * n;
        const val = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const points = [];
        const totalPoints = 10;
        for (let i = 0; i <= totalPoints; i++) {
            const t = i / totalPoints;
            const yVal = Math.pow(t, 2);
            points.push(`${t * 100},${100 - (yVal * 80)}`);
        }
        return { inv, val, path: points.join(" ") };
    }, [monthly, years, rate]);

    return (
        <div className="tool-card" ref={refProp}>
            <div className="tool-header">
                <div className="tool-icon-box">📈</div>
                <span className="tool-title-text">SIP Calculator</span>
            </div>

            <div className="sip-controls">
                <div className="control-group">
                    <div className="label-row"><span>Monthly Inv.</span> <span className="value-display">{fmt(monthly)}</span></div>
                    <input type="range" min="500" max="100000" step="500" value={monthly} onChange={e => setMonthly(+e.target.value)} className="custom-range" />
                </div>
                <div className="control-group">
                    <div className="label-row"><span>Duration</span> <span className="value-display">{years} Years</span></div>
                    <input type="range" min="1" max="40" value={years} onChange={e => setYears(+e.target.value)} className="custom-range" />
                </div>
                <div className="control-group">
                    <div className="label-row"><span>Return Rate</span> <span className="value-display">{rate}%</span></div>
                    <input type="range" min="1" max="30" value={rate} onChange={e => setRate(+e.target.value)} className="custom-range" />
                </div>
            </div>

            <div className="chart-area" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,255,157,0.1) 100%)' }}>
                <div className="sip-stats">
                    <div className="stat-item">
                        <div className="stat-label">Invested</div>
                        <div className="stat-val">{fmt(data.inv)}</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-label">Total Value</div>
                        <div className="stat-val text-green">{fmt(data.val)}</div>
                    </div>
                </div>
                {/* Live SVG Graph */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '80px' }}>
                    <path d={`M0,100 L${data.path} L100,100 Z`} className="chart-area-fill" />
                    <path d={`M0,100 L${data.path}`} className="chart-line" vectorEffect="non-scaling-stroke" />
                </svg>
            </div>
        </div>
    );
}

// --- 2. Risk Analyzer with Gauge ---
const RiskAnalyzer = ({ refProp }) => {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        { t: "Market drops 20%. You:", opts: [{ t: "Sell All", s: 1 }, { t: "Do Nothing", s: 5 }, { t: "Buy More", s: 10 }] },
        { t: "Investment Horizon?", opts: [{ t: "< 3 Years", s: 1 }, { t: "3-7 Years", s: 5 }, { t: "10+ Years", s: 10 }] },
        { t: "Primary Goal?", opts: [{ t: "Avoid Loss", s: 1 }, { t: "Growth", s: 5 }, { t: "Monopoly Money", s: 10 }] },
    ];

    const handleAns = (s) => {
        const nextScore = score + s;
        if (step < questions.length - 1) {
            setScore(nextScore);
            setStep(step + 1);
        } else {
            setScore(nextScore);
            setStep("result");
        }
    };

    const reset = () => { setStep(0); setScore(0); };

    // Determine result
    let riskType = "Moderate";
    let rotation = 90; // degrees for needle (0 = left, 90 = mid, 180 = right)
    if (step === "result") {
        if (score <= 10) { riskType = "Conservative"; rotation = 30; }
        else if (score <= 20) { riskType = "Balanced"; rotation = 90; }
        else { riskType = "Aggressive"; rotation = 150; }
    }

    return (
        <div className="tool-card" ref={refProp}>
            <div className="tool-header">
                <div className="tool-icon-box">🧠</div>
                <span className="tool-title-text">Risk Profile</span>
            </div>

            {step !== "result" ? (
                <div className="quiz-container">
                    <h3 style={{ marginBottom: '1.5rem', minHeight: '60px' }}>{questions[step].t}</h3>
                    {questions[step].opts.map((o, i) => (
                        <button key={i} className="option-btn" onClick={() => handleAns(o.s)}>
                            {o.t}
                        </button>
                    ))}
                    <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: '#555' }}>Question {step + 1}/{questions.length}</div>
                </div>
            ) : (
                <div className="quiz-container" style={{ textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#888' }}>Your Profile</h3>
                    <div className="gauge-container">
                        {/* Simple SVG Gauge */}
                        <svg viewBox="0 0 200 120">
                            <path d="M20,100 A80,80 0 0,1 180,100" className="gauge-bg" />
                            <line x1="100" y1="100" x2="100" y2="20" className="gauge-needle"
                                stroke="white" strokeWidth="4" strokeLinecap="round"
                                style={{ transform: `rotate(${rotation - 90}deg)` }} />
                            <circle cx="100" cy="100" r="8" fill="white" />
                            <text x="20" y="115" fill="#888" fontSize="12">Safe</text>
                            <text x="180" y="115" fill="#888" fontSize="12" textAnchor="end">Risky</text>
                        </svg>
                    </div>
                    <h2 style={{ color: 'var(--accent-green)', fontSize: '2rem', marginTop: '-20px' }}>{riskType}</h2>
                    <button className="back-btn" style={{ marginTop: '2rem', width: '100%' }} onClick={reset}>Retest</button>
                </div>
            )}
        </div>
    );
}

// --- 3. Portfolio with Donut Chart ---
const PortfolioSim = ({ refProp }) => {
    const [eq, setEq] = useState(50);
    const [db, setDb] = useState(30);
    const [ch, setCh] = useState(20);

    // Normalize
    const total = eq + db + ch;
    const pE = (eq / total);
    const pD = (db / total);
    const pC = (ch / total);

    // Donut Dash Arrays (Circumference ~ 440)
    const r = 70;
    const c = 2 * Math.PI * r;

    const offE = c * (1 - pE);
    const offD = c * (1 - pD);
    const offC = c * (1 - pC);

    // Cumulative rotation
    const rotE = -90;
    const rotD = rotE + (pE * 360);
    const rotC = rotD + (pD * 360);

    return (
        <div className="tool-card" ref={refProp}>
            <div className="tool-header">
                <div className="tool-icon-box">🍰</div>
                <span className="tool-title-text">Allocation Sim</span>
            </div>

            <div className="donut-chart-container">
                <svg viewBox="0 0 200 200" style={{ transform: 'rotate(0deg)' }}>
                    <circle cx="100" cy="100" r={r} className="donut-segment" stroke="var(--accent-green)" strokeDasharray={`${c - offE} ${offE}`} style={{ transform: `rotate(${rotE}deg)`, transformOrigin: 'center' }} />
                    <circle cx="100" cy="100" r={r} className="donut-segment" stroke="var(--accent-blue)" strokeDasharray={`${c - offD} ${offD}`} style={{ transform: `rotate(${rotD}deg)`, transformOrigin: 'center' }} />
                    <circle cx="100" cy="100" r={r} className="donut-segment" stroke="var(--accent-pink)" strokeDasharray={`${c - offC} ${offC}`} style={{ transform: `rotate(${rotC}deg)`, transformOrigin: 'center' }} />
                </svg>
                <div className="donut-center-text">
                    {((pE * 12) + (pD * 7) + (pC * 3)).toFixed(1)}% <br /> Exp. Return
                </div>
            </div>

            <div className="donut-legend">
                <div><span className="legend-dot" style={{ background: 'var(--accent-green)' }} /> Equity</div>
                <div><span className="legend-dot" style={{ background: 'var(--accent-blue)' }} /> Debt</div>
                <div><span className="legend-dot" style={{ background: 'var(--accent-pink)' }} /> Cash</div>
            </div>

            <div className="allocation-controls" style={{ marginTop: '1.5rem' }}>
                <div className="allocation-slider-group">
                    <div className="allocation-label-row">
                        <span className="allocation-label">
                            <span className="legend-dot" style={{ background: 'var(--accent-green)' }} /> Equity
                        </span>
                        <span className="allocation-value">{Math.round(pE * 100)}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        className="custom-range allocation-slider" 
                        value={eq} 
                        onChange={e => setEq(+e.target.value)} 
                        style={{ marginBottom: '1.5rem' }} 
                    />
                </div>
                
                <div className="allocation-slider-group">
                    <div className="allocation-label-row">
                        <span className="allocation-label">
                            <span className="legend-dot" style={{ background: 'var(--accent-blue)' }} /> Debt
                        </span>
                        <span className="allocation-value">{Math.round(pD * 100)}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        className="custom-range allocation-slider" 
                        value={db} 
                        onChange={e => setDb(+e.target.value)} 
                        style={{ marginBottom: '1.5rem' }} 
                    />
                </div>
                
                <div className="allocation-slider-group">
                    <div className="allocation-label-row">
                        <span className="allocation-label">
                            <span className="legend-dot" style={{ background: 'var(--accent-pink)' }} /> Cash
                        </span>
                        <span className="allocation-value">{Math.round(pC * 100)}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        className="custom-range allocation-slider" 
                        value={ch} 
                        onChange={e => setCh(+e.target.value)} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Tools;
