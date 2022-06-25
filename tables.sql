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
-- create minecraft.player_sessions table
-- -----------------------------------------
CREATE TABLE `player_sessions` (
  `uuid` varchar(60) NOT NULL,
  `name` varchar(45) NOT NULL,
  `joined` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------
-- auto-generated discord Members table
-- -----------------------------------------

-- -----------------------------------------
-- auto-generated discord PummelScores table
-- -----------------------------------------

