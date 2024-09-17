CREATE DATABASE island;

USE island;

CREATE TABLE
    `node` (
        `id` bigint NOT NULL AUTO_INCREMENT,
        `x` int DEFAULT '0',
        `y` int DEFAULT '0',
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;