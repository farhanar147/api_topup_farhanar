-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2025 at 11:29 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_topup`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` bigint(20) NOT NULL,
  `service_id` bigint(20) NOT NULL,
  `transaction_type` varchar(100) NOT NULL,
  `total_amount` decimal(15,2) NOT NULL,
  `invoice_number` varchar(100) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `users_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `service_id`, `transaction_type`, `total_amount`, `invoice_number`, `created_on`, `users_id`) VALUES
(1, 1, 'TOPUP', '100000.00', 'A17364BC53', '2025-10-29 06:43:14', 1),
(2, 1, 'TOPUP', '300000.00', 'BAC351A164', '2025-10-29 06:49:31', 1),
(3, 2, 'PAYMENT', '5000.00', 'A1896260F6', '2025-10-29 07:21:19', 1),
(4, 2, 'PAYMENT', '5000.00', '134F81B795', '2025-10-29 07:24:10', 1),
(5, 2, 'PAYMENT', '5000.00', '38A2089ADB', '2025-10-29 07:29:42', 1),
(6, 1, 'TOPUP', '100000.00', 'B34AC6804C', '2025-10-29 07:30:44', 1),
(7, 1, 'TOPUP', '100000.00', 'B8636F7F80', '2025-10-29 07:51:26', 1),
(8, 1, 'TOPUP', '100000.00', 'D06693CB3B', '2025-10-29 07:51:28', 1),
(9, 1, 'TOPUP', '0.00', 'E6B762FA29', '2025-10-29 07:51:39', 1);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) NOT NULL,
  `payments_amount` decimal(15,2) NOT NULL,
  `invoice_number` varchar(100) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `users_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `payments_amount`, `invoice_number`, `create_at`, `users_id`) VALUES
(1, '100000.00', 'A17364BC53', '2025-10-29 06:43:14', 1),
(2, '300000.00', 'BAC351A164', '2025-10-29 06:49:31', 1),
(3, '5000.00', 'A1896260F6', '2025-10-29 07:21:19', 1),
(4, '5000.00', '134F81B795', '2025-10-29 07:24:10', 1),
(5, '5000.00', '38A2089ADB', '2025-10-29 07:29:42', 1);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) NOT NULL,
  `service_code` varchar(100) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_code`, `service_name`, `price`, `created_at`) VALUES
(1, 'TOPUP', 'TOPUP', '0.00', '2025-10-29 07:00:26'),
(2, 'PULSA', 'PULSA PRABAYAR', '5000.00', '2025-10-29 07:00:26');

-- --------------------------------------------------------

--
-- Table structure for table `topups`
--

CREATE TABLE `topups` (
  `id` bigint(20) NOT NULL,
  `topup_amount` decimal(15,2) NOT NULL,
  `invoice_number` varchar(100) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `users_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topups`
--

INSERT INTO `topups` (`id`, `topup_amount`, `invoice_number`, `create_at`, `users_id`) VALUES
(1, '100000.00', 'A17364BC53', '2025-10-29 06:43:14', 1),
(2, '300000.00', 'BAC351A164', '2025-10-29 06:49:31', 1),
(3, '100000.00', 'B34AC6804C', '2025-10-29 07:30:44', 1),
(4, '100000.00', 'B8636F7F80', '2025-10-29 07:51:26', 1),
(5, '100000.00', 'D06693CB3B', '2025-10-29 07:51:28', 1),
(6, '0.00', 'E6B762FA29', '2025-10-29 07:51:39', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `first_name`, `last_name`, `password`, `created_at`) VALUES
(1, 'farhan@example.com', 'Farhan', 'Rasyid', '$2b$10$6yC2XOcBUvibrJ4NYb4VmumTKuKM7/b7CYnAd6NsQd3irenRuXOTq', '2025-10-29 04:35:20'),
(2, 'farhan12@example.com', '', 'Rasyid', '$2b$10$/n/4JffxayRN8moyazyQmubBRKFZTRvQUyjpl8wn8rnauQ1wGdMgS', '2025-10-29 04:36:28'),
(3, 'farhan23@example.com', 'ajk', 'Rasyid', '$2b$10$.8B3KdQW34Zf9aTLeYVkyus6Wos5em.dXLkZwUQB.JgykG9aD1anG', '2025-10-29 04:42:48');

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` bigint(20) NOT NULL,
  `users_id` bigint(20) NOT NULL,
  `saldo` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `users_id`, `saldo`, `created_at`) VALUES
(1, 1, '675000.00', '2025-10-29 07:51:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `history` (`users_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments` (`users_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topups`
--
ALTER TABLE `topups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`users_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wallet` (`users_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `topups`
--
ALTER TABLE `topups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `topups`
--
ALTER TABLE `topups`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `wallets`
--
ALTER TABLE `wallets`
  ADD CONSTRAINT `wallet` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
