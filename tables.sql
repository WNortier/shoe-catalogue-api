create table shoes(
    id serial not null primary key,
    brand text not null,
    color text not null,
    size int not null,
    price int not null,
    quantity int not null
);

create table cart(
    id serial not null primary key,
    brand text not null,
    color text not null,
    size int not null,
    price int not null,
    quantity int not null,
	shoes_id int,
	foreign key (shoes_id) references shoes(id)
);
