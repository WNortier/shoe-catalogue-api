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
)

create table shoeColors(
    colors text not null,
    colors_id int,
    foreign key (colors_id) references shoes(id)
)

create table shoeSizes(
    sizes int not null,
    sizes_id int,
    foreign key (sizes_id) references shoes(id)
)

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




create table shoes(
    id serial not null primary key,
    brand_id int not null,
    color_id int not null,
    size int not null,
    price int not null,
    quantity int not null
    foreign key (brand_id) references shoeBrands(id),
    foreign key (color_id) references shoeColors(id)
);

create table shoeBrands(
    id serial not null primary key,
    brand text not null
)

create table shoeColors(
    id serial not null primary key,
    color text not null,
)
