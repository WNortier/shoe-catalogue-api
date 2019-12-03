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

insert into stockimages (id, image) values (1, 'z-black.png');
insert into stockimages (id, image) values (2, 'z-pink.png');
insert into stockimages (id, image) values (3, 'z-red.png');
insert into stockimages (id, image) values (4, 'z-metallic.png');

insert into stockimages (id, image) values (5, 'y-black.png');
insert into stockimages (id, image) values (6, 'y-pink.png');
insert into stockimages (id, image) values (7, 'y-red.png');
insert into stockimages (id, image) values (8, 'y-metallic.png');

insert into stockimages (id, image) values (9, 'k-black.png');
insert into stockimages (id, image) values (10, 'k-pink.png');
insert into stockimages (id, image) values (11, 'k-red.png');
insert into stockimages (id, image) values (12, 'k-metallic.png');

insert into stockimages (id, image) values (13, 'jw-black.png');
insert into stockimages (id, image) values (14, 'jw-pink.png');
insert into stockimages (id, image) values (15, 'jw-red.png');
insert into stockimages (id, image) values (16, 'jw-metallic.png');

insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (1, 1, 1, 999, 3, 13);
insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (2, 2, 2, 799, 3, 10);
insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (3, 3, 3, 899, 3, 7);
insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 4, 4, 999, 3, 4);