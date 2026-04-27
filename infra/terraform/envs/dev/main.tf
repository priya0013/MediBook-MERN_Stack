locals {
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Owner       = var.owner
  }
}

module "network" {
  source = "../../modules/network"

  project_name        = var.project_name
  environment         = var.environment
  vpc_cidr            = var.vpc_cidr
  public_subnet_cidrs = var.public_subnet_cidrs
  common_tags         = local.common_tags
}

module "compute" {
  source = "../../modules/compute"

  project_name      = var.project_name
  environment       = var.environment
  vpc_id            = module.network.vpc_id
  subnet_id         = module.network.public_subnet_ids[var.instance_subnet_key]
  ami_id            = var.ami_id
  instance_type     = var.instance_type
  key_name          = var.key_name
  allowed_ssh_cidrs = var.allowed_ssh_cidrs
  common_tags       = local.common_tags
}
