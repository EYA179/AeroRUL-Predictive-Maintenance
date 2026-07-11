# AeroRUL Predictive Maintenance

AeroRUL is an end-to-end predictive maintenance project built on NASA's CMAPSS jet engine simulation dataset. It includes raw CMAPSS data, a preprocessed dataset, ingestion scripts for PostgreSQL/RabbitMQ, notebooks for preprocessing and model training, and a small Flask + Next.js interface for viewing model results and submitting Remaining Useful Life (RUL) prediction files.

## Project Highlights

- Uses NASA CMAPSS run-to-failure engine sensor data across FD001-FD004.
- Preprocesses engine telemetry with missing-value checks, Z-score outlier removal, and Min-Max scaling.
- Produces a processed dataset with 98,196 rows and 28 columns.
- Includes direct PostgreSQL ingestion and RabbitMQ producer/consumer examples.
- Provides a web interface scaffold for model metrics and Remaining Useful Life (RUL) predictions.

## Repository Structure

```text
.
|-- data/
|   |-- raw/                    # Original CMAPSS train/test/RUL text files
|   |-- preprocessed_data.csv   # Processed dataset used for verification/training
|   `-- readme.txt              # Original dataset notes
|-- docs/
|   `-- preprocessing_report.md
|-- ingestion/
|   |-- direct_ingestion.py     # Load CMAPSS data directly into PostgreSQL
|   |-- producer.py             # Publish CMAPSS rows to RabbitMQ
|   `-- consumer.py             # Consume RabbitMQ messages into PostgreSQL
|-- notebooks/
|   |-- preprocessing_fixed.ipynb
|   `-- ml.ipynb
|-- scripts/
|   `-- run_postgres.ps1        # Starts PostgreSQL and RabbitMQ with Docker on Windows/PowerShell
|-- web_interface/              # Next.js frontend
|-- web_interface_be/           # Flask backend
|-- requirements.txt
`-- verify_data.py              # Quick local dataset verification
```

## Quick Start

Create a Python environment and install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Verify the processed dataset:

```bash
python verify_data.py
```

Expected result: the script should load `data/preprocessed_data.csv`, report a shape of `(98196, 28)`, and show zero missing values.

## Optional: Ingestion Services

The ingestion scripts expect PostgreSQL at:

```text
postgresql://myuser:mypassword@localhost:5432/mydatabase
```

On Windows/PowerShell, start PostgreSQL and RabbitMQ with:

```powershell
.\scripts\run_postgres.ps1
```

On macOS/Linux, start the same services with Docker:

```bash
docker run -d --name my-postgres -p 5432:5432 \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydatabase \
  postgres:latest

docker run -d --name my-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Then run either direct ingestion:

```bash
python ingestion/direct_ingestion.py
```

Or RabbitMQ-based ingestion:

```bash
python ingestion/consumer.py
python ingestion/producer.py
```

The RabbitMQ consumer is a long-running worker. Stop it with `Ctrl+C` after the queue drains so it can flush any final partial batches to PostgreSQL.

## Web Interface

The `web_interface/` app presents the AeroRUL project as a Next.js site that can be hosted on Vercel. It includes the project overview, stack, workflow, results, and academic context.

To deploy it on Vercel, set the project root to `web_interface/`, keep the build command as `npm run build`, and use the default Next.js output.

Start the Flask backend from the project root:

```bash
source .venv/bin/activate
python web_interface_be/server.py
```

In a second terminal, install and run the frontend:

```bash
cd web_interface
npm ci
npm run dev
```

Then open `http://localhost:3000`.

Notes:

- The `/api/data` endpoint expects a PostgreSQL table named `trainning_data_results`.
- The `/api/rul` endpoint expects trained model files under `notebooks/models/`.
- `notebooks/models/` is ignored by Git because trained model artifacts can be large and should be regenerated or stored separately.

## Verification

The following checks were run successfully:

```bash
python verify_data.py
python -m py_compile verify_data.py ingestion/direct_ingestion.py ingestion/producer.py ingestion/consumer.py web_interface_be/server.py
cd web_interface && npm run lint
cd web_interface && npm run build
```

Docker-backed verification was also run successfully with PostgreSQL and RabbitMQ containers. Direct ingestion created the expected PostgreSQL tables, and RabbitMQ producer/consumer ingestion drained `265,963` messages with matching row counts for all FD001-FD004 train/test/RUL tables.

## Academic Context

This was a school project during an ERASMUS exchange program at CNAM Paris.

## Dataset

CMAPSS stands for Commercial Modular Aero-Propulsion System Simulation. The dataset contains operational settings and sensor measurements for simulated aircraft engines over time, including run-to-failure trajectories used for Remaining Useful Life prediction.

Preprocessing details are documented in `docs/preprocessing_report.md`.
