insert into shoes (brand, color, style, size, price, quantity) values ('Yuma', 'Black', 'Sandals', 8, 999, 5);
insert into shoes (brand, color, style, size, price, quantity) values ('Zonverse', 'Red', 'Sneakers', 10, 1299, 5);
insert into shoes (brand, color, style, size, price, quantity) values ('Jimmy Woo', 'Metallic', 'High Heels', 8, 1499, 2);


select stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity 
from stock 
inner join brands on stock.brand_id = brands.id 
inner join colors on stock.color_id = colors.id 
inner join sizes on stock.size_id = sizes.id
where stock.brand_id = brands.id;


select brands.brand, colors.color, sizes.size, cart.price, cart.quantity 
from cart 
inner join brands on cart.brand = brands.id 
inner join colors on cart.color = colors.id 
inner join sizes on cart.size = sizes.id;

insert into stock (brand_id, color_id, size_id, price, quantity) values (1, 1, 1, 999, 3);
insert into stock (brand_id, color_id, size_id, price, quantity) values (2, 2, 2, 799, 3);
insert into stock (brand_id, color_id, size_id, price, quantity) values (3, 3, 3, 899, 3);
insert into stock (brand_id, color_id, size_id, price, quantity) values (4, 4, 4, 999, 3);