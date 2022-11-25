-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2022 at 09:08 AM
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
(2, 'Python & Machine Learning', 'KH Supratman', '2010-03-28', 39587298, 0, 5),
(3, 'C# Environment', 'Jack McClury', '2019-09-11', 968742084, 1, 4),
(4, 'How to Learn UI/UX Design', 'Kevin Jayaputra', '2020-09-17', 45839291, 0, 5),
(5, 'Front End VS Back End', 'Wahyu Pramudiana', '2018-09-22', 4581934, 1, 3),
(6, 'Human Interaction with Computer', 'Pearl Humidian', '2011-02-02', 3587124, 1, 2),
(7, 'Tragedy in Oschbur Family', 'Rudy Biana', '2014-04-12', 294819230, 0, 5),
(8, 'Jack the Ripper Vol. 1', 'Kellyn Quinch Abigail', '2022-11-24', 172939291, 1, 4),
(9, 'Jack the Ripper Vol. 2', 'Kellyn Quinch Abigail', '2022-11-22', 2147483647, 0, 5),
(10, 'Salvation of the Saint', 'Keigo Higashino', '2013-05-14', 138895037, 0, 5),
(36, 'Atomic Habits', 'James Clear', '2022-06-17', 194732952, 1, 3),
(37, 'Zero to One', 'Peter Thiel', '2022-12-06', 405100548, 1, 1),
(38, 'Sapiens', 'Yuval Noah Harari', '2014-02-27', 2147483647, 1, 0),
(39, 'The Selfish Gene', 'Richard Dawkins', '2015-03-12', 1928324112, 0, 5),
(40, 'Loonshots', 'Safi Bahcall', '2012-06-27', 2147483647, 0, 5),
(42, 'Homo Deus', 'Yuval Noah Harari', '2002-12-16', 997546326, 1, 4),
(43, 'Project Hail Mary', 'Andy Weir', '1990-02-10', 2147483647, 0, 5),
(48, 'Why We Sleep', 'Matthew West', '2016-07-19', 2147483647, 1, 3),
(49, 'The Interstellar', 'Charlin Houtson', '2010-02-13', 2147483647, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `wishlist_id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `book_name` varchar(256) NOT NULL,
  `dateStart` date NOT NULL,
  `dateEnd` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD PRIMARY KEY (`wishlist_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `book_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `wishlist_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
