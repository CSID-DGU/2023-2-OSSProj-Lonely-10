resource "aws_db_subnet_group" "ossp-subnet-group" {
    name = "ossp-subnet-group"
    subnet_ids = [
        aws_subnet.ossp-db-subnet-a.id,
        aws_subnet.ossp-db-subnet-c.id
    ]

    tags = {
        Name = "ossp-subnet-group"
    }
}