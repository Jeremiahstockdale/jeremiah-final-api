DROP SCHEMA IF EXISTS `stocktopus`;

CREATE SCHEMA `stocktopus`;

CREATE TABLE `stocktopus`.`users` (
    `id` VARCHAR(45) NOT NULL UNIQUE,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `account_value` FLOAT NOT NULL, -- liquid account value.
    `creation_date` DATE, --  format YYYY-MM-DD
    
    PRIMARY KEY (`id`)
);

CREATE TABLE `stocktopus`.`paper_trades` (
    `id` INT AUTO_INCREMENT NOT NULL UNIQUE,
    `user_id` VARCHAR(45) NOT NULL,
    `stock_symbol` VARCHAR(45) NOT NULL, -- changed from stock_id
    `init_share_price` FLOAT NOT NULL,
    `shares` INT NOT NULL,
    `init_investment_date` DATE NOT NULL,
    `init_investment_value` FLOAT NOT NULL,
    `sold_price` FLOAT,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE `stocktopus`.`likes` (
    `id` INT AUTO_INCREMENT NOT NULL UNIQUE,
    `user_id` VARCHAR(45) NOT NULL,
    `stock_symbol` VARCHAR(45) NOT NULL,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

INSERT INTO `stocktopus`.`users` 
    (`id`, `username`, `password`, `account_value`, `creation_date`)
VALUES 
    ('a66a7494-29ff-11ed-bd1e-c93bcd52340c', "Eric", "$2b$10$SDDW7s.tLkN5iGYbTgNYWuneH3acLUrZQo1awnrz55Qa7e8fyIp1C", 1000, '2012-10-31'),
    ('a66a75f2-29ff-11ed-bd1e-c93bcd52340c', "Jeremiah", "$2b$10$SDDW7s.tLkN5iGYbTgNYWuneH3acLUrZQo1awnrz55Qa7e8fyIp1C", 4200, '2017-02-02'),
    ('a66a7692-29ff-11ed-bd1e-c93bcd52340c', "Ford", "$2b$10$SDDW7s.tLkN5iGYbTgNYWuneH3acLUrZQo1awnrz55Qa7e8fyIp1C", 350, '2022-04-03'),
    ('a66a76e2-29ff-11ed-bd1e-c93bcd52340c', "Chris", "$2b$10$SDDW7s.tLkN5iGYbTgNYWuneH3acLUrZQo1awnrz55Qa7e8fyIp1C", 1200, '2007-12-06'),
    ('a66a7732-29ff-11ed-bd1e-c93bcd52340c', "Will", "$2b$10$SDDW7s.tLkN5iGYbTgNYWuneH3acLUrZQo1awnrz55Qa7e8fyIp1C", 3000, '2020-10-31'),
    ('a66a7731-29ff-11ed-bd1e-c93bcd52340c', "Code+Trust", "$2b$10$SDDW7s.tLkN5iGYbTgNYWuneH3acLUrZQo1awnrz55Qa7e8fyIp1C", 100000, '2020-10-31')
;

INSERT INTO `stocktopus`.`paper_trades` 
    (`user_id`, `stock_symbol`, `init_share_price`, `shares`, `init_investment_date`, `init_investment_value`)
VALUES 
    ('a66a7731-29ff-11ed-bd1e-c93bcd52340c', 'NKE', 105.43, 100, '2022-09-12', 10543.00),
    ('a66a7731-29ff-11ed-bd1e-c93bcd52340c', 'BTC', 19084.82, 5, '2022-10-13', 95424.10)
;

INSERT INTO `stocktopus`.`likes` 
    (`user_id`, `stock_symbol`)
VALUES 
    ('a66a7731-29ff-11ed-bd1e-c93bcd52340c', 'NKE'),
    ('a66a7731-29ff-11ed-bd1e-c93bcd52340c', 'GOOG'),
    ('a66a7731-29ff-11ed-bd1e-c93bcd52340c', 'NFLX'),
    ('a66a7731-29ff-11ed-bd1e-c93bcd52340c', 'GBP'),
    ('a66a7731-29ff-11ed-bd1e-c93bcd52340c', 'CL=F')
;