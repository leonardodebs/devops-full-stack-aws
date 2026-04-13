# Architecture

## Overview
This project implements a highly available, scalable, and secure infrastructure on AWS using a modern DevOps stack.

## Diagram
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

## Components
- **VPC**: Isolated network with public and private subnets across 2 AZs.
- **ALB**: Distributes incoming traffic to ECS tasks.
- **ECS Fargate**: Serverless container orchestration.
- **ECR**: Private Docker registry.
- **NAT Gateway**: Allows private tasks to access the internet for updates.
- **IAM**: Least privilege roles for task execution.
