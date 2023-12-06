create table if not exists `user` (
    user_id bigint not null auto_increment,
    semester bigint,
    department varchar(255),
    hash_password varchar(255),
    major varchar(255),
    phone_number varchar(255),
    refresh_token varchar(255),
    user_code varchar(255),
    user_email varchar(255) unique,
    user_name varchar(255),
    primary key (user_id)
);

create table if not exists course (
    is_online bit,
    course_id bigint not null auto_increment,
    course_code varchar(255) unique,
    course_name varchar(255),
    professor varchar(255),
    primary key (course_id)
);

create table if not exists announcement (
    id bigint not null auto_increment,
    course_id bigint,
    title varchar(255),
    writer varchar(255),
    content tinytext,
    created_at datetime(6),
    primary key (id),
    foreign key (course_id) references course(course_id)
);

create table if not exists todo (
    todo_id bigint not null auto_increment,
    user_id bigint,
    content varchar(255),
    is_completed bit,
    created_at datetime(6),
    primary key (todo_id),
    foreign key (user_id) references `user`(user_id)
);

create table if not exists enrollment (
    course_id bigint,
    enrollment_id bigint not null auto_increment,
    user_id bigint,
    primary key (enrollment_id),
    foreign key (user_id) references `user`(user_id),
    foreign key (course_id) references course(course_id)
);

create table if not exists registeration (
    registeration_id bigint not null auto_increment,
    course_id bigint,
    user_id bigint,
    primary key (registeration_id),
    foreign key (user_id) references `user`(user_id),
    foreign key (course_id) references course(course_id)
);

create table if not exists score (
    score integer,
    date datetime(6),
    enrollment_id bigint,
    score_id bigint not null auto_increment,
    type varchar(255),
    primary key (score_id),
    foreign key (enrollment_id) references enrollment(enrollment_id)
);

create table if not exists schedule (
    date datetime(6),
    schedule_id bigint not null auto_increment,
    title varchar(255),
    description tinytext,
    primary key (schedule_id)
);

create table if not exists notice (
    created_at datetime(6),
    notice_id bigint not null auto_increment,
    administrator varchar(255),
    title varchar(255),
    type varchar(255),
    url varchar(255),
    primary key (notice_id)
);

create table if not exists `grade` (
    grade_id bigint not null auto_increment,
    semester bigint,
    user_id bigint,
    course_name varchar(255),
    score varchar(255),
    primary key (grade_id),
    foreign key (user_id) references `user`(user_id)
);

create table if not exists course_info (
    course_info_id bigint not null auto_increment,
    classroom varchar(255),
    course_code varchar(255),
    days varchar(255),
    end_time varchar(255),
    start_time varchar(255),
    primary key (course_info_id)
);

create table if not exists attendance (
    attendance_id bigint not null auto_increment,
    date datetime(6),
    enrollment_id bigint,
    status varchar(255),
    primary key (attendance_id),
    foreign key (enrollment_id) references enrollment(enrollment_id)
);

create table if not exists assignment (
    assignment_id bigint not null auto_increment,
    course_id bigint,
    created_at datetime(6),
    duration datetime(6),
    title varchar(255),
    content tinytext,
    primary key (assignment_id),
    foreign key (course_id) references course(course_id)
);
