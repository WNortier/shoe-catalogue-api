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
    image_id int not null,
    foreign key (brand_id) references brands(id),
    foreign key (color_id) references colors(id),
    foreign key (size_id) references sizes(id),
    foreign key (image_id) references stockimages(id)
);

create table cart(
    id serial not null primary key,
    brand int not null,
    color int not null,
    size int not null,
    price int not null,
    quantity int not null,
	stock_id int,
    cart_image int not null,
	foreign key (stock_id) references stock(id)
);

create table stockimages(
    id serial not null primary key,
    image text not null
);









