resource "aws_vpc" "ossp-vpc" {
    cidr_block = var.cidr_block["cidr_vpc"]
    enable_dns_hostnames = true

    tags = {
        "Name" = "ossp-vpc"
    }
}
