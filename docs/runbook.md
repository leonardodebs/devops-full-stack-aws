# Runbook

## Operations

### Local Development
1. Run `make setup` to prepare scripts.
2. Run `make run` to start the app, Prometheus, and Grafana.
3. Access the API at `http://localhost:8000`.

### Deployment to AWS
1. Ensure AWS CLI is configured.
2. Run `make setup` to create the S3 backend.
3. Run `make tf-init`.
4. Run `make tf-apply`.

### Monitoring
- **CloudWatch**: Check the `/ecs/devops-fullstack-aws` log group.
- **Dashboard**: Import `monitoring/cloudwatch-dashboard.json` into CloudWatch.

### Troubleshooting
- **ECS Tasks failing**: Check CloudWatch logs for application errors.
- **ALB Health Check failing**: Ensure the container is listening on port 8000 and `/health` returns 200.
