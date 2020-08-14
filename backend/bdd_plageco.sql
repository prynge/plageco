-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 04 Octobre 2019 à 21:08
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `plageco`
--
CREATE DATABASE IF NOT EXISTS `plageco` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `plageco`;

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

CREATE TABLE IF NOT EXISTS `avis` (
  `num_avis` int(15) NOT NULL,
  `date_avis` date NOT NULL,
  `cont_avis` text NOT NULL,
  `type` varchar(15) NOT NULL,
  `sujet` varchar(20) NOT NULL,
  PRIMARY KEY (`num_avis`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE IF NOT EXISTS `client` (
  `pseudo` varchar(20) NOT NULL,
  `nom_cli` varchar(20) NOT NULL,
  `prenom_cli` varchar(20) NOT NULL,
  `pass_cli` text NOT NULL,
  `tel_cli` bigint(12) NOT NULL,
  `mail_cli` varchar(30) NOT NULL,
  PRIMARY KEY (`pseudo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE IF NOT EXISTS `commande` (
  `id_frs` int(10) NOT NULL,
  `ref_prod` varchar(10) NOT NULL,
  `date_cmd` date NOT NULL,
  `liv_cmd` varchar(30) NOT NULL,
  `date_liv` date NOT NULL,
  `montant_cmd` bigint(12) NOT NULL,
  PRIMARY KEY (`id_frs`,`ref_prod`),
  KEY `ref_prod` (`ref_prod`),
  KEY `id_frs` (`id_frs`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `creer`
--

CREATE TABLE IF NOT EXISTS `creer` (
  `pseudo` varchar(10) NOT NULL,
  `num_avis` int(15) NOT NULL,
  PRIMARY KEY (`pseudo`,`num_avis`),
  KEY `pseudo` (`pseudo`),
  KEY `num_avis` (`num_avis`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `fournisseur`
--

CREATE TABLE IF NOT EXISTS `fournisseur` (
  `id_frs` int(10) NOT NULL,
  `nom_frs` varchar(20) NOT NULL,
  `adresse` varchar(30) NOT NULL,
  `tel_frs` bigint(12) NOT NULL,
  `mail_frs` varchar(30) NOT NULL,
  PRIMARY KEY (`id_frs`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `policies`
--

CREATE TABLE IF NOT EXISTS `policies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(20) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `policies`
--

INSERT INTO `policies` (`id`, `number`, `amount`) VALUES
(1, 'PL005000', 400),
(2, 'PL009000', 9000);

-- --------------------------------------------------------

--
-- Structure de la table `prix_unitaire_produit`
--

CREATE TABLE IF NOT EXISTS `prix_unitaire_produit` (
  `id_prix` int(15) NOT NULL,
  `puht` bigint(12) NOT NULL,
  `date_deb` date NOT NULL,
  `date_fin` date NOT NULL,
  `ref_prod` varchar(10) NOT NULL,
  PRIMARY KEY (`id_prix`),
  KEY `ref_prod` (`ref_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE IF NOT EXISTS `produit` (
  `ref_prod` varchar(10) NOT NULL,
  `lib_prod` varchar(30) NOT NULL,
  `seuil` int(10) NOT NULL,
  PRIMARY KEY (`ref_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `quantite_produit`
--

CREATE TABLE IF NOT EXISTS `quantite_produit` (
  `id_qte` int(10) NOT NULL,
  `qte_stock` int(10) NOT NULL,
  `date_enr` date NOT NULL,
  `ref_prod` varchar(10) NOT NULL,
  PRIMARY KEY (`id_qte`),
  KEY `ref_prod` (`ref_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `repondre`
--

CREATE TABLE IF NOT EXISTS `repondre` (
  `id_user` varchar(20) NOT NULL,
  `num_avis` int(15) NOT NULL,
  `reponse` text NOT NULL,
  `date_reponse` date NOT NULL,
  PRIMARY KEY (`id_user`,`num_avis`),
  KEY `id_user` (`id_user`),
  KEY `num_avis` (`num_avis`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_user` varchar(20) NOT NULL,
  `nom_user` varchar(20) NOT NULL,
  `prenom_user` varchar(20) NOT NULL,
  `pass_user` text NOT NULL,
  `statut` varchar(15) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_user`, `nom_user`, `prenom_user`, `pass_user`, `statut`) VALUES
('admin', 'KOTTO', 'Yann', '90b9aa7e25f80cf4f64e990b78a9fc5ebd6cecad', 'administrateur');

-- --------------------------------------------------------

--
-- Structure de la table `vendre`
--

CREATE TABLE IF NOT EXISTS `vendre` (
  `ref_prod` varchar(10) NOT NULL,
  `pseudo` varchar(20) NOT NULL,
  `date_vente` date NOT NULL,
  `qte` int(5) NOT NULL,
  PRIMARY KEY (`ref_prod`,`pseudo`),
  KEY `ref_prod` (`ref_prod`),
  KEY `pseudo` (`pseudo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `fk_id_frs_cmd` FOREIGN KEY (`id_frs`) REFERENCES `fournisseur` (`id_frs`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ref_prod_cmd` FOREIGN KEY (`ref_prod`) REFERENCES `produit` (`ref_prod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `creer`
--
ALTER TABLE `creer`
  ADD CONSTRAINT `fk_num_avis_creer` FOREIGN KEY (`num_avis`) REFERENCES `avis` (`num_avis`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pseudo_creer` FOREIGN KEY (`pseudo`) REFERENCES `client` (`pseudo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `prix_unitaire_produit`
--
ALTER TABLE `prix_unitaire_produit`
  ADD CONSTRAINT `fk_ref_prod` FOREIGN KEY (`ref_prod`) REFERENCES `produit` (`ref_prod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `quantite_produit`
--
ALTER TABLE `quantite_produit`
  ADD CONSTRAINT `fk_ref_prod_qte` FOREIGN KEY (`ref_prod`) REFERENCES `produit` (`ref_prod`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `repondre`
--
ALTER TABLE `repondre`
  ADD CONSTRAINT `fk_id_user_repondre` FOREIGN KEY (`id_user`) REFERENCES `utilisateur` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_num_avis_repondre` FOREIGN KEY (`num_avis`) REFERENCES `avis` (`num_avis`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `vendre`
--
ALTER TABLE `vendre`
  ADD CONSTRAINT `fk_pseudo_vendre` FOREIGN KEY (`pseudo`) REFERENCES `client` (`pseudo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ref_prod_vendre` FOREIGN KEY (`ref_prod`) REFERENCES `produit` (`ref_prod`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
