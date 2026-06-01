create table role (
    id bigserial primary key,
    name varchar(30) unique not null
);

create table app_user (
    id bigserial primary key,
    email varchar(255) unique not null,
    password varchar(255) not null,
    role_id bigint not null references role(id),
    enabled boolean not null default true,
    created_at timestamp not null
);

create table client_profile (
    id bigserial primary key,
    user_id bigint unique not null references app_user(id),
    first_name varchar(120),
    last_name varchar(120),
    phone varchar(50)
);

create table esthetician_profile (
    id bigserial primary key,
    user_id bigint unique not null references app_user(id),
    display_name varchar(200),
    bio text,
    skills text,
    image_url text
);

create table service_category (
    id bigserial primary key,
    name varchar(160) not null,
    description text,
    image_url text
);

create table beauty_service (
    id bigserial primary key,
    name varchar(200) not null,
    description text,
    price numeric(10,2) not null,
    duration_minutes int not null,
    category_id bigint references service_category(id)
);

create table pack (
    id bigserial primary key,
    name varchar(200) not null,
    description text,
    price numeric(10,2) not null
);

create table pack_service (
    pack_id bigint not null references pack(id) on delete cascade,
    service_id bigint not null references beauty_service(id) on delete cascade,
    primary key (pack_id, service_id)
);

create table pack_image_urls (
    pack_id bigint not null references pack(id) on delete cascade,
    image_url text not null
);

create table promotion (
    id bigserial primary key,
    title varchar(200) not null,
    description text,
    discount_percent numeric(5,2) not null,
    start_date date not null,
    end_date date not null
);

create table promotion_image_urls (
    promotion_id bigint not null references promotion(id) on delete cascade,
    image_url text not null
);

create table reservation (
    id bigserial primary key,
    client_id bigint not null references client_profile(id),
    esthetician_id bigint not null references esthetician_profile(id),
    service_id bigint not null references beauty_service(id),
    status varchar(40) not null,
    start_time timestamp not null,
    end_time timestamp not null,
    total_price numeric(10,2) not null,
    notes text,
    created_at timestamp not null
);

create table schedule (
    id bigserial primary key,
    esthetician_id bigint not null references esthetician_profile(id) on delete cascade,
    day_of_week varchar(20) not null,
    start_time time not null,
    end_time time not null,
    enabled boolean not null default true
);

create table availability (
    id bigserial primary key,
    esthetician_id bigint not null references esthetician_profile(id) on delete cascade,
    date date not null,
    start_time time not null,
    end_time time not null,
    type varchar(20) not null,
    reason varchar(255)
);

create table review (
    id bigserial primary key,
    client_id bigint not null references client_profile(id),
    service_id bigint references beauty_service(id),
    esthetician_id bigint references esthetician_profile(id),
    rating int not null,
    comment text,
    created_at timestamp not null
);

create table gallery_item (
    id bigserial primary key,
    title varchar(200),
    category varchar(50) not null,
    before_url text not null,
    after_url text not null,
    created_at timestamp not null
);

create table notification (
    id bigserial primary key,
    user_id bigint not null references app_user(id),
    title varchar(200) not null,
    message text not null,
    type varchar(40) not null,
    sent_at timestamp not null,
    read boolean not null default false
);

create table blog_article (
    id bigserial primary key,
    author_id bigint references app_user(id),
    title varchar(250) not null,
    excerpt text,
    content text not null,
    cover_image_url text,
    published_at timestamp,
    created_at timestamp not null
);
