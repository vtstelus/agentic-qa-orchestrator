terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_ecs_cluster" "qa_orchestrator" {
  name = "agentic-qa-orchestrator"
  tags = {
    Project = "Agentic QA Orchestrator"
    Owner   = "Vinoth Rathinam"
  }
}
