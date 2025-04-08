-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Idev3
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Idev3
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Idev3` DEFAULT CHARACTER SET utf8 ;
USE `Idev3` ;

-- -----------------------------------------------------
-- Table `Idev3`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Idev3`.`Usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(200) NOT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `Senha` VARCHAR(200) NOT NULL,
  `Endereco` VARCHAR(200) NOT NULL,
  `Telefone` INT(18) NULL,
  `CPF` CHAR(11) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `CPF_UNIQUE` (`CPF` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
