/*
 Navicat Premium Data Transfer

 Source Server         : tenxunyun
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : 10.10.10.1:3306
 Source Schema         : nextjs

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 17/10/2024 21:18:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for node
-- ----------------------------
DROP TABLE IF EXISTS `node`;
CREATE TABLE `node` (
  `id` int NOT NULL AUTO_INCREMENT,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of node
-- ----------------------------
BEGIN;
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (1, 181, 99, '2024-10-02 03:15:31.359', '2024-10-16 16:07:40.455');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (2, 260, 120, '2024-10-03 03:18:55.670', '2024-10-17 12:40:58.707');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (5, 503, 308, '2024-10-05 05:15:22.888', '2024-10-05 05:22:21.141');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (6, 1544, 404, '2024-10-05 05:23:10.053', '2024-10-05 10:39:36.808');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (8, 159, 116, '2024-10-05 10:38:45.608', '2024-10-05 10:39:21.340');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (9, 0, 0, '2024-10-05 10:56:11.261', '2024-10-05 10:56:11.261');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (10, 407, 252, '2024-10-17 08:58:04.010', '2024-10-17 08:58:04.010');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (11, 516, 301, '2024-10-17 09:17:41.049', '2024-10-17 09:17:41.049');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (12, 1271, 105, '2024-10-17 09:17:49.916', '2024-10-17 09:17:49.916');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (13, 92, 349, '2024-10-17 09:17:55.551', '2024-10-17 09:17:55.551');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (15, 755, 107, '2024-10-17 09:31:51.409', '2024-10-17 09:31:51.409');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (16, 197, 69, '2024-10-17 09:32:32.834', '2024-10-17 09:32:32.834');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (17, 283, 130, '2024-10-17 12:29:00.459', '2024-10-17 12:29:00.459');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (18, 496, 358, '2024-10-17 12:41:50.722', '2024-10-17 12:41:50.722');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (19, 843, 269, '2024-10-17 12:42:00.065', '2024-10-17 12:42:00.065');
INSERT INTO `node` (`id`, `x`, `y`, `createdAt`, `updatedAt`) VALUES (20, 642, 97, '2024-10-17 12:42:08.065', '2024-10-17 12:42:08.065');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
