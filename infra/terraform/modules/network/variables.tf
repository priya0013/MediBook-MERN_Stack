variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "vpc_cidr" {
  type = string
}

variable "public_subnet_cidrs" {
  type = map(object({
    cidr = string
    az   = string
  }))
}

variable "common_tags" {
  type = map(string)
}
