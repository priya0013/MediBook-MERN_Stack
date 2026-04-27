bucket         = "medibook-terraform-state-unique-suffix"
key            = "medibook/dev/terraform.tfstate"
region         = "ap-south-1"
dynamodb_table = "medibook-terraform-locks"
encrypt        = true
