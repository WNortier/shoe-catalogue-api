insert into shoes (brand, color, style, size, price, quantity) values ('Yuma', 'Black', 'Sandals', 8, 999, 5);
insert into shoes (brand, color, style, size, price, quantity) values ('Zonverse', 'Red', 'Sneakers', 10, 1299, 5);
insert into shoes (brand, color, style, size, price, quantity) values ('Jimmy Woo', 'Metallic', 'High Heels', 8, 1499, 2);


shoecatalogue=# select stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity from stock inner join brands on stock.brand_id = brands.id inner join colors on stock.color_id = colors.id inner join sizes on stock.size_id = sizes.id;
