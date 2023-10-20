resource "aws_security_group" "ossp-bh-sg" {
    vpc_id = aws_vpc.ossp-vpc.id
    name = "ossp-bh-sg"
    description = "ossp-bh-sg"

    tags = {
        Name = "ossp-bh-sg"
    }
}

resource "aws_security_group" "ossp-exlb-sg" {
    vpc_id = aws_vpc.ossp-vpc.id
    name = "ossp-exlb-sg"
    description = "ossp-exlb-sg"

    tags = {
        Name = "ossp-exlb-sg"
    }
}

resource "aws_security_group" "ossp-web-sg" {
    vpc_id = aws_vpc.ossp-vpc.id
    name = "ossp-web-sg"
    description = "ossp-web-sg"

    tags = {
        Name = "ossp-web-sg"
    }
}

resource "aws_security_group" "ossp-inlb-sg" {
    vpc_id = aws_vpc.ossp-vpc.id
    name = "ossp-inlb-sg"
    description = "ossp-inlb-sg"

    tags = {
        Name = "ossp-inlb-sg"
    }
}

resource "aws_security_group" "ossp-was-sg" {
    vpc_id = aws_vpc.ossp-vpc.id
    name = "ossp-was-sg"
    description = "ossp-was-sg"

    tags = {
        Name = "ossp-was-sg"
    }
}

resource "aws_security_group" "ossp-db-sg" {
    vpc_id = aws_vpc.ossp-vpc.id
    name = "ossp-db-sg"
    description = "ossp-db-sg"

    tags = {
        Name = "ossp-db-sg"
    }
}

resource "aws_security_group_rule" "ossp-bh-sg-ingress" {
    type = "ingress"
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [var.cidr_block["cidr-all"]]

    security_group_id = aws_security_group.ossp-bh-sg.id
}

resource "aws_security_group_rule" "ossp-bh-sg-egress" {
    type = "egress"
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [var.cidr_block["cidr-all"]]

    security_group_id = aws_security_group.ossp-bh-sg.id
}

resource "aws_security_group_rule" "ossp-exlb-sg-ingress" {
    type = "ingress"
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = [var.cidr_block["cidr-all"]]

    security_group_id = aws_security_group.ossp-exlb-sg.id
}

resource "aws_security_group_rule" "ossp-exlb-sg-egress" {
    type = "egress"
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [var.cidr_block["cidr-all"]]

    security_group_id = aws_security_group.ossp-exlb-sg.id
}

resource "aws_security_group_rule" "ossp-web-sg-ingress" {
    type = "ingress"
    from_port = 80
    to_port = 80
    protocol = "tcp"

    security_group_id = aws_security_group.ossp-web-sg.id
    source_security_group_id = aws_security_group.ossp-exlb-sg.id
}

resource "aws_security_group_rule" "ossp-web-sg-ingress2" {
    type = "ingress"
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [var.cidr_block["cidr-all"]]

    security_group_id = aws_security_group.ossp-web-sg.id
}

resource "aws_security_group_rule" "ossp-web-sg-egress" {
    type = "egress"
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [var.cidr_block["cidr-all"]]

    security_group_id = aws_security_group.ossp-web-sg.id
}

resource "aws_security_group_rule" "ossp-inlb-sg-ingress" {
    type = "ingress"
    from_port = 8080
    to_port = 8080
    protocol = "tcp"

    security_group_id = aws_security_group.ossp-inlb-sg.id
    source_security_group_id = aws_security_group.ossp-web-sg.id
}

resource "aws_security_group_rule" "ossp-inlb-sg-egress" {
    type = "egress"
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [var.cidr_block["cidr-all"]]

    security_group_id = aws_security_group.ossp-inlb-sg.id
}

resource "aws_security_group_rule" "ossp-was-sg-ingress" {
    type = "ingress"
    from_port = 8080
    to_port = 8080
    protocol = "tcp"

    security_group_id = aws_security_group.ossp-was-sg.id
    source_security_group_id = aws_security_group.ossp-inlb-sg.id
}

resource "aws_security_group_rule" "ossp-was-sg-ingress2" {
    type = "ingress"
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [var.cidr_block["cidr-all"]]

    security_group_id = aws_security_group.ossp-was-sg.id
}

resource "aws_security_group_rule" "ossp-was-sg-egress" {
    type = "egress"
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [var.cidr_block["cidr-all"]]

    security_group_id = aws_security_group.ossp-was-sg.id
}

resource "aws_security_group_rule" "ossp-db-sg-ingress" {
    type = "ingress"
    from_port = 3306
    to_port = 3306
    protocol = "tcp"
    cidr_blocks = [var.cidr_block["cidr-all"]]

    security_group_id = aws_security_group.ossp-db-sg.id
}

resource "aws_security_group_rule" "ossp-db-sg-egress" {
    type = "egress"
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [var.cidr_block["cidr-all"]]

    security_group_id = aws_security_group.ossp-db-sg.id
}