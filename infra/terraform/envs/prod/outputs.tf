output "vpc_id" {
  value = module.network.vpc_id
}

output "instance_id" {
  value = module.compute.instance_id
}

output "instance_public_ip" {
  value = module.compute.instance_public_ip
}
