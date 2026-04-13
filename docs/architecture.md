# Arquitetura

## Visão Geral
Este projeto implementa uma infraestrutura altamente disponível, escalável e segura na AWS usando uma pilha DevOps moderna.

## Diagrama
```text
      +---------------------------------------------------------+
      |                      Internet                           |
      +--------------------------+------------------------------+
                                 |
                                 v
                  +--------------+--------------+
                  |  Application Load Balancer  | (Public Subnets)
                  +--------------+--------------+
                                 |
                                 v
      +--------------------------+------------------------------+
      |                  AWS ECS (Fargate)                      | (Private Subnets)
      |                                                         |
      |   +----------------+           +----------------+       |
      |   |  Task Instance |           |  Task Instance |       |
      |   +-------+--------+           +-------+--------+       |
      |           |                            |                |
      +-----------+----------------------------+----------------+
                  |                            |
                  v                            v
      +-----------+----------------------------+----------------+
      |                  CloudWatch Logs                        |
      +---------------------------------------------------------+
```

## Componentes
- **VPC**: Rede isolada com subnets públicas e privadas em 2 Zonas de Disponibilidade.
- **ALB**: Distribui o tráfego de entrada para as tarefas ECS.
- **ECS Fargate**: Orquestração de containers sem servidor.
- **ECR**: Registro privado de Docker.
- **NAT Gateway**: Permite que tarefas privadas acessem a internet para atualizações.
- **IAM**: Funções com privilégios mínimos para execução de tarefas.