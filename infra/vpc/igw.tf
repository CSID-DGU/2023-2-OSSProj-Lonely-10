resource "aws_internet_gateway" "ossp-igw" {
    vpc_id = aws_vpc.ossp-vpc.id

    tags = {
        "Name" = "ossp-igw"
    }
}
