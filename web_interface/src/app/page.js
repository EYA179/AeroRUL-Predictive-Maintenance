'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'data', label: 'Data Pipeline' },
  { id: 'models', label: 'Model Results' },
  { id: 'stack', label: 'Stack' },
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
  ['FD001', '20,631', '13,096', '100', '33,827'],
  ['FD002', '53,759', '33,991', '259', '88,009'],
  ['FD003', '24,720', '16,596', '100', '41,416'],
  ['FD004', '61,249', '41,214', '248', '102,711'],
];

const processedFacts = [
  ['Rows', '98,196'],
  ['Columns', '28'],
  ['Missing cells', '0'],
  ['Train rows', '60,084'],
  ['Test rows', '38,112'],
  ['Max cycle', '362'],
];

const modelMetrics = [
  ['XGBoost', '5.5723', '7.6938', '0.9876', '77.46%'],
  ['Random Forest', '7.7917', '12.4993', '0.9672', '67.18%'],
  ['SVR', '27.8765', '39.7768', '0.6679', '28.00%'],
  ['LightGBM', '31.9470', '40.2227', '0.6604', '24.82%'],
];

const apiFacts = [
  ['GET /api/data', 'Reads model result rows from the trainning_data_results table.'],
  ['POST /api/rul', 'Accepts a numeric file upload and a selected RUL model name.'],
  ['Model paths', 'Backend maps XGBoost, Random Forest, SVR, and LightGBM pickle files.'],
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

function DataTab() {
  return (
    <section className="demo-layout">
      <div className="section-copy">
        <span className="eyebrow">Data pipeline</span>
        <h2>Raw CMAPSS files, ingestion paths, and checked-in processed data.</h2>
        <p>
          The raw folder contains FD001-FD004 train, test, and RUL files. The producer script sends
          one RabbitMQ message per raw row, while direct ingestion writes PostgreSQL tables for each
          dataset split.
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
        <div className="counts-panel">
          <div>
            <span className="eyebrow">Raw file counts</span>
            <h3>Rows published by the RabbitMQ producer from data/raw.</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Dataset</th>
                  <th>Train</th>
                  <th>Test</th>
                  <th>RUL</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {tableCounts.map(([dataset, train, test, rul, total]) => (
                  <tr key={dataset}>
                    <td>{dataset}</td>
                    <td>{train}</td>
                    <td>{test}</td>
                    <td>{rul}</td>
                    <td>{total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="source-note">Source: data/raw files and ingestion/producer.py.</p>
        </div>

        <div className="counts-panel">
          <div>
            <span className="eyebrow">Processed CSV</span>
            <h3>Verified summary for data/preprocessed_data.csv.</h3>
          </div>
          <div className="fact-grid">
            {processedFacts.map(([label, value]) => (
              <div className="fact" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <p className="source-note">
            Source: checked-in CSV. Sensor columns are Min-Max scaled between 0 and 1.
          </p>
        </div>
      </div>
    </section>
  );
}

function ModelsTab() {
  return (
    <section className="demo-layout">
      <div className="section-copy">
        <span className="eyebrow">Model results</span>
        <h2>Notebook-recorded RUL regression results.</h2>
        <p>
          The model notebook computes RUL from each engine cycle, trains four regressors, and records
          evaluation metrics on a 26,185 / 6,547 train-test split.
        </p>
      </div>

      <div className="results-split">
        <div className="counts-panel">
          <div>
            <span className="eyebrow">Evaluation metrics</span>
            <h3>Lower MAE/RMSE is better; higher R2 and tolerance accuracy is better.</h3>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>MAE</th>
                  <th>RMSE</th>
                  <th>R2</th>
                  <th>Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {modelMetrics.map(([model, mae, rmse, r2, accuracy]) => (
                  <tr key={model}>
                    <td>{model}</td>
                    <td>{mae}</td>
                    <td>{rmse}</td>
                    <td>{r2}</td>
                    <td>{accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="source-note">Source: output stored in notebooks/ml.ipynb.</p>
        </div>

        <div className="counts-panel">
          <div>
            <span className="eyebrow">Backend contract</span>
            <h3>What the Flask API is wired to serve.</h3>
          </div>
          <div className="api-list">
            {apiFacts.map(([label, value]) => (
              <div className="api-row" key={label}>
                <strong>{label}</strong>
                <p>{value}</p>
              </div>
            ))}
          </div>
          <p className="source-note">Source: web_interface_be/server.py.</p>
        </div>
      </div>
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

function ContributionTab() {
  return (
    <section className="contribution-layout single">
      <div className="section-copy narrow">
        <span className="eyebrow">Contribution</span>
        <h2>School project during an ERASMUS exchange program at CNAM Paris.</h2>
        <div className="academic-card">
          <Image src="/cnam-logo.svg" alt="CNAM Paris" width={140} height={28} />
          <div>
            <p>
              AeroRUL was completed as a school project during an ERASMUS exchange program at CNAM
              Paris.
            </p>
            <p className="course-line">
              Part of the USEES8 - Big Data Technologies for Connected Industries course.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const content = {
    overview: <OverviewTab />,
    data: <DataTab />,
    models: <ModelsTab />,
    stack: <StackTab />,
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
              <a
                href="https://github.com/EYA179/AeroRUL-Predictive-Maintenance"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repo
              </a>
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
