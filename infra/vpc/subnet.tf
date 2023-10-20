resource "aws_subnet" "ossp-pub-subnet-a" {
    vpc_id = aws_vpc.ossp-vpc.id
    cidr_block = var.cidr_block["cidr-pub-a"]
    availability_zone = var.az["az-a"]
    map_public_ip_on_launch = false

    tags = {
        "Name" = "ossp-pub-subnet-a"
    }
}

resource "aws_subnet" "ossp-pub-subnet-c" {
    vpc_id = aws_vpc.ossp-vpc.id
    cidr_block = var.cidr_block["cidr-pub-c"]
    availability_zone = var.az["az-c"]
    map_public_ip_on_launch = false

    tags = {
        "Name" = "ossp-pub-subnet-c"
    }
}

resource "aws_subnet" "ossp-web-subnet-a" {
    vpc_id = aws_vpc.ossp-vpc.id
    cidr_block = var.cidr_block["cidr-web-a"]
    availability_zone = var.az["az-a"]
    map_public_ip_on_launch = false

    tags = {
        "Name" = "ossp-web-subnet-a"
    }
}

resource "aws_subnet" "ossp-web-subnet-c" {
    vpc_id = aws_vpc.ossp-vpc.id
    cidr_block = var.cidr_block["cidr-web-c"]
    availability_zone = var.az["az-c"]
    map_public_ip_on_launch = false

    tags = {
        "Name" = "ossp-web-subnet-c"
    }
}

resource "aws_subnet" "ossp-was-subnet-a" {
    vpc_id = aws_vpc.ossp-vpc.id
    cidr_block = var.cidr_block["cidr-was-a"]
    availability_zone = var.az["az-a"]
    map_public_ip_on_launch = false

    tags = {
        "Name" = "ossp-was-subnet-a"
    }
}

resource "aws_subnet" "ossp-was-subnet-c" {
    vpc_id = aws_vpc.ossp-vpc.id
    cidr_block = var.cidr_block["cidr-was-c"]
    availability_zone = var.az["az-c"]
    map_public_ip_on_launch = false

    tags = {
        "Name" = "ossp-was-subnet-c"
    }
}

resource "aws_subnet" "ossp-db-subnet-a" {
    vpc_id = aws_vpc.ossp-vpc.id
    cidr_block = var.cidr_block["cidr-db-a"]
    availability_zone = var.az["az-a"]
    map_public_ip_on_launch = false

    tags = {
        "Name" = "ossp-db-subnet-a"
    }
}

resource "aws_subnet" "ossp-db-subnet-c" {
    vpc_id = aws_vpc.ossp-vpc.id
    cidr_block = var.cidr_block["cidr-db-c"]
    availability_zone = var.az["az-c"]
    map_public_ip_on_launch = false

    tags = {
        "Name" = "ossp-db-subnet-c"
    }
}