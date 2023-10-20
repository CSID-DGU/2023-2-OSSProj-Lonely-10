resource "aws_db_subnet_group" "ossp-subnet-group" {
    name = "ossp-subnet-group"
    subnet_ids = [
        module.vpc.ossp-db-subnet-a-id,
        module.vpc.ossp-db-subnet-c-id
    ]

    tags = {
        Name = "ossp-subnet-group"
    }
}