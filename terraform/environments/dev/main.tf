terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "networking" {
  source      = "../../modules/networking"
  project_name = var.project_name
  environment  = var.environment
  owner        = var.owner
  vpc_cidr     = var.vpc_cidr
  availability_zones = var.availability_zones
}

module "ecr" {
  source          = "../../modules/ecr"
  project_name    = var.project_name
  environment     = var.environment
  owner           = var.owner
  repository_name = "${var.project_name}-repo"
}

module "alb" {
  source             = "../../modules/alb"
  project_name       = var.project_name
  environment        = var.environment
  owner              = var.owner
  vpc_id             = module.networking.vpc_id
  public_subnets_ids = module.networking.public_subnets_ids
}

module "ecs" {
  source                = "../../modules/ecs"
  project_name          = var.project_name
  environment           = var.environment
  owner                 = var.owner
  aws_region            = var.aws_region
  vpc_id                = module.networking.vpc_id
  private_subnets_ids   = module.networking.private_subnets_ids
  alb_security_group_id = module.alb.alb_security_group_id
  target_group_arn      = module.alb.target_group_arn
  container_name        = var.project_name
  container_image       = "${module.ecr.repository_url}:latest"
}
