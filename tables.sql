create table shoes(
    id serial not null primary key,
    brand text not null,
    color text not null,
    size int not null,
    price int not null,
    quantity int not null
);

create table shoeBrands(
    brands text not null, 
    brands_id int,
    foreign key (brands_id) references shoes(id)
);

create table shoeColors(
    colors text not null,
    colors_id int,
    foreign key (colors_id) references shoes(id)
);

create table shoeSizes(
    sizes int not null,
    sizes_id int,
    foreign key (sizes_id) references shoes(id)
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
    sizes text not null
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

insert into stock (brand_id, color_id, size_id, price, quantity) values (1, 1, 1, 999, 5);
insert into brands (id, brand) values (1, 'Zonverse');
insert into colors (id, color) values (1, 'Black');
insert into sizes (id, size) values (1, 6);
