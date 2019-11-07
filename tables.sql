create table shoes(
    id serial not null primary key,
    brand text not null,
    color text not null,
    size int not null,
    price int not null,
    quantity int not null
);