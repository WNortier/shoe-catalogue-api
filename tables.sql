create table brands(
    id serial not null primary key,
    brand text not null
);

create table colors(
    id serial not null primary key,
    color text not null
);

create table sizes(
    id serial not null primary key,
    size text not null
);

create table stock(
    id serial not null primary key,
    brand_id int not null,
    color_id int not null,
    size_id int not null,
    price int not null,
    quantity int not null,
    foreign key (brand_id) references brands(id),
    foreign key (color_id) references colors(id),
    foreign key (size_id) references sizes(id)
);

create table cart(
    id serial not null primary key,
    brand int not null,
    color int not null,
    size int not null,
    price int not null,
    quantity int not null,
	stock_id int,
	foreign key (stock_id) references stock(id)
);

insert into brands (id, brand) values (1, 'Zonverse');
insert into brands (id, brand) values (2, 'Yuma');
insert into brands (id, brand) values (3, 'Kucci');
insert into brands (id, brand) values (4, 'Jimmy Woo');

insert into colors (id, color) values (1, 'Black');
insert into colors (id, color) values (2, 'Pink');
insert into colors (id, color) values (3, 'Red');
insert into colors (id, color) values (4, 'Metallic');

insert into sizes (id, size) values (1, 6);
insert into sizes (id, size) values (2, 7);
insert into sizes (id, size) values (3, 8);
insert into sizes (id, size) values (4, 9);