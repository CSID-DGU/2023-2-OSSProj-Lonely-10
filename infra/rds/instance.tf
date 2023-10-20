resource "aws_db_instance" "ossp-rds" {
    allocated_storage = 10
    engine = "mysql"
    engine_version = "8.0.20"
    instance_class = "db.t2.micro"
    username = "ossp"
    password = "ossp"
    db_name = "ossp"
    skip_final_snapshot = true
    db_subnet_group_name = aws_db_subnet_group.ossp-subnet-group.name
    vpc_security_group_ids = aws_db_subnet_group.ossp-subnet-group
    multi_az = true
}