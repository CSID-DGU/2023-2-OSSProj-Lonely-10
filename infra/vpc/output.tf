output "ossp-vpc-id" {
    value = aws_vpc.ossp-vpc.id
}

output "ossp-pub-subnet-a-id" {
    value = aws_subnet.ossp-pub-subnet-a.id
}

output "ossp-pub-subnet-c-id" {
    value = aws_subnet.ossp-pub-subnet-c.id
}

output "ossp-web-subnet-a-id" {
    value = aws_subnet.ossp-web-subnet-a.id
}

output "ossp-web-subnet-c-id" {
    value = aws_subnet.ossp-web-subnet-c.id
}

output "ossp-was-subnet-a-id" {
    value = aws_subnet.ossp-was-subnet-a.id
}

output "ossp-was-subnet-c-id" {
    value = aws_subnet.ossp-was-subnet-c.id
}

output "ossp-bh-sg-id" {
    value = aws_security_group.ossp-bh-sg.id
}

output "ossp-web-sg-id" {
    value = aws_security_group.ossp-web-sg.id
}

output "ossp-was-sg-id" {
    value = aws_security_group.ossp-was-sg.id
}

output "ossp-exlb-sg-id" {
    value = aws_security_group.ossp-exlb-sg.id
}

output "ossp-inlb-sg-id" {
    value = aws_security_group.ossp-inlb-sg.id
}

output "ossp-db-subnet-a-id" {
    value = aws_subnet.ossp-db-subnet-a.id
}

output "ossp-db-subnet-c-id" {
    value = aws_subnet.ossp-db-subnet-c.id
}