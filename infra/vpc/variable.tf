variable "az" {
    type = map
    default = {
        az-a = "ap-northeast-2a"
        az-c = "ap-northeast-2c"
    }
}

variable "cidr_block" {
    type = map
    default = {
        cidr-all = "0.0.0.0/0"
        cidr-vpc = "10.0.0.0/16"
        cidr-pub-a = "10.0.0.0/24"
        cidr-pub-c = "10.0.10.0/24"
        cidr-web-a = "10.0.1.0/24"
        cidr-web-c = "10.0.11.0/24"
        cidr-was-a = "10.0.2.0/24"
        cidr-was-c = "10.0.12.0/24"
        cidr-db-a = "10.0.3.0/24"
        cidr-db-c = "10.0.13.0/24"
    }
}