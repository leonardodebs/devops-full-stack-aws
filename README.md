# DevOps Full Stack AWS - Documentação em Português

> Um projeto DevOps pronto para produção que demonstra Infraestrutura como Código, containerização, pipelines CI/CD e observabilidade em nuvem na AWS.

## Sumário

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Pilha de Tecnologias](#pilha-de-tecnologias)
4. [Pré-requisitos](#pré-requisitos)
5. [Como Começar](#como-começar)
6. [Estrutura do Projeto](#estrutura-do-projeto)
7. [Pipeline CI/CD](#pipeline-cicd)
8. [Infraestrutura](#infraestrutura)
9. [Monitoramento](#monitoramento)
10. [Variáveis de Ambiente](#variáveis-de-ambiente)
11. [Contribuindo](#contribuindo)
12. [Licença](#licença)

## Visão Geral

Este projeto demonstra as melhores práticas de DevOps modernas usando a AWS como provedor de nuvem. Ele inclui:

- **Aplicação**: API RESTful construída com Python e FastAPI
- **Containerização**: Empacotamento da aplicação usando Docker
- **Infraestrutura como Código**: Provisionamento de recursos AWS usando Terraform
- **CI/CD**: Pipelines automatizados usando GitHub Actions
- **Monitoramento e Observabilidade**: CloudWatch da AWS e stack local Prometheus/Grafana

## Arquitetura

### Diagrama de Arquitetura

```
                                 [ Usuários ]
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
    (Subnet Privada A)                             (Subnet Privada B)
              |                                               |
              +-----------------------+-----------------------+
                                      |
                                      v
                           [ CloudWatch / Logs ]
```

### Componentes da Arquitetura

1. **Camada de Aplicação**
   - API RESTful com endpoints para verificação de saúde e informações do sistema
   - Construída com Python/FastAPI para alto desempenho

2. **Containerização**
   - Docker para empacotamento consistente da aplicação
   - docker-compose para orquestração local de serviços

3. **Infraestrutura AWS (via Terraform)**
   - **VPC**: Rede isolada com subnets públicas e privadas em 2 Zonas de Disponibilidade
   - **Application Load Balancer (ALB)**: Distribui tráfego para tarefas ECS
   - **Amazon ECS Fargate**: Orquestração de containers sem servidor
   - **Amazon ECR**: Registro privado de Docker com políticas de lifecycle
   - **NAT Gateway**: Permite que tarefas privadas acessem a internet para atualizações
   - **IAM**: Funções com privilégios mínimos para execução de tarefas

4. **Monitoramento**
   - **AWS CloudWatch**: Insights de containers e logs
   - **Stack Local**: Prometheus e Grafana para desenvolvimento e testes

## Pilha de Tecnologias

| Categoria | Tecnologia | Propósito |
|-----------|------------|-----------|
| **Aplicação** | Python / FastAPI | API web de alto desempenho |
| **Container** | Docker | Empacotamento da aplicação |
| **IaC** | Terraform | Provisionamento de infraestrutura |
| **Nuvem** | AWS | Provedor de nuvem (ECS, ECR, ALB, VPC) |
| **CI/CD** | GitHub Actions | Pipelines automatizados |
| **Monitoramento** | CloudWatch / Grafana | Observabilidade e logging |

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- AWS CLI v2
- Terraform v1.7+
- Docker & Docker Compose
- Python 3.11
- Conta no GitHub
- Conta na AWS com permissões adequadas

## Como Começar

### 1. Clone o Repositório

```bash
git clone https://github.com/seuusuario/devops-fullstack-aws.git
cd devops-fullstack-aws
```

### 2. Configure o Ambiente

```bash
cp .env.example .env
# Edite o arquivo .env com seus detalhes da AWS:
# AWS_REGION=sua-região
# AWS_ACCOUNT_ID=sua-conta-id
# ENVIRONMENT=dev
# APP_VERSION=1.0.0
```

### 3. Deploy da Infraestrutura

```bash
make setup          # Torna os scripts executáveis e executa o setup
make tf-init      # Inicializa o Terraform no ambiente dev
make tf-apply     # Aplica a configuração do Terraform
```

### 4. Executar Localmente (Desenvolvimento)

```bash
make run            # Inicia os serviços do docker-compose
# Acesse:
# - API: http://localhost:8000
# - Prometheus: http://localhost:9090
# - Grafana: http://localhost:3001 (usuário: admin, senha: admin)
```

### 5. Testes

```bash
make test           # Executa testes unitários com cobertura
make lint           # Executa verificações de qualidade de código
```

## Estrutura do Projeto

```
devops-fullstack-aws/
├── .github/workflows/   # Pipelines CI/CD (3 arquivos YAML)
├── app/                 # Código da aplicação FastAPI
│   ├── main.py          # Endpoints da API
│   ├── requirements.txt # Dependências Python
│   └── tests/           # Testes unitários
├── docker/              # Configurações do Docker
│   ├── docker-compose.yml
│   ├── prometheus.yml
│   └── Dockerfile
├── terraform/           # Infraestrutura como Código
│   ├── modules/         # Módulos Terraform reutilizáveis
│   └── environments/    # Configurações específicas de ambiente (dev)
├── monitoring/          # Dashboards e configurações de monitoramento
├── scripts/             # Scripts utilitários (setup, destroy)
├── docs/                # Documentação de arquitetura e runbooks
├── .env.example         # Template de variáveis de ambiente
├── Makefile             # Comandos de conveniência
└── README.md            # Documentação do projeto
```

## Pipeline CI/CD

O projeto utiliza GitHub Actions com três workflows:

### 1. Workflow de Pull Request (`01-lint-test.yml`)
- Disparado em pull requests
- Executa: linting, testes unitários, validação do Terraform

### 2. Workflow de Build/Push (`02-build-push.yml`)
- Disparado ao fazer merge para a branch `main`
- Executa: build da Docker image, push para o ECR

### 3. Workflow de Deploy (`03-deploy.yml`)
- Disparado após o workflow de build/push
- Executa: atualização do serviço ECS com a nova imagem

## Infraestrutura

A infraestrutura é modularizada para reutilização:

- **Networking**: VPC, Subnets, NAT Gateway
- **ECR**: Registro privado com políticas de lifecycle
- **ALB**: Load balancer público voltado para a internet
- **ECS**: Cluster e serviço Fargate com auto-scaling
- **IAM**: Funções e políticas com privilégios mínimos

## Monitoramento

### AWS (Produção)
- **CloudWatch Container Insights**: Métricas de desempenho de containers
- **CloudWatch Logs**: Centralização de logs da aplicação
- **Alarmes**: Configuráveis para métricas críticas

### Local (Desenvolvimento)
- **Prometheus**: Coleta e armazenamento de métricas
- **Grafana**: Visualização de dashboards
- **docker-compose.yml**: Orquestração local dos serviços de monitoramento

## Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| AWS_REGION | Região da AWS alvo | Sim |
| ENVIRONMENT | Nome do ambiente (dev/prod) | Sim |
| APP_VERSION | Versão da aplicação | Não |
| AWS_ACCOUNT_ID | ID da conta AWS | Sim (para ECR) |

> **Importante**: Credenciais da AWS (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) devem ser configuradas como secrets no GitHub Actions ou variáveis de ambiente locais, nunca commitadas no repositório.

## Contribuindo

1. Crie uma branch para sua feature: `git checkout -b feature/nome-da-feature`
2. Certifique-se de que os testes passam: `make test`
3. Submit um Pull Request para a branch `main`
4. Siga o estilo de código existente (verificado pelo `make lint`)

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Recursos Adicionais

- [Documentação de Arquitetura](./docs/architecture.md) - Detalhes técnicos da arquitetura
- [Runbook](./docs/runbook.md) - Procedimentos operacionais e troubleshooting
- [Exemplos de Variáveis de Ambiente](./.env.example) - Template para configuração

---

*Documentação gerada em Português Brasileiro para facilitar o entendimento e uso do projeto por equipes de fala portuguesa.*