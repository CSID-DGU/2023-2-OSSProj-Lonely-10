terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 4.16"
        }
    }
    required_version = ">= 1.2.0"
}

module "vpc" {
    source = "./vpc"
}

module "rds" {
    source = "./rds"
}

module "ec2" {
    source = "./ec2"
}
