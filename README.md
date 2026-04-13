trad# DevOps Full Stack AWS

> A production-ready DevOps project showcasing Infrastructure as Code, containerization, CI/CD pipelines, and cloud observability on AWS.

## Architecture
```text
                                 [ Users ]
                                     |
                                     v
                          [ Route 53 / DNS ]
                                     |
                                     v
                      [ Application Load Balancer ]
                                     |
             +-----------------------+-----------------------+
             |                                               |
             v                                               v
    [ ECS Fargate Task ]                           [ ECS Fargate Task ]
    (Private Subnet A)                             (Private Subnet B)
             |                                               |
             +-----------------------+-----------------------+
                                     |
                                     v
                          [ CloudWatch / Logs ]
```

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| Application | Python / FastAPI | High-performance web API |
| Container | Docker | Application packaging |
| IaC | Terraform | Infrastructure provisioning |
| Cloud | AWS | Cloud provider (ECS, ECR, ALB, VPC) |
| CI/CD | GitHub Actions | Automated pipelines |
| Monitoring | CloudWatch / Grafana | Observability and logging |

## Prerequisites
- AWS CLI v2
- Terraform v1.7+
- Docker & Docker Compose
- Python 3.11
- GitHub Account

## Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/youruser/devops-fullstack-aws.git
   cd devops-fullstack-aws
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your AWS details
   ```

3. **Deploy Infrastructure**
   ```bash
   make setup
   make tf-init
   make tf-apply
   ```

4. **Run Locally**
   ```bash
   make run
   ```

## Project Structure
```text
devops-fullstack-aws/
├── .github/workflows/   # CI/CD Pipelines
├── app/                 # FastAPI Application code
├── docker/              # Dockerfile and local compose
├── terraform/           # Infrastructure as Code
│   ├── modules/         # Reusable modules (VPC, ECS, etc)
│   └── environments/    # Environment specific config
├── monitoring/          # Dashboards and local monitoring
├── scripts/             # Utility scripts
└── docs/                # Architecture and Runbooks
```

## CI/CD Pipeline
1. **Pull Request**: Triggers `01-lint-test.yml` (Linting, Unit Tests, Terraform Validate).
2. **Merge to Main**: Triggers `02-build-push.yml` (Docker Build, Push to ECR).
3. **Deployment**: Triggers `03-deploy.yml` (Update ECS Service).

## Infrastructure
The infrastructure is modularized for reusability:
- **Networking**: VPC, Subnets, NAT Gateway.
- **ECR**: Private registry with lifecycle policies.
- **ALB**: Public-facing load balancer.
- **ECS**: Fargate cluster and service with auto-scaling.

## Monitoring
- **AWS**: CloudWatch Container Insights and Logs.
- **Local**: Prometheus and Grafana included in `docker-compose.yml`.

## Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| AWS_REGION | Target AWS region | Yes |
| ENVIRONMENT | Environment name (dev/prod) | Yes |
| APP_VERSION | Application version | No |

## Contributing
1. Create a feature branch.
2. Ensure tests pass (`make test`).
3. Submit a PR to `main`.

## License
MIT
