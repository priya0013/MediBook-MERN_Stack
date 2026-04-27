variable "project_name" {
  type        = string
  description = "Project name"
}

variable "environment" {
  type        = string
  description = "Environment name"
}

variable "owner" {
  type        = string
  description = "Tag owner value"
}

variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "vpc_cidr" {
  type        = string
  description = "VPC CIDR block"
}

variable "public_subnet_cidrs" {
  type = map(object({
    cidr = string
    az   = string
  }))
}

variable "instance_subnet_key" {
  type        = string
  description = "Key of subnet map to place EC2"
}

variable "ami_id" {
  type        = string
  description = "AMI for EC2"
}

variable "instance_type" {
  type        = string
  description = "EC2 instance type"
}

variable "key_name" {
  type        = string
  description = "Existing AWS key pair name"
}

variable "allowed_ssh_cidrs" {
  type        = list(string)
  description = "Allowed CIDRs for SSH"
}
