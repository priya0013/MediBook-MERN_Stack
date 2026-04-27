# Terraform Infrastructure Automation Project (AWS)

This folder contains a production-style Terraform setup using:
- Reusable modules
- Environment separation (`dev`, `prod`)
- Remote state with S3 + DynamoDB lock
- Parameterized variables
- Tagging standards

## Project Structure

```text
infra/terraform/
  bootstrap-state/
  modules/
    network/
    compute/
  envs/
    dev/
    prod/
```

## What This Provisions

- One VPC with public subnets across 2 AZs
- Internet Gateway and route table associations
- One security group (SSH/HTTP inbound)
- One EC2 instance in a public subnet

## Prerequisites

- Terraform `>= 1.5.0`
- AWS CLI configured (`aws configure`)
- Existing AWS key pair (for EC2 SSH access)

## Step 1: Bootstrap Remote State (One Time)

From `infra/terraform/bootstrap-state`:

```bash
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform apply -var-file=terraform.tfvars
```

This creates:
- S3 bucket for Terraform state
- DynamoDB table for state locking

## Step 2: Configure Backend (Per Environment)

For both `envs/dev` and `envs/prod`:

```bash
cp backend.hcl.example backend.hcl
```

Update values in `backend.hcl` to match your bootstrap outputs.

## How To Run (Dev)

From `infra/terraform/envs/dev`:

```bash
cp terraform.tfvars.example terraform.tfvars
terraform init -backend-config=backend.hcl
terraform fmt -recursive
terraform validate
terraform plan -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

Destroy resources:

```bash
terraform destroy -var-file=terraform.tfvars
```

## How To Run (Prod)

From `infra/terraform/envs/prod`, run the same commands.

## CI/CD (GitHub Actions)

Workflows added:
- `.github/workflows/terraform-plan.yml` (PR + manual trigger)
- `.github/workflows/terraform-apply.yml` (main branch + manual trigger)

Required GitHub secrets:
- `AWS_REGION`
- `AWS_ROLE_TO_ASSUME`

Required repository files (not committed by default):
- `infra/terraform/envs/dev/backend.hcl`
- `infra/terraform/envs/prod/backend.hcl`
- `infra/terraform/envs/dev/terraform.tfvars`
- `infra/terraform/envs/prod/terraform.tfvars`

## Notes

- Copy `terraform.tfvars.example` to `terraform.tfvars` per environment and update values.
- Keep `backend.hcl` and `terraform.tfvars` private.
- Keep secrets out of Git.
