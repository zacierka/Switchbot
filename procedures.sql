-- ---------------------------------------------
-- PummelLeaderboard procedure
-- returns playernames and scores in desc order
-- ---------------------------------------------
DROP PROCEDURE IF EXISTS `discord`.`PummelLeaderboard`;
DELIMITER $$
CREATE DEFINER=`bot`@`%` PROCEDURE `PummelLeaderboard`()
BEGIN
 SELECT memberName, score FROM PummelScores p JOIN Members m ON p.memberID = m.memberID ORDER BY `score` DESC;
END$$
DELIMITER ;

-- ---------------------------------------------
-- PummelWinner procedure
-- returns score of winner
-- ---------------------------------------------
DROP PROCEDURE IF EXISTS `discord`.`PummelWinner`;
DELIMITER $$
CREATE DEFINER=`bot`@`%` PROCEDURE `PummelWinner`(IN userid VARCHAR(45), IN userName VARCHAR(60))
BEGIN

   IF EXISTS
    (SELECT memberID 
        FROM Members
        WHERE userid = memberID)
    THEN
            UPDATE PummelScores SET score = score + 1 WHERE memberID = userid;
            SELECT score from PummelScores where memberID = userid;
    ELSE
        INSERT INTO Members(memberID, memberName) VALUES (userid, userName);
        INSERT INTO PummelScores(memberID, score) VALUES (userid, 1);
        SELECT score from PummelScores where memberID = userid;
    END IF;
END$$
DELIMITER ;

-- ---------------------------------------------
-- `minecraft`.`insert_update_status` procedure
-- ---------------------------------------------
DROP PROCEDURE IF EXISTS `minecraft`.`insert_update_status`;
DELIMITER $$
CREATE DEFINER=`bot`@`%` PROCEDURE `insert_update_status`(
IN `in_status` enum('UNK', 'OFFLINE', 'CLOSED', 'ONLINE'), 
IN `in_version` varchar(45), 
IN `in_motd` varchar(45), 
IN `in_type` varchar(45))
BEGIN

INSERT INTO `minecraft`.`status` (`status`, `version`, `motd`, `type`) 
VALUES (`in_status`, `in_version`, `in_motd`, `in_type`)
ON DUPLICATE KEY UPDATE 
  `status` = `in_status`, 
  `version` = `in_version`,
  `motd` = `in_motd`,
  `type` = `in_type`
;

END$$
DELIMITER ;
