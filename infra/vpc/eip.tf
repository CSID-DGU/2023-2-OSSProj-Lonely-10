resource "aws_eip" "ossp-eip" {
    tags = {
        "Name" = "ossp-eip"
    }
}