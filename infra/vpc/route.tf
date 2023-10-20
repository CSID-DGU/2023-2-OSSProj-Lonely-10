resource "aws_route_table" "ossp-pub-route" {
    vpc_id = aws_vpc.ossp-vpc.id

    route {
        cidr_block = var.cidr_block["cidr_all"]
        gateway_id = aws_internet_gateway.ossp-igw.id
    }

    tags = {
        "Name" = "ossp-pub-route"
    }
}

resource "aws_route_table" "ossp-pri-route" {
    vpc_id = aws_vpc.ossp-vpc.id

    route {
        cidr_block = var.cidr_block["cidr_all"]
        gateway_id = aws_nat_gateway.ossp-ngw.id
    }

    tags = {
        "Name" = "ossp-pri-route"
    }
}

resource "aws_route_table_association" "pub-route-a" {
    subnet_id = aws_subnet.ossp-pub-subnet-a.id
    route_table_id = aws_route_table.ossp-pub-route.id
}

resource "aws_route_table_association" "pub-route-c" {
    subnet_id = aws_subnet.ossp-pub-subnet-c.id
    route_table_id = aws_route_table.ossp-pub-route.id
}

resource "aws_route_table_association" "pri-route-web-a" {
    subnet_id = aws_subnet.ossp-web-subnet-a.id
    route_table_id = aws_route_table.ossp-pri-route.id
}

resource "aws_route_table_association" "pri-route-web-c" {
    subnet_id = aws_subnet.ossp-web-subnet-c.id
    route_table_id = aws_route_table.ossp-pri-route.id
}

resource "aws_route_table_association" "pri-route-was-a" {
    subnet_id = aws_subnet.ossp-was-subnet-a.id
    route_table_id = aws_route_table.ossp-pri-route.id
}

resource "aws_route_table_association" "pri-route-was-c" {
    subnet_id = aws_subnet.ossp-was-subnet-c.id
    route_table_id = aws_route_table.ossp-pri-route.id
}

resource "aws_route_table_association" "pri-route-db-a" {
    subnet_id = aws_subnet.ossp-db-subnet-a.id
    route_table_id = aws_route_table.ossp-pri-route.id
}

resource "aws_route_table_association" "pri-route-db-c" {
    subnet_id = aws_subnet.ossp-db-subnet-c.id
    route_table_id = aws_route_table.ossp-pri-route.id
}