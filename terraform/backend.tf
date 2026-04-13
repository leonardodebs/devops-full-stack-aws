terraform {
  backend "s3" {
    bucket         = "devops-fullstack-aws-tfstate"
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-lock"
  }
}
