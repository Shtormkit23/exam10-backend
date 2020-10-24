CREATE DATABASE IF NOT EXISTS exam10 CHARACTER SET utf8 COLLATE utf8_general_ci;

USE exam10;

CREATE TABLE IF NOT EXISTS news(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
title VARCHAR(255) NOT NULL,
description TEXT(3000) NOT NULL,
image varchar(255) DEFAULT NULL,
date_of_create DATETIME
);

CREATE TABLE IF NOT EXISTS comments(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
news_id INT NOT NULL,
author VARCHAR(255) NOT NULL,
description TEXT(3000) NOT NULL,
FOREIGN KEY (news_id)
REFERENCES news(id)
ON DELETE RESTRICT
ON UPDATE CASCADE
);