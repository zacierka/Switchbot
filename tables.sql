-- -----------------------------------------
-- create minecraft.status table
-- -----------------------------------------
DROP TABLE IF EXISTS `minecraft`.`status`;
CREATE TABLE `minecraft`.`status` (
  `idstatus` int(11) NOT NULL AUTO_INCREMENT,
  `status` enum('UNK','OFFLINE','CLOSED','ONLINE') DEFAULT 'OFFLINE',
  `version` varchar(45) DEFAULT NULL,
  `motd` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idstatus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------
-- auto-generated discord Members table
-- -----------------------------------------

-- -----------------------------------------
-- auto-generated discord PummelScores table
-- -----------------------------------------