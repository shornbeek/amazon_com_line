
CREATE DATABASE amazon;
USE amazon;

DROP DATABASE amazon;
DROP TABLE products;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(75),
department_name VARCHAR(75),
price DECIMAL(5 , 2),
stock_quantity INT(100)

);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toaster", "housewares", 45.99, 22),
("blender", "housewares", 75.89, 11),
("can opener", "housewares", 5.99, 20),
("fan", "housewares", 19.99, 5),
("cell phone", "electronics", 255.87, 10),
("headphones", "electronics", 49.99, 60),
("dress", "fashion", 73.22,  200),
("hot wheels", "toy", .99, 500),
("paper shredder" ,"office", 55.64, 60),
("stapler","office", 32, 22);


SELECT * FROM products;
