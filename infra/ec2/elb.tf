resource "aws_lb" "ossp-external-elb" {
    name = "ossp-external-elb"
    subnets = [module.vpc.ossp-pub-subnet-a-id, module.vpc.ossp-pub-subnet-c-id]
    security_groups = [module.vpc.ossp-exlb-sg-id]
    load_balancer_type = "application"

    tags = {
        Name = "ossp-external-elb"
    }
}

resource "aws_lb" "ossp-internal-elb" {
    name = "ossp-internal-elb"
    subnets = [module.vpc.ossp-web-subnet-a-id, module.vpc.ossp-web-subnet-c-id]
    security_groups = [module.vpc.ossp-inlb-sg-id]
    load_balancer_type = "application"
    internal = true

    tags = {
        Name = "ossp-internal-elb"
    }
}

resource "aws_lb_target_group" "ossp-tg" {
    name = "ossp-tg"
    port = 80
    protocol = "HTTP"
    vpc_id = module.vpc.ossp-vpc-id

    health_check {
        interval = 30
        path = "/"
        healthy_threshold = 3
        unhealthy_threshold = 3
    }
}

resource "aws_lb_target_group" "ossp-tg-in" {
    name = "ossp-tg-in"
    port = 8080
    protocol = "HTTP"
    vpc_id = module.vpc.ossp-vpc-id

    health_check {
        interval = 30
        path = "/"
        healthy_threshold = 3
        unhealthy_threshold = 3
    }
}

resource "aws_lb_target_group_attachment" "ossp-tg-attach-a" {
    target_group_arn = aws_lb_target_group.ossp-tg.arn
    target_id = aws_instance.ossp-web-instance-a
    port = 80
}

resource "aws_lb_target_group_attachment" "ossp-tg-attach-c" {
    target_group_arn = aws_lb_target_group.ossp-tg.arn
    target_id = aws_instance.ossp-web-instance-c
    port = 80
}

resource "aws_lb_target_group_attachment" "ossp-tg-in-attach-a" {
    target_group_arn = aws_lb_target_group.ossp-tg-in.arn
    target_id = aws_instance.ossp-was-instance-a
    port = 8080
}

resource "aws_lb_target_group_attachment" "ossp-tg-in-attach-c" {
    target_group_arn = aws_lb_target_group.ossp-tg-in.arn
    target_id = aws_instance.ossp-was-instance-c
    port = 8080
}

resource "aws_alb_listener" "http" {
    load_balancer_arn = aws_lb.ossp-external-elb.arn
    port = 80
    protocol = "HTTP"

    default_action {
        target_group_arn = aws_lb_target_group.ossp-tg.arn
        type = "forward"
    }
}

resource "aws_alb_listener" "was" {
    load_balancer_arn = aws_lb.ossp-internal-elb.arn
    port = 8080
    protocol = "HTTP"

    default_action {
      target_group_arn = aws_lb_target_group.ossp-tg-in.arn
      type = "forward"
    }
} 