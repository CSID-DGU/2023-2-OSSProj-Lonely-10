resource "aws_key_pair" "public_key" {
    key_name = "public-key"
    public_key = file("~/.ssh/osspub.pub")
}

resource "aws_key_pair" "private_key" {
    key_name = "private-key"
    public_key = file("~/.ssh/osspri.pub")
}