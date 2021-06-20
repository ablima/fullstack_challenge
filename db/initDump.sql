-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: mystore
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

USE `mystore`;

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Notebooks','2021-06-14 21:12:20','2021-06-14 21:12:20'),(2,'Celular','2021-06-14 21:12:20','2021-06-14 21:12:20'),(3,'Games','2021-06-14 21:12:20','2021-06-14 21:12:20'),(4,'TV`s','2021-06-14 21:12:20','2021-06-14 21:12:20');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderproducts`
--

DROP TABLE IF EXISTS `orderproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderproducts` (
  `qnt` int DEFAULT NULL,
  `OrderId` int NOT NULL,
  `ProductId` int NOT NULL,
  PRIMARY KEY (`OrderId`,`ProductId`),
  KEY `ProductId` (`ProductId`),
  CONSTRAINT `orderproducts_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderproducts_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderproducts`
--

LOCK TABLES `orderproducts` WRITE;
/*!40000 ALTER TABLE `orderproducts` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `totalPrice` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `qnt` int DEFAULT NULL,
  `price` double DEFAULT NULL,
  `thumbnails` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (17,'Smartphone Galaxy A10S Dual 4G Android 9 32GB Cam 13MP + 2MP Camera Frontal 8MP Flash na Tela Octa-core Tela 6.2\" Azul Samsung','{\"MARCA\":\"Samsung\",\"MODELO\":\"A10S\",\"SISTEMA OPERACIONAL\":\"Android 9.0\",\"DISPLAY\":\"6.2\'\' | 157.9mm 720 x 1520 (HD+)\"}',8,949,'images/celular1-1.jpg;images/celular1-2.jpg;images/celular1-3.jpg','2021-06-14 21:12:20','2021-06-14 21:12:20',2),(18,'iPhone 12 Mini 256GB Preto MGE93BZ/A Apple','{\"MARCA\":\"Apple\",\"MODELO\":\"iPhone 12 mini\",\"REFERÊNCIA\":\"MGE93BZ/A\",\"MEMÓRIA INTERNA\":\"256GB\"}',5,7349,'images/celular2-1.jpg;images/celular2-2.jpg;images/celular2-3.jpg','2021-06-14 21:12:20','2021-06-19 15:05:26',2),(19,'iPhone SE Preto 64GB MHGP3BR/A Apple','{\"MARCA\":\"Apple\",\"MODELO\":\"MHGP3BR/A\",\"MEMÓRIA\":\"64GB\",\"PROCESSADOR\":\"Chip A13 Bionic com Neural Engine de 3ª geração.\"}',10,3079,'images/celular3-1.jpg;images/celular3-2.jpg;images/celular3-3.jpg;images/celular3-4.jpg','2021-06-14 21:12:20','2021-06-14 21:12:20',2),(20,'Smartphone Galaxy S21+ Dual Chip 5G Android 11 256GB|8GB RAM Cam 12MP+64MP+12MP+Camera Frontal 10MP Octa-Core Tela Infinita 6.7\" IP68 Preto Samsung','{\"MARCA\":\"Samsung\",\"MODELO\":\"S21+\",\"SISTEMA OPERACIONAL\":\"Android 11\",\"DISPLAY\":\"6.7\'\' | Dynamic AMOLED 2X (48-120Hz)\"}',2,7399,'images/celular4-1.jpg;images/celular4-2.jpg;images/celular4-3.jpg','2021-06-14 21:12:20','2021-06-19 03:11:47',2),(21,'Smartphone K62 Dual 4G Android 10 64GB Camera 48MP+5MP+5MP+2MP Tela 6.5\" Vermelho LG','{\"MARCA\":\"LG\",\"MODELO\":\"K62 | LM-K520BMW\",\"SISTEMA OPERACIONAL\":\"Android 10\",\"DISPLAY\":\"6.5\'\'\"}',6,1299,'images/celular5-1.jpg;images/celular5-2.jpg;images/celular5-3.jpg','2021-06-14 21:12:20','2021-06-19 15:05:29',2),(22,'Smartphone Moto G10 Android 11 64GB Cam 48MP+8MP+2MP+2MP Cam Frontal 8MP Octa-Core Tela 6,5\" Cinza Aurora Motorola','{\"MARCA\":\"Motorola\",\"MODELO\":\"PAMM0018BR\",\"SISTEMA OPERACIONAL\":\"Android 11\",\"PROCESSADOR\":\"Qualcomm Snapdragon 460 (1,8 GHz Octa-Core)\"}',5,1499,'images/celular6-1.jpg;images/celular6-2.jpg;images/celular6-3.jpg;images/celular6-4.jpg','2021-06-14 21:12:20','2021-06-14 21:12:20',2),(23,'Smartphone Galaxy A72 Dual 4G Android 11 128GB Cam 64MP+12MP+8MP+5MP+Camera Frontal 32MP Octa-Core Tela Infinita 6.7\" Branco Samsung','{\"MARCA\":\"Samsung\",\"MODELO REFERÊNCIA\":\"A72 | SM-A725MZWRZTO\",\"TIPO DE PROCESSADOR\":\"Octa Core\",\"SISTEMA\":\"Android 11\"}',2,2799,'images/celular7-1.jpg;images/celular7-2.jpg','2021-06-14 21:12:20','2021-06-14 21:12:20',2),(24,'Notebook FE14 Intel Core i3-8130U 2.20 GHZ 4GB SSD 128GB 14\" FHD Windows 10 Home Chumbo Vaio','{\"MARCA\":\"Vaio\",\"SISTEMA OPERACIONAL\":\"Windows 10 Home\",\"PROCESSADOR\":\"Intel Core i3-8130U (2.20GHz; 4MB cache)\"}',0,3599,'images/notebook1-1.jpg;images/notebook1-2.jpg;images/notebook1-3.jpg;images/notebook1-4.jpg','2021-06-14 21:12:20','2021-06-19 02:57:19',1),(25,'Notebook Galaxy Book S Intel Core i5-L16G7 1.4 GHz 8GB HD 256G SSD 13.3\" LED FULL HD Touch Windows 10 Home Cinza Samsung','{\"MARCA\":\"Samsung\",\"MODELO\":\"NP767XCM-K01BR\", \"PROCESSADOR\":\"Intel® Core™ i5-L16G7 (1.4GHz; 4MB Cache)\",\"SISTEMA OPERACIONAL\":\"Windows 10 Home\"}',12,6999,'images/notebook2-1.jpg;images/notebook2-2.jpg;images/notebook2-3.jpg','2021-06-14 21:12:20','2021-06-19 13:36:10',1),(26,'Notebook Samsung Book Intel I7 2.8GHz 8GB SSD 256GB 15.6\" LED FHD GeForce MX450 2GB Windows 10 Home Cinza Samsung','{\"MARCA\":\"Samsung\",\"MODELO\":\"NP550XDA-XS1BR\",\"SISTEMA OPERACIONAL\":\"Windows 10 Home\",\"PROCESSADOR\":\"Intel Core i7 - 1165G7 (2.80GHz até 4.70GHz; 12MB L3)\"}',1,6199,'images/notebook3-1.jpg;images/notebook3-2.jpg;images/notebook3-3.jpg;images/notebook3-4.jpg','2021-06-14 21:12:20','2021-06-19 15:05:49',1),(27,'Notebook Essentials E30 Intel Core I3 7020U 2.3GHz 4GBGB 1TB 15.6\" Full HD Windows 10 Home Branco Onix SAMSUNG','{\"Marca\":\"Samsung\",\"Modelo\":\"NP350XAA-KF4BR\",\"Sistema Operacional\":\"Windows 10 Home\",\"Processador\":\"Intel Core i3 Processor 7020U (2.30 GHz, 3 MB L3 Cache)\"}',14,2699,'images/notebook4-1.jpg;images/notebook4-2.jpg;images/notebook4-3.jpg','2021-06-14 21:12:20','2021-06-19 15:05:43',1),(28,'Pré-Venda - Console PlayStation 5 825GB SSD Branco - Sony','{\"MARCA\":\"Sony\",\"MODELO\":\"PlayStation 5\",\"JOGOS PARA TVs 4K\":\"Curta seus jogos favoritos do PS5 na sua incrível TV 4K.\"}',7,4699,'images/games1-1.jpg;images/games1-2.jpg','2021-06-14 21:12:20','2021-06-19 13:30:54',3),(29,'Console New Nintendo Switch 32GB Com Joy-Con - Nintendo','{\"Marca\":\"PowerA\",\"Modelo\":\"Joy-cons L e R\",\"Cor\":\"Azul e amarelo\",\"Dimensões\":\"12.2 x 11.17 x 4.31 cm\"}',3,2799,'images/games2-1.jpg;images/games2-2.jpg;images/games2-3.jpg','2021-06-14 21:12:20','2021-06-19 13:35:14',3),(30,'Jogo para PS4 Bloodborne Hits - Sony','{\"Marca\":\"From Software\",\"Gênero\":\"Aventura/Ação/RPG\",\"Jogo\":\"Bloodborne\"}',4,99,'images/games3-1.jpg','2021-06-14 21:12:20','2021-06-19 15:04:56',3),(31,'Jogo para PS5 Demon´s Souls - Sony','{\"Plataforma\":\"PS5\",\"Fabricante do Software\":\"Solutions 2 GO\",\"Developer\":\"JAPAN STUDIO & Bluepoint Games\",\"Categoria do Jogo\":\"Ação / RPG\"}',8,349,'images/games4-1.jpg','2021-06-14 21:12:20','2021-06-19 13:36:20',3),(32,'Jogo para Nintendo Switch Legend of Zelda: Breath of the Wild - Nintendo','{\"Marca\":\"Nintendo\",\"Gênero\":\"Ação/Aventura\",\"Jogo\":\"The Legend of Zelda\",\"Série do Jogo\":\"Breath of the Wild\"}',4,399.95,'images/games5-1.jpg','2021-06-14 21:12:20','2021-06-14 21:12:20',3),(33,'Jogo para Nintendo Switch Super Mario Odyssey - Nintendo','{\"Marca\":\"Nintendo\",\"Gênero\":\"Ação\",\"Jogo\":\"Super Mario\",\"Série do Jogo\":\"Odyssey\"}',1,399.95,'images/games6-1.jpg','2021-06-14 21:12:20','2021-06-14 21:12:20',3),(34,'Smart TV OLED 65\'\' UHD 4K BT ThinQ AI Google Alexa OLED65CXPSA LG','{\"MARCA\":\"LG\",\"MODELO\":\"OLED65CXPSA\", \"POLEGADAS\":\"65\'\'\",\"DIMENSÕES (LxAxP)\":\"1449 x 830 x 46.9\"}',3,14299,'images/tvs1-1.jpg;images/tvs1-2.jpg;images/tvs1-3.jpg','2021-06-14 21:12:20','2021-06-14 21:12:20',4),(35,'Samsung Smart TV 65\" UHD 4K 65AU7700, Processador Crystal 4K, Tela sem limites, Visual Livre de Cabos, Alexa built in, Controle Unico','{\"MARCA\":\"Samsung\",\"MODELO\":\"UN65AU7700GXZD\",\"TELA\":\"65\'\', Resolução: 3.840 x 2.160\"}',4,5249,'images/tvs2-1.jpg;images/tvs2-2.jpg;images/tvs2-3.jpg;images/tvs2-4.jpg','2021-06-14 21:12:20','2021-06-19 15:05:30',4),(36,'Samsung Smart TV 55\" QLED 4K 55Q80A, Modo Game, Processador IA, Som em Movimento, Tela sem limites, Visual livre de cabos, Alexa built in','{\"MARCA\":\"Samsung\",\"MODELO\":\"QN55Q80AAGXZD\",\"TELA\":\"55\'\'; Resolução: 3.840 x 2.160\"}',2,6999,'images/tvs3-1.jpg;images/tvs3-2.jpg;images/tvs3-3.jpg','2021-06-14 21:12:20','2021-06-14 21:12:20',4);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Anderson Lima','anderson.lima@gmail.com','123456','2021-06-14 21:12:20','2021-06-14 21:12:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-20  9:40:02
