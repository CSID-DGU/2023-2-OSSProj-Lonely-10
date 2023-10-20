resource "aws_nat_gateway" "ossp-ngw" {
    allocation_id= aws_eip.ossp-eip.id
    subnet_id = aws_subnet.ossp-pub-subnet-a.id

    tags = {
        "Name" = "ossp-ngw"
    }
}