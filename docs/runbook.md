# Runbook

## Operações

### Desenvolvimento Local
1. Execute `make setup` para preparar os scripts.
2. Execute `make run` para iniciar a aplicação, Prometheus e Grafana.
3. Acesse a API em `http://localhost:8000`.

### Deploy na AWS
1. Garanta que a AWS CLI está configurada.
2. Execute `make setup` para criar o backend no S3.
3. Execute `make tf-init`.
4. Execute `make tf-apply`.

### Monitoramento
- **CloudWatch**: Verifique o grupo de logs `/ecs/devops-fullstack-aws`.
- **Dashboard**: Importe `monitoring/cloudwatch-dashboard.json` no CloudWatch.

### Troubleshooting
- **Tarefas ECS falhando**: Verifique os logs do CloudWatch para erros da aplicação.
- **Health Check do ALB falhando**: Garanta que o container está escutando na porta 8000 e que `/health` retorna 200.