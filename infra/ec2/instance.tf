resource "aws_instance" "ossp-bh-instance" {
    ami = "ami-086cae3329a3f7d75"
    instance_type = "t2.micro"
    subnet_id = module.vpc.ossp-pub-subnet-a-id
    vpc_security_group_ids = [module.vpc.ossp-bh-sg-id]
    key_name = aws_key_pair.public_key.key_name

    associate_public_ip_address = true

    tags = {
        Name = "ossp-bh-instance"
    }
}

resource "aws_instance" "ossp-web-instance-a" {
    ami = "ami-086cae3329a3f7d75"
    instance_type = "t2.micro"
    subnet_id = module.vpc.ossp-web-subnet-a-id
    vpc_security_group_ids = [module.vpc.ossp-web-sg-id]
    key_name = aws_key_pair.private_key.key_name

    associate_public_ip_address = false

    tags = {
        Name = "ossp-web-instance-a"
    }
}

resource "aws_instance" "ossp-web-instance-c" {
    ami = "ami-086cae3329a3f7d75"
    instance_type = "t2.micro"
    subnet_id = module.vpc.ossp-web-subnet-c-id
    vpc_security_group_ids = [module.vpc.ossp-web-sg-id]
    key_name = aws_key_pair.private_key.key_name

    associate_public_ip_address = false

    tags = {
        Name = "ossp-web-instance-c"
    }
}

resource "aws_instance" "ossp-was-instance-a" {
    ami = "ami-086cae3329a3f7d75"
    instance_type = "t2.micro"
    subnet_id = module.vpc.ossp-was-subnet-a-id
    vpc_security_group_ids = [module.vpc.ossp-was-sg-id]
    key_name = aws_key_pair.private_key.key_name

    associate_public_ip_address = false

    tags = {
        Name = "ossp-was-instance-a"
    }
}

resource "aws_instance" "ossp-was-instance-c" {
    ami = "ami-086cae3329a3f7d75"
    instance_type = "t2.micro"
    subnet_id = module.vpc.ossp-was-subnet-c-id
    vpc_security_group_ids = [module.vpc.ossp-was-sg-id]
    key_name = aws_key_pair.private_key.key_name

    associate_public_ip_address = false

    tags = {
        Name = "ossp-was-instance-c"
    }
}

