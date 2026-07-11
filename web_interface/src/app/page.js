'use client';

import React, { useMemo, useState } from 'react';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'stack', label: 'Stack' },
  { id: 'demo', label: 'Demo and Results' },
  { id: 'contribution', label: 'Contribution' },
];

const workflowSteps = [
  {
    label: 'CMAPSS raw files',
    detail: 'FD001-FD004 train, test, and RUL telemetry',
  },
  {
    label: 'Data ingestion',
    detail: 'Direct PostgreSQL load or RabbitMQ producer/consumer stream',
  },
  {
    label: 'Preprocessing',
    detail: 'Missing-value checks, Z-score outlier removal, Min-Max scaling',
  },
  {
    label: 'Model workflow',
    detail: 'Notebook training and model artifact export for RUL prediction',
  },
  {
    label: 'Prediction UI',
    detail: 'Flask API plus Next.js interface for metrics and file prediction',
  },
];

const stackGroups = [
  {
    title: 'Data and ML',
    items: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Jupyter'],
  },
  {
    title: 'Streaming and Storage',
    items: ['PostgreSQL', 'SQLAlchemy', 'RabbitMQ', 'Docker'],
  },
  {
    title: 'Application Layer',
    items: ['Flask', 'Flask-CORS', 'Next.js', 'React', 'Tailwind CSS'],
  },
  {
    title: 'Project Checks',
    items: ['Dataset review', 'Python scripts', 'Frontend build', 'Docker services'],
  },
];

const resultMetrics = [
  { value: '98,196', label: 'processed rows', tone: 'mint' },
  { value: '28', label: 'dataset columns', tone: 'amber' },
  { value: '0', label: 'missing values', tone: 'coral' },
  { value: '265,963', label: 'RabbitMQ messages', tone: 'indigo' },
];

const tableCounts = [
  ['FD001', '20,631', '13,096', '100'],
  ['FD002', '53,759', '33,991', '259'],
  ['FD003', '24,720', '16,596', '100'],
  ['FD004', '61,249', '41,214', '248'],
];

function EngineDiagram() {
  return (
    <div className="engine-visual" aria-label="Animated turbine diagram">
      <svg viewBox="0 0 640 260" role="img">
        <defs>
          <linearGradient id="engineBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#243b53" />
            <stop offset="42%" stopColor="#2f6f73" />
            <stop offset="100%" stopColor="#e08e45" />
          </linearGradient>
          <linearGradient id="airFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0" />
            <stop offset="50%" stopColor="#4fd1c5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f6ad55" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="engine-shell"
          d="M78 132 C114 58 230 38 364 50 C492 62 570 96 596 132 C570 168 492 200 364 211 C230 223 114 205 78 132 Z"
          fill="url(#engineBody)"
        />
        <ellipse cx="154" cy="132" rx="72" ry="70" fill="#ecfeff" opacity="0.88" />
        <g className="fan">
          {Array.from({ length: 12 }).map((_, index) => (
            <path
              key={index}
              d="M154 132 L164 70 C185 82 190 102 171 125 Z"
              fill={index % 2 === 0 ? '#0f766e' : '#155e75'}
              opacity="0.88"
              transform={`rotate(${index * 30} 154 132)`}
            />
          ))}
        </g>
        <circle cx="154" cy="132" r="16" fill="#f97316" />
        <path d="M222 92 H516 C536 92 556 108 568 132 C556 156 536 172 516 172 H222 Z" fill="#f8fafc" opacity="0.22" />
        <g className="flow-lines">
          {[88, 112, 136, 160].map((y, index) => (
            <path
              key={y}
              d={`M40 ${y} C158 ${y - 18} 284 ${y + 18} 430 ${y} S580 ${y - 14} 626 ${y}`}
              fill="none"
              stroke="url(#airFlow)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{ animationDelay: `${index * 0.25}s` }}
            />
          ))}
        </g>
        <g className="sensor-pulses">
          {[268, 348, 430, 508].map((x, index) => (
            <g key={x} style={{ animationDelay: `${index * 0.35}s` }}>
              <circle cx={x} cy="92" r="8" fill="#facc15" />
              <line x1={x} y1="100" x2={x} y2="166" stroke="#facc15" strokeWidth="3" strokeDasharray="5 7" />
              <circle cx={x} cy="174" r="5" fill="#facc15" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

function WorkflowDiagram() {
  return (
    <div className="workflow">
      {workflowSteps.map((step, index) => (
        <React.Fragment key={step.label}>
          <div className="workflow-step">
            <span className="step-index">{String(index + 1).padStart(2, '0')}</span>
            <strong>{step.label}</strong>
            <p>{step.detail}</p>
          </div>
          {index < workflowSteps.length - 1 && <span className="connector" aria-hidden="true" />}
        </React.Fragment>
      ))}
    </div>
  );
}

function ResultChart() {
  const points = useMemo(
    () => [
      [0, 168],
      [54, 154],
      [108, 136],
      [162, 118],
      [216, 96],
      [270, 78],
      [324, 58],
      [378, 42],
    ],
    []
  );

  const path = points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');

  return (
    <div className="chart-panel">
      <div>
        <span className="eyebrow">Example RUL curve</span>
        <h3>Predicted useful life trends downward as sensor degradation increases.</h3>
      </div>
      <svg viewBox="0 0 430 220" role="img" aria-label="Example RUL prediction curve">
        <g className="grid-lines">
          {[40, 80, 120, 160].map((y) => (
            <line key={y} x1="24" y1={y} x2="408" y2={y} />
          ))}
        </g>
        <path className="area" d={`${path} L 378 188 L 0 188 Z`} />
        <path className="trend-line" d={path} />
        {points.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />
        ))}
        <text x="24" y="210">engine cycles</text>
        <text x="20" y="26">RUL</text>
      </svg>
    </div>
  );
}

function OverviewTab() {
  return (
    <section className="tab-grid">
      <div className="section-copy">
        <span className="eyebrow">Project overview</span>
        <h2>A predictive maintenance pipeline for aircraft engine telemetry.</h2>
        <p>
          AeroRUL uses NASA CMAPSS run-to-failure data to show how raw sensor streams can become a
          prepared dataset, database tables, model training inputs, and a simple RUL prediction
          interface.
        </p>
        <div className="metric-strip">
          {resultMetrics.slice(0, 3).map((metric) => (
            <div className={`metric ${metric.tone}`} key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
      <WorkflowDiagram />
    </section>
  );
}

function StackTab() {
  return (
    <section className="stack-layout">
      <div className="section-copy narrow">
        <span className="eyebrow">Stack used</span>
        <h2>Built as a small, end-to-end data system.</h2>
        <p>
          The repo combines batch ingestion, streaming ingestion, preprocessing notebooks, model
          artifacts, a Flask API, and a Next.js interface.
        </p>
      </div>
      <div className="stack-grid">
        {stackGroups.map((group) => (
          <article className="stack-card" key={group.title}>
            <h3>{group.title}</h3>
            <div className="chip-list">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DemoTab() {
  return (
    <section className="demo-layout">
      <div className="section-copy">
        <span className="eyebrow">Demo and results</span>
        <h2>Example end-to-end workflow.</h2>
        <p>
          PostgreSQL stores the loaded CMAPSS tables while RabbitMQ demonstrates the streaming path.
          The same FD001-FD004 train, test, and RUL splits move through the ingestion flow.
        </p>
      </div>

      <div className="metric-strip wide">
        {resultMetrics.map((metric) => (
          <div className={`metric ${metric.tone}`} key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="results-split">
        <ResultChart />
        <div className="counts-panel">
          <div>
            <span className="eyebrow">Dataset splits</span>
            <h3>FD001-FD004 train, test, and RUL row counts.</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Dataset</th>
                  <th>Train</th>
                  <th>Test</th>
                  <th>RUL</th>
                </tr>
              </thead>
              <tbody>
                {tableCounts.map(([dataset, train, test, rul]) => (
                  <tr key={dataset}>
                    <td>{dataset}</td>
                    <td>{train}</td>
                    <td>{test}</td>
                    <td>{rul}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContributionTab() {
  return (
    <section className="contribution-layout single">
      <div className="section-copy narrow">
        <span className="eyebrow">Contribution</span>
        <h2>School project during an ERASMUS exchange program at CNAM Paris.</h2>
        <p>
          AeroRUL was completed as a school project during an ERASMUS exchange program at CNAM
          Paris.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const content = {
    overview: <OverviewTab />,
    stack: <StackTab />,
    demo: <DemoTab />,
    contribution: <ContributionTab />,
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">NASA CMAPSS RUL pipeline</span>
            <h1>AeroRUL Predictive Maintenance</h1>
            <p>
              An aircraft engine telemetry project covering ingestion, preprocessing, model workflow,
              and remaining useful life prediction.
            </p>
            <div className="hero-actions" aria-label="Project highlights">
              <span>PostgreSQL</span>
              <span>RabbitMQ</span>
              <span>Next.js</span>
            </div>
          </div>
          <EngineDiagram />
        </div>
      </section>

      <section className="tabs-band">
        <div className="tabs-shell">
          <div className="tabs" role="tablist" aria-label="Project sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? 'active' : ''}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="tab-content" role="tabpanel">
            {content[activeTab]}
          </div>
        </div>
      </section>
    </main>
  );
}
