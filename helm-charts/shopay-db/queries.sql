-- Adminer 4.8.1 MySQL 8.0.33 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `shopay`;
CREATE DATABASE `shopay` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shopay`;

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `variant_id` int NOT NULL,
  `quantity` int NOT NULL,
  `cust_id` int NOT NULL,
  KEY `variant_id` (`variant_id`),
  KEY `cust_id` (`cust_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`variant_id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `category` (`category_id`, `name`) VALUES
(1,	'Electronics'),
(2,	'Toys');

DROP TABLE IF EXISTS `contains`;
CREATE TABLE `contains` (
  `sub_category_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`sub_category_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `contains_ibfk_1` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`sub_category_id`),
  CONSTRAINT `contains_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `contains` (`sub_category_id`, `product_id`) VALUES
(1,	1),
(2,	2),
(5,	3),
(4,	4),
(3,	5),
(3,	7);

DROP TABLE IF EXISTS `custom_attribute`;
CREATE TABLE `custom_attribute` (
  `attribute_id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`attribute_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `custom_attribute_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `custom_attribute` (`attribute_id`, `value`, `product_id`, `name`) VALUES
(1,	'3GB',	1,	'RAM'),
(2,	'DSLR',	2,	'Standard'),
(3,	'128GB',	1,	'Storage'),
(4,	'3.0',	3,	'Version'),
(5,	'YES',	4,	'Bluetooth'),
(6,	'20W',	5,	'Output '),
(7,	'2hrs',	5,	'Battery Time'),
(8,	'3hrs',	7,	'Battery Time'),
(9,	'YES',	7,	'Noice Cancelation '),
(10,	'NO',	7,	'Fast Charging');

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `cust_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `telephone` int NOT NULL,
  PRIMARY KEY (`cust_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `customer` (`cust_id`, `name`, `telephone`) VALUES
(1,	'Ashok',	762786479);

DROP TABLE IF EXISTS `has`;
CREATE TABLE `has` (
  `category_id` int NOT NULL,
  `sub_category_id` int NOT NULL,
  PRIMARY KEY (`category_id`,`sub_category_id`),
  KEY `sub_category_id` (`sub_category_id`),
  CONSTRAINT `has_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `has_ibfk_2` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`sub_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `has` (`category_id`, `sub_category_id`) VALUES
(1,	1),
(1,	2),
(1,	3),
(1,	4),
(1,	5),
(2,	5);

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `phone` int NOT NULL,
  `delivery_method` varchar(255) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `order_date` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `cust_id` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `cust_id` (`cust_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`cust_id`) REFERENCES `customer` (`cust_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `order` (`order_id`, `phone`, `delivery_method`, `payment_method`, `order_date`, `status`, `cust_id`) VALUES
(1,	762786479,	'Delevery',	'cash',	'01/02/2023',	'Shipping',	1),
(2,	4154752,	'Delevery',	'cash',	'24/04/2023',	'Detached',	1);

DROP TABLE IF EXISTS `order_variant`;
CREATE TABLE `order_variant` (
  `order_id` int NOT NULL,
  `variant_id` int NOT NULL,
  `quantity` int NOT NULL,
  KEY `order_id` (`order_id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `order_variant_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `order_variant_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`variant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `weight` int NOT NULL,
  `default_varient_id` int NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `product` (`product_id`, `sku`, `title`, `weight`, `default_varient_id`) VALUES
(1,	'335W',	'iPhone 11 Pro 256GB Memory',	240,	2),
(2,	'335W',	'Cannon EOS 80D DSLR Camera',	2000,	3),
(3,	'335W',	'Sony Playstation 4 Pro White Version',	4000,	4),
(4,	'335W',	'Logitech G-Series Gaming Mouse',	100,	5),
(5,	'335W',	'Amazon Echo Dot 3rd Generation',	250,	6),
(7,	'335W',	'Airpods Wireless Bluetooth Headphones',	300,	1);

DROP TABLE IF EXISTS `sub_category`;
CREATE TABLE `sub_category` (
  `sub_category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`sub_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `sub_category` (`sub_category_id`, `name`) VALUES
(1,	'Phone'),
(2,	'Camera'),
(3,	'Speaker'),
(4,	'Mouse'),
(5,	'Playstation');

DROP TABLE IF EXISTS `variant`;
CREATE TABLE `variant` (
  `variant_id` int NOT NULL AUTO_INCREMENT,
  `count` int NOT NULL,
  `price` float NOT NULL,
  `product_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(12255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`variant_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `variant_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `variant` (`variant_id`, `count`, `price`, `product_id`, `name`, `description`, `image`) VALUES
(1,	3,	89,	7,	'White',	'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',	'/images/airpods.jpg'),
(2,	10,	599,	1,	'128GB',	'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',	'/images/phone.jpg'),
(3,	5,	92,	2,	'Black',	'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',	'/images/camera.jpg'),
(4,	7,	1299.99,	3,	'White',	'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',	'/images/playstation.jpg'),
(5,	13,	29.99,	4,	'Wired',	'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',	'/images/mouse.jpg'),
(6,	4,	399.99,	5,	'Greene ',	'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',	'/images/alexa.jpg');

-- 2023-04-25 10:34:13