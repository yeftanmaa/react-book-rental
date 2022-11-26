-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2022 at 02:13 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookrepo`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_auth`
--

CREATE TABLE `admin_auth` (
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_auth`
--

INSERT INTO `admin_auth` (`email`, `password`) VALUES
('eve.holt@reqres.in', 'cityslicka');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_id` int(5) NOT NULL,
  `book_title` varchar(256) NOT NULL,
  `book_author` varchar(256) NOT NULL,
  `book_publishDate` date NOT NULL DEFAULT current_timestamp(),
  `book_ISBN` int(8) NOT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `onBorrow` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `book_title`, `book_author`, `book_publishDate`, `book_ISBN`, `isAvailable`, `onBorrow`) VALUES
(1, 'Programming Language for Dummies', 'Pearl Humidian', '2014-03-23', 14589252, 0, 5),
(2, 'Python & Machine Learning', 'KH Supratman', '2010-03-27', 39587298, 1, 4),
(3, 'C# Environment', 'Jack McClury', '2019-09-10', 968742084, 1, 3),
(4, 'How to Learn UI/UX Design', 'Kevin Jayaputra', '2020-09-17', 45839291, 0, 5),
(5, 'Front End VS Back End', 'Wahyu Pramudiana', '2018-09-20', 4581934, 1, 4),
(6, 'Human Interaction with Computer', 'Pearl Humidian', '2011-01-30', 3587124, 0, 5),
(7, 'Tragedy in Oschbur Family', 'Rudy Biana', '2014-04-12', 294819230, 1, 2),
(8, 'Jack the Ripper Vol. 1', 'Kellyn Quinch Abigail', '2022-11-23', 172939291, 1, 2),
(9, 'Jack the Ripper Vol. 2', 'Kellyn Quinch Abigail', '2022-11-22', 2147483647, 0, 5),
(10, 'Salvation of the Saint', 'Keigo Higashino', '2013-05-14', 138895037, 0, 5),
(36, 'Atomic Habits', 'James Clear', '2022-06-17', 194732952, 1, 3),
(37, 'Zero to One', 'Peter Thiel', '2022-12-05', 405100548, 1, 2),
(38, 'Sapiens', 'Yuval Noah Harari', '2014-02-26', 2147483647, 1, 1),
(39, 'The Selfish Gene', 'Richard Dawkins', '2015-03-12', 1928324112, 0, 5),
(40, 'Loonshots', 'Safi Bahcall', '2012-06-27', 105485866, 0, 5),
(42, 'Homo Deus', 'Yuval Noah Harari', '2002-12-16', 997546326, 1, 4),
(43, 'Project Hail Mary', 'Andy Weir', '1990-02-10', 104875385, 0, 5),
(48, 'Why We Sleep', 'Matthew West', '2016-07-19', 867142581, 1, 3),
(49, 'The Interstellar', 'Charlin Houtson', '2010-02-13', 104854396, 1, 4),
(56, '5 AM Club', 'Andrew McTate', '2022-11-25', 34928545, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `wishlist_id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `book_name` varchar(256) NOT NULL,
  `dateStart` date NOT NULL,
  `dateEnd` date NOT NULL,
  `book_author` varchar(256) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`wishlist_id`, `name`, `book_name`, `dateStart`, `dateEnd`, `book_author`, `book_id`) VALUES
(1, 'yeftanma', '5 AM Club', '2022-10-09', '2022-11-25', 'Andrew McTate', 56),
(2, 'yeftanma', 'Homo Deus', '2022-08-20', '2022-09-20', 'Yuval Noah Harari', 42),
(7, 'alimc23', 'Front End VS Back End', '2022-08-20', '2022-09-20', 'Wahyu Pramudiana', 5),
(10, 'alimc23', 'Sapiens', '2022-08-20', '2022-09-20', 'Yuval Noah Harari', 38),
(13, 'alimc23', 'Zero to One', '2022-08-20', '2022-09-20', 'Peter Thiel', NULL),
(14, 'alimc23', 'Jack the Ripper Vol. 1', '2022-08-20', '2022-09-20', 'Kellyn Quinch Abigail', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`wishlist_id`),
  ADD KEY `book_id` (`book_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `book_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `wishlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
