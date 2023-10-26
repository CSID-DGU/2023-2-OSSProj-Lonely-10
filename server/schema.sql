create table `db_name`.`user` (
    `user_id` bigint primary key auto_increment,
    `user_code` bigint unique not null,
    `hashed_password` varchar(255) not null
);

create table `db_name`.`user_info` (
    `user_id` bigint not null,
    `name` varchar(255) not null,
    `email` varchar(255) not null,
    `department` varchar(255) not null,
    `semester` int not null,
    `major` varchar(255) not null,
    `phone_number` varchar(255) not null
);

create table `db_name`.`todo` (
    `todo_id` bigint primary key auto_increment,
    `user_id` bigint not null,
    `content` varchar(255) not null,
    `is_completed` boolean not null,
    `created_at` datetime not null
);

create table `db_name`.`schedule` (
    `schedule_id` bigint primary key auto_increment,
    `title` varchar(255) not null,
    `description` varchar(255) not null,
    `date` datetime not null
);

create table `db_name`.`grade` (
    `grade_id` bigint primary key auto_increment,
    `user_id` bigint not null,
    `course_name` varchar(255) not null,
    `score` varchar(255) not null,
    `semester` int not null
);

create table `db_name`.`course` (
    `course_id` bigint primary key auto_increment,
    `course_code` varchar(255) unique not null,
    `course_name` varchar(255) not null,
    `professor` varchar(255) not null,
    `is_online` boolean not null
);

create table `db_name`.`course_info` (
    `course_id` bigint not null,
    `days` varchar(255),
    `class_room` varchar(255),
    `start_time` time,
    `end_time` time
);

create table `db_name`.`enrollment` (
    `enrollment_id` bigint primary key auto_increment,
    `user_id` bigint not null,
    `course_id` bigint not null,
    `status` boolean
);

create table `db_name`.`attendance` (
    `attendance_id` bigint primary key auto_increment,
    `enrollment_id` bigint not null,
    `date` datetime not null,
    `status` varchar(255) not null
);

create table `db_name`.`score` (
    `score_id` bigint primary key auto_increment,
    `enrollment_id` bigint not null,
    `date` datetime not null,
    `type` varchar(255) not null,
    `score` smallint not null
);

create table `db_name`.`announcement` (
    `announcement_id` bigint primary key auto_increment,
    `course_id` bigint not null,
    `title` varchar(255) not null,
    `content` varchar(255) not null,
    `writer` varchar(255) not null,
    `created_at` datetime not null
);

create table `db_name`.`assignment` (
    `assignment_id` bigint primary key auto_increment,
    `course_id` bigint not null,
    `title` varchar(255) not null,
    `content` varchar(255) not null,
    `duration` datetime not null,
    `created_at` datetime not null
);

create table `db_name`.`notice` (
    `notice_id` bigint primary key auto_increment,
    `type` varchar(255) not null,
    `title` varchar(255) not null,
    `url` varchar(255) not null,
    `administrator` varchar(255) not null,
    `created_at` datetime not null
);

create table `db_name`.`authentication` (
    `authentication_id` bigint primary key auto_increment,
    `user_id` bigint not null,
    `access_token` varchar(255) not null,
    `refresh_token` varchar(255) not null,
    `expire_duration` int not null
);

create table `db_name`.`sampletable1` (
    `id` int primary key auto_increment,
    `title` varchar(255) not null,
    `content` text,
    `tags` JSON,
    `updated_at` timestamp not null default current_timestamp,
    `created_at` timestamp not null default current_timestamp
);

create table `db_name`.`sampletable2` (
    `id` int primary key auto_increment,
    `title` varchar(255) not null,
    `content` text,
    `updated_at` timestamp not null default current_timestamp,
    `created_at` timestamp not null default current_timestamp
);

alter table `user_info` add foreign key (`user_id`) references `user` (`user_id`);
alter table `authentication` add foreign key (`user_id`) references `user` (`user_id`);
alter table `todo` add foreign key (`user_id`) references `user` (`user_id`);
alter table `grade` add foreign key (`user_id`) references `user` (`user_id`);
alter table `enrollment` add foreign key (`user_id`) references `user` (`user_id`);
alter table `enrollment` add foreign key (`course_id`) references `course` (`course_id`);
alter table `attendance` add foreign key (`enrollment_id`) references `enrollment` (`enrollment_id`) on delete cascade;
alter table `score` add foreign key (`enrollment_id`) references `enrollment` (`enrollment_id`) on delete cascade;
alter table `course_info` add foreign key (`course_id`) references `course` (`course_id`);
alter table `announcement` add foreign key (`course_id`) references `course` (`course_id`);
alter table `assignment` add foreign key (`course_id`) references `course` (`course_id`);