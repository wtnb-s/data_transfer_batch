CREATE TABLE `test`.`test` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  `type` TINYINT(1) NOT NULL,
  `order` TINYINT(3) NULL,
  `created_at` DATETIME NULL DEFAULT current_timestamp,
  `updated_at` DATETIME NULL DEFAULT current_timestamp on update current_timestamp,
  PRIMARY KEY (`id`));

INSERT INTO `test`.`test` (`name`, `type`, `order`) VALUES ('tom', '1', '1');
INSERT INTO `test`.`test` (`name`, `type`, `order`) VALUES ('ted', '2', '2');
INSERT INTO `test`.`test` (`name`, `type`, `order`) VALUES ('sam', '1', '3');
INSERT INTO `test`.`test` (`name`, `type`, `order`) VALUES ('mickey', '1', '4');
