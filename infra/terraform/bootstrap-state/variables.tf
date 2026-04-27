variable "aws_region" {
  type        = string
  description = "AWS region where state backend resources will be created"
}

variable "project_name" {
  type        = string
  description = "Project name prefix"
}

variable "environment" {
  type        = string
  description = "Environment name used in backend resource names"
}

variable "state_bucket_name" {
  type        = string
  description = "Globally unique S3 bucket name for Terraform state"
}

variable "lock_table_name" {
  type        = string
  description = "DynamoDB table name for Terraform state locking"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply"
  default     = {}
}
