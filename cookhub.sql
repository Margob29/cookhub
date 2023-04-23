-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 20 avr. 2023 à 19:49
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cookhub`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorization`
--

DROP TABLE IF EXISTS `categorization`;
CREATE TABLE IF NOT EXISTS `categorization` (
  `idRecipe` int(11) NOT NULL,
  `idVersion` int(11) NOT NULL,
  `idCategory` int(11) NOT NULL,
  PRIMARY KEY (`idRecipe`,`idVersion`,`idCategory`),
  KEY `recipeCategorization` (`idRecipe`,`idVersion`,`idCategory`),
  KEY `catCategory` (`idCategory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categorization`
--

INSERT INTO `categorization` (`idRecipe`, `idVersion`, `idCategory`) VALUES
(5, 1, 2),
(1, 1, 3),
(2, 1, 3),
(7, 1, 4),
(8, 1, 6),
(6, 1, 7);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `idCategory` int(11) NOT NULL AUTO_INCREMENT,
  `name` text,
  PRIMARY KEY (`idCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`idCategory`, `name`) VALUES
(1, 'Entrée'),
(2, 'Plat'),
(3, 'Dessert'),
(4, 'Petit déjeuner'),
(5, 'Apéritif'),
(6, 'Boisson'),
(7, 'Sauce'),
(8, 'Sans gluten'),
(9, 'Sans lactose'),
(10, 'Végétarien'),
(11, 'Végan'),
(12, 'Sans sucre');

-- --------------------------------------------------------

--
-- Structure de la table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE IF NOT EXISTS `ingredient` (
  `idIngredient` int(11) NOT NULL AUTO_INCREMENT,
  `name` text,
  PRIMARY KEY (`idIngredient`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ingredient`
--

INSERT INTO `ingredient` (`idIngredient`, `name`) VALUES
(44, 'Chocolat'),
(45, 'Beurre'),
(46, 'Farine'),
(47, 'Sucre'),
(48, 'Oeufs'),
(49, 'Banane'),
(50, 'Lait'),
(51, 'Levure chimique'),
(52, 'Sel'),
(53, 'Chocolat'),
(54, 'Courgette'),
(55, 'Ail'),
(56, 'Oeufs'),
(57, 'Farine'),
(58, 'Fines herbes'),
(59, 'Huile'),
(60, 'Chèvre'),
(61, 'Yaourts à la grecque'),
(62, 'Mayonnaise'),
(63, 'Jus de citron'),
(64, 'Lait'),
(65, 'Piment/cumin'),
(66, 'Ail/Echalotte'),
(67, 'Persil/Menthe'),
(68, 'Sel/poivre'),
(69, 'Chataîgne'),
(70, 'Sucre'),
(71, 'Eau'),
(72, 'Citrons'),
(73, 'Eau'),
(74, 'Sucre'),
(75, 'Glaçons');

-- --------------------------------------------------------

--
-- Structure de la table `preparation`
--

DROP TABLE IF EXISTS `preparation`;
CREATE TABLE IF NOT EXISTS `preparation` (
  `idRecipe` int(11) NOT NULL,
  `idVersion` int(11) NOT NULL,
  `idStep` int(11) NOT NULL,
  `stepIndex` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idRecipe`,`idVersion`,`stepIndex`) USING BTREE,
  KEY `clefEtrangere` (`idRecipe`,`idVersion`,`idStep`) USING BTREE,
  KEY `prepStep` (`idStep`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `preparation`
--

INSERT INTO `preparation` (`idRecipe`, `idVersion`, `idStep`, `stepIndex`) VALUES
(1, 1, 63, 1),
(1, 1, 64, 2),
(1, 1, 65, 3),
(1, 1, 66, 4),
(2, 1, 67, 1),
(2, 1, 68, 2),
(2, 1, 69, 3),
(2, 1, 70, 4),
(5, 1, 75, 1),
(5, 1, 76, 2),
(5, 1, 77, 3),
(5, 1, 78, 4),
(5, 1, 79, 5),
(5, 1, 80, 6),
(6, 1, 81, 1),
(7, 1, 82, 1),
(7, 1, 83, 2),
(7, 1, 84, 3),
(7, 1, 85, 4),
(8, 1, 86, 1),
(8, 1, 87, 2),
(8, 1, 88, 3);

-- --------------------------------------------------------

--
-- Structure de la table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
CREATE TABLE IF NOT EXISTS `recipe` (
  `idRecipe` int(11) NOT NULL,
  `version` int(11) NOT NULL,
  `name` text,
  `nbPortion` int(11) NOT NULL,
  `preparationTime` int(11) NOT NULL,
  `bakingTime` int(11) NOT NULL,
  `breakTime` int(11) DEFAULT NULL,
  `picture` int(11) DEFAULT NULL,
  PRIMARY KEY (`idRecipe`,`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `recipe`
--

INSERT INTO `recipe` (`idRecipe`, `version`, `name`, `nbPortion`, `preparationTime`, `bakingTime`, `breakTime`, `picture`) VALUES
(1, 1, 'Fondant au chocolat', 8, 15, 20, NULL, NULL),
(2, 1, 'Banana bread', 8, 10, 35, NULL, NULL),
(5, 1, 'Galettes courgettes/chèvre', 6, 15, 3, 60, NULL),
(6, 1, 'Sauce blanche Kebab', 8, 10, 0, NULL, NULL),
(7, 1, 'Confiture de chataîgnes', 5, 120, 100, NULL, NULL),
(8, 1, 'Citronnade', 3, 60, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `step`
--

DROP TABLE IF EXISTS `step`;
CREATE TABLE IF NOT EXISTS `step` (
  `idStep` int(11) NOT NULL AUTO_INCREMENT,
  `description` text,
  PRIMARY KEY (`idStep`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `step`
--

INSERT INTO `step` (`idStep`, `description`) VALUES
(63, 'Faîtes fondre le chocolat et le beurre au bain marie'),
(64, 'Mélanger les ingrédients dans un saladier'),
(65, 'Lorsque le chocolat et le beurre sont fondus, les ajouter au reste des ingrédients'),
(66, 'Mettre dans un moule à cake et enfourner 15 à 20 min à 200°C'),
(67, 'Ecraser les bananes'),
(68, 'Tout mélanger avec les bananes jusqu\'à ce que ce soit homogène'),
(69, 'Rajouter le chocolat en petits morceaux (taille des pépites à adapter selon les envies)'),
(70, 'Verser dans un moule à cake et enfourner 35min à 180°C'),
(75, 'Peler et râper les courgettes'),
(76, 'Mettre dans une passoire, saler et laisser dégorger 1h.'),
(77, 'Bien les rincer et sécher dans un torchon en serrant très fort. Mettre dans un saladier'),
(78, 'Ajouter les autres ingrédients. Bien mélanger. Ajouter de la farine si trop liquide'),
(79, 'Faire chauffer l\'huile dans une poele'),
(80, 'Quand c\'est bien chaud y ajouter 1 cuillère à soupe du mélange, 1 tranche de chèvre et recouvrir d\'un peu de mélange.'),
(81, 'Tout mélanger'),
(82, 'Peler les chataîgnes'),
(83, 'Mélanger l\'eau et le sucre avec les chataîgnes'),
(84, 'Faire cuire pendant 1h en mélangeant'),
(85, 'Mixer le tout et verser dans des pots'),
(86, 'Presser les 4 citrons'),
(87, 'Mettre l\'eau dans une carafe et y diluer le sucre '),
(88, 'Ajouter le jus de citrons et les glaçons');

-- --------------------------------------------------------

--
-- Structure de la table `stepneed`
--

DROP TABLE IF EXISTS `stepneed`;
CREATE TABLE IF NOT EXISTS `stepneed` (
  `idStep` int(11) NOT NULL,
  `idIngredient` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit` text NOT NULL,
  PRIMARY KEY (`idStep`,`idIngredient`),
  UNIQUE KEY `clefEtrangere` (`idStep`,`idIngredient`),
  KEY `stepIngredient` (`idIngredient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `stepneed`
--

INSERT INTO `stepneed` (`idStep`, `idIngredient`, `quantity`, `unit`) VALUES
(63, 44, 300, 'grammes'),
(63, 45, 80, 'grammes'),
(64, 46, 5, 'cuillères à soupe'),
(64, 47, 4, 'cuillères à soupe'),
(64, 48, 4, 'entiers'),
(67, 49, 220, 'grammes sans la peau'),
(68, 50, 50, 'mililitres'),
(68, 51, 1, 'sachet'),
(68, 52, 1, 'pincée'),
(69, 53, 100, 'grammes'),
(75, 54, 3, 'entières'),
(78, 55, 1, 'Gousse'),
(78, 56, 3, 'entiers'),
(78, 57, 140, 'grammes'),
(78, 58, 3, 'cuillères à soupe'),
(79, 59, 4, 'cuillères à soupe'),
(80, 60, 1, 'rouleau'),
(81, 61, 2, 'entiers'),
(81, 62, 2, 'cuillère à soupe'),
(81, 63, 1, 'entier'),
(81, 64, 10, 'cl'),
(81, 65, 3, 'pincées'),
(81, 66, 1, 'entier'),
(81, 67, 10, 'brins'),
(81, 68, 2, 'pincées'),
(82, 69, 1, 'kilo'),
(83, 70, 500, 'grammes'),
(83, 71, 600, 'ml'),
(86, 72, 4, 'entiers'),
(87, 73, 2, 'L'),
(87, 74, 180, 'g'),
(88, 75, 10, 'entiers');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `categorization`
--
ALTER TABLE `categorization`
  ADD CONSTRAINT `catCategory` FOREIGN KEY (`idCategory`) REFERENCES `category` (`idCategory`),
  ADD CONSTRAINT `catRecipe` FOREIGN KEY (`idRecipe`,`idVersion`) REFERENCES `recipe` (`idRecipe`, `version`) ON DELETE CASCADE;

--
-- Contraintes pour la table `preparation`
--
ALTER TABLE `preparation`
  ADD CONSTRAINT `prepRecipe` FOREIGN KEY (`idRecipe`,`idVersion`) REFERENCES `recipe` (`idRecipe`, `version`) ON DELETE CASCADE,
  ADD CONSTRAINT `prepStep` FOREIGN KEY (`idStep`) REFERENCES `step` (`idStep`) ON DELETE CASCADE;

--
-- Contraintes pour la table `stepneed`
--
ALTER TABLE `stepneed`
  ADD CONSTRAINT `stepIngredient` FOREIGN KEY (`idIngredient`) REFERENCES `ingredient` (`idIngredient`) ON DELETE CASCADE,
  ADD CONSTRAINT `stepStep` FOREIGN KEY (`idStep`) REFERENCES `step` (`idStep`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
