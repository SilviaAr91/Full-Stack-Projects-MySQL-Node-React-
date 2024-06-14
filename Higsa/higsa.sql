CREATE DATABASE higsa;
USE higsa;

CREATE TABLE user (
    user_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(200) NOT NULL,
    type TINYINT NOT NULL DEFAULT 2,  -- 1 ADMIN    2 CLIENTE
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    cif VARCHAR(20) NOT NULL,
    address VARCHAR(150) NOT NULL,
    address2 VARCHAR(150),
    contact_phone VARCHAR(20) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    company_phone VARCHAR(20) NOT NULL,
    user_is_disabled BOOLEAN NOT NULL DEFAULT true,
    user_is_deleted BOOLEAN NOT NULL DEFAULT false,
    user_is_verified BOOLEAN NOT NULL DEFAULT false
);
 
 CREATE TABLE icon (
	icon_id TINYINT PRIMARY KEY NOT NULL,
	icon_name VARCHAR(100) NOT NULL,
    icon_label varchar(100) not null
);
 
CREATE TABLE menu (
    user_id INT UNSIGNED NOT NULL,
    menu_id INT UNSIGNED NOT NULL,   -- select max(menu_id) from menu where user_id = X ->  5 + 1 -> 6
    name VARCHAR(100) NOT NULL,
    number_of_days tinyint not null default 5,  -- semanas de 5 o 7 días ??
	icon_id TINYINT NOT NULL DEFAULT 3,
    primary key(user_id, menu_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (icon_id) REFERENCES icon(icon_id)
);
 
CREATE TABLE week (
	user_id INT UNSIGNED NOT NULL,
    menu_id INT UNSIGNED NOT NULL,
    week_id INT UNSIGNED NOT NULL,   -- select max(week_id) from week where user_id = X  and menu_id = X   ->  5 + 1 -> 6  -> NUNCA AUTO INCREMENT
    name VARCHAR(100) NOT NULL,
    primary key(user_id, menu_id, week_id),
    FOREIGN KEY (user_id, menu_id) REFERENCES menu(user_id, menu_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);
 
CREATE TABLE dish (
    dish_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dish_name VARCHAR(150) NOT NULL,
    dish_description VARCHAR(400),
    dish_is_disabled BOOLEAN NOT NULL DEFAULT false,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);
 
CREATE TABLE category (
    category_id MEDIUMINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL 
);
 
CREATE TABLE planning (    
    user_id INT UNSIGNED NOT NULL,
    menu_id INT UNSIGNED NOT NULL,
    week_id INT UNSIGNED NOT NULL,
    day_id TINYINT UNSIGNED NOT NULL,
    category_id MEDIUMINT UNSIGNED NOT NULL,
    dish_id BIGINT UNSIGNED NOT NULL,
    primary key(user_id, menu_id, week_id, day_id, category_id),       
    FOREIGN KEY (user_id, menu_id, week_id) REFERENCES week(user_id, menu_id, week_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (dish_id) REFERENCES dish(dish_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO icon (icon_id, icon_name, icon_label)
VALUES 
(1, 'sin-gluten.png', 'Sin gluten'),
(2, 'sin-lactosa.png', 'Sin lactosa'),
(3, 'menu-normal.png', 'Menu normal'),
(4, 'sin-pescado.png', 'Sin Pescado'),
(5, 'sin-cerdo.png', 'Sin Cerdo'),
(6, 'menu-vegano.png', 'Menu Vegano');

INSERT INTO category (category_name)
VALUES 
('Main Course'),
('Side Dish'),
('Dessert'),
('Appetizer'),
('Beverage');
