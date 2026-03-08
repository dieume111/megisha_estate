-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2026 at 02:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `megishadata`
--

-- --------------------------------------------------------

--
-- Table structure for table `apartments`
--

CREATE TABLE `apartments` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `bathrooms` int(11) NOT NULL,
  `area` varchar(100) NOT NULL,
  `floor_number` int(11) NOT NULL,
  `total_floors` int(11) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `currency` varchar(3) DEFAULT 'RWF',
  `image_url` text DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `status` enum('available','sold','rented','pending') DEFAULT 'available',
  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amenities`)),
  `building_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`building_features`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `apartments`
--

INSERT INTO `apartments` (`id`, `title`, `description`, `location`, `bedrooms`, `bathrooms`, `area`, `floor_number`, `total_floors`, `price`, `currency`, `image_url`, `featured`, `status`, `amenities`, `building_features`, `created_at`, `updated_at`) VALUES
(1, 'Modern 2BR Apartment', 'Contemporary apartment with city views and modern amenities', 'Kigali, Kimihurura', 2, 1, '120 sqm', 5, 12, 35000000.00, 'RWF', 'https://images.unsplash.com/photo-1600047509807-bfb8c5e9cb8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 1, 'available', '[\"Balcony\", \"Parking\", \"Security\", \"Gym Access\", \"Storage\", \"Modern Kitchen\"]', '[\"Elevator\", \"24/7 Security\", \"Backup Power\", \"Rooftop Garden\", \"Concierge Service\"]', '2026-03-01 13:59:22', '2026-03-01 13:59:22'),
(2, 'Luxury Penthouse', 'Exclusive penthouse with panoramic city views and premium finishes', 'Kigali, City Center', 3, 2, '200 sqm', 12, 12, 95000000.00, 'RWF', 'https://images.unsplash.com/photo-1600607217924-79b2d4e4c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'available', '[\"Rooftop Terrace\", \"City Views\", \"Modern Kitchen\", \"Wine Storage\", \"Private Elevator\"]', '[\"Concierge Service\", \"Smart Home\", \"Private Elevator\", \"Sky Lounge\", \"Butler Service\"]', '2026-03-01 13:59:22', '2026-03-01 13:59:22'),
(3, 'Cozy Studio Apartment', 'Perfect starter apartment in quiet neighborhood with great amenities', 'Kigali, Nyamirambo', 1, 1, '60 sqm', 3, 8, 18000000.00, 'RWF', 'https://images.unsplash.com/photo-1613478607407-4a7d1f077b1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'rented', '[\"Balcony\", \"Security\", \"Modern Kitchen\", \"Built-in Wardrobes\"]', '[\"Elevator\", \"Security\", \"Parking\", \"Laundry Room\", \"Community Garden\"]', '2026-03-01 13:59:22', '2026-03-01 13:59:22');

-- --------------------------------------------------------

--
-- Table structure for table `cadastral_surveying`
--

CREATE TABLE `cadastral_surveying` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `project_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `property_type` enum('Residential','Commercial','Industrial','Agricultural','Mixed Use') NOT NULL,
  `area` varchar(50) NOT NULL,
  `status` enum('Planning','In Progress','Completed','On Hold') DEFAULT 'Planning',
  `description` text DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `parcel_number` varchar(100) DEFAULT NULL,
  `title_number` varchar(100) DEFAULT NULL,
  `survey_type` enum('Land Registration','Property Boundary Survey','Land Title Processing','Property Valuation') NOT NULL,
  `survey_date` date DEFAULT NULL,
  `completion_date` date DEFAULT NULL,
  `coordinates` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`coordinates`)),
  `boundary_markers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`boundary_markers`)),
  `legal_documents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`legal_documents`)),
  `survey_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`survey_features`)),
  `property_value` decimal(12,2) DEFAULT NULL,
  `survey_cost` decimal(10,2) DEFAULT NULL,
  `surveyor_name` varchar(255) DEFAULT NULL,
  `approval_status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `government_fees` decimal(10,2) DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `priority` enum('Low','Medium','High','Urgent') DEFAULT 'Medium',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cadastral_surveying`
--

INSERT INTO `cadastral_surveying` (`id`, `project_name`, `location`, `property_type`, `area`, `status`, `description`, `client_name`, `parcel_number`, `title_number`, `survey_type`, `survey_date`, `completion_date`, `coordinates`, `boundary_markers`, `legal_documents`, `survey_features`, `property_value`, `survey_cost`, `surveyor_name`, `approval_status`, `government_fees`, `image_url`, `featured`, `priority`, `created_at`, `updated_at`) VALUES
(1, 'Residential Land Registration - Kigali', 'Kacyiru, Kigali', 'Residential', '500 sqm', 'Completed', 'Complete cadastral survey and land registration for residential property', 'John Mugisha', 'PRC-2024-0156', 'LT-457896', 'Land Registration', '2024-01-10', '2024-02-15', '{\"northeast\": {\"lat\": -1.9536, \"lng\": 30.0605}, \"southwest\": {\"lat\": -1.9546, \"lng\": 30.0595}}', '[\"Concrete Marker 1\", \"Concrete Marker 2\", \"Concrete Marker 3\", \"Concrete Marker 4\"]', '[\"Application Form\", \"ID Documents\", \"Previous Title\", \"Tax Receipts\"]', '[\"Boundary Marking\", \"Legal Documentation\", \"Government Filing\", \"Title Processing\"]', 25000000.00, 500000.00, 'Jean Baptiste', 'Approved', 150000.00, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 1, 'High', '2026-03-01 14:59:31', '2026-03-01 14:59:31'),
(2, 'Commercial Property Survey - Nyarutarama', 'Nyarutarama, Kigali', 'Commercial', '1200 sqm', 'Completed', 'Boundary survey and title processing for commercial development', 'Nyarutarama Developers Ltd', 'PRC-2024-0234', 'LT-457897', 'Property Boundary Survey', '2024-02-01', '2024-03-10', '{\"northeast\": {\"lat\": -1.9436, \"lng\": 30.0705}, \"southwest\": {\"lat\": -1.9446, \"lng\": 30.0695}}', '[\"Steel Marker 1\", \"Steel Marker 2\", \"Steel Marker 3\", \"Steel Marker 4\"]', '[\"Site Plan\", \"Building Permit\", \"Environmental Clearance\", \"Tax Clearance\"]', '[\"GPS Surveying\", \"Boundary Markers\", \"Coordinate Mapping\", \"Dispute Resolution\"]', 85000000.00, 1200000.00, 'Michel Ntaganda', 'Approved', 450000.00, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'Medium', '2026-03-01 14:59:31', '2026-03-01 14:59:31'),
(3, 'Agricultural Land Mapping - Eastern Province', 'Kayonza, Rwanda', 'Agricultural', '5 hectares', 'In Progress', 'Large-scale agricultural land boundary survey and registration', 'Eastern Farmers Cooperative', 'PRC-2024-0456', NULL, 'Land Title Processing', '2024-03-01', NULL, '{\"northeast\": {\"lat\": -1.3536, \"lng\": 30.3605}, \"southwest\": {\"lat\": -1.3636, \"lng\": 30.3505}}', '[\"Concrete Pillar 1\", \"Concrete Pillar 2\", \"Concrete Pillar 3\", \"Concrete Pillar 4\", \"Concrete Pillar 5\"]', '[\"Cooperative Registration\", \"Land Use Plan\", \"Environmental Assessment\"]', '[\"Title Search\", \"Transfer Processing\", \"Registration\", \"Certificate Issuance\"]', 15000000.00, 2500000.00, 'Joseph Karemera', 'Pending', 750000.00, 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'Medium', '2026-03-01 14:59:31', '2026-03-01 14:59:31');

-- --------------------------------------------------------

--
-- Table structure for table `commercial`
--

CREATE TABLE `commercial` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `area` varchar(100) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `currency` varchar(3) DEFAULT 'RWF',
  `property_type` enum('office','retail','warehouse','industrial','mixed') DEFAULT 'office',
  `floors` int(11) DEFAULT 1,
  `parking_spaces` int(11) DEFAULT 0,
  `image_url` text DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `status` enum('available','sold','leased','pending') DEFAULT 'available',
  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amenities`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commercial`
--

INSERT INTO `commercial` (`id`, `title`, `description`, `location`, `area`, `price`, `currency`, `property_type`, `floors`, `parking_spaces`, `image_url`, `featured`, `status`, `amenities`, `created_at`, `updated_at`) VALUES
(1, 'Modern Office Complex', 'Prime office space in city center with modern amenities and excellent connectivity', 'Kigali, City Center', '500 sqm', 85000000.00, 'RWF', 'office', 3, 20, 'https://images.unsplash.com/photo-1497366216546-3f970773e440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 1, 'available', '[\"Elevator\", \"Parking\", \"Security\", \"Conference Rooms\", \"Kitchen\", \"High-speed Internet\", \"Backup Power\"]', '2026-03-01 14:00:51', '2026-03-01 14:00:51'),
(2, 'Retail Space in Shopping Mall', 'High-traffic retail location with excellent visibility and foot traffic', 'Kigali, Kiyovu', '200 sqm', 45000000.00, 'RWF', 'retail', 1, 10, 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'available', '[\"Display Windows\", \"Storage\", \"Security\", \"Parking\", \"Air Conditioning\", \"Lighting\"]', '2026-03-01 14:00:51', '2026-03-01 14:00:51'),
(3, 'Industrial Warehouse', 'Large warehouse space ideal for storage and distribution operations', 'Kigali, Nyabugogo', '1000 sqm', 120000000.00, 'RWF', 'warehouse', 1, 50, 'https://images.unsplash.com/photo-1581094794329-cbf11b6246c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'available', '[\"Loading Dock\", \"High Ceiling\", \"Security\", \"Parking\", \"Office Space\", \"Restrooms\"]', '2026-03-01 14:00:51', '2026-03-01 14:00:51');

-- --------------------------------------------------------

--
-- Table structure for table `construction_surveying`
--

CREATE TABLE `construction_surveying` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `project_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `construction_type` enum('Commercial','Residential','Industrial','Infrastructure','Institutional') NOT NULL,
  `building_details` varchar(100) DEFAULT NULL,
  `area` varchar(50) NOT NULL,
  `status` enum('Planning','In Progress','Completed','On Hold','Delayed') DEFAULT 'Planning',
  `description` text DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `contractor_name` varchar(255) DEFAULT NULL,
  `architect_name` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `completion_date` date DEFAULT NULL,
  `survey_phase` enum('Design Review','Site Preparation','Layout Marking','Quality Control','As-Built') NOT NULL,
  `survey_type` enum('Site Layout Survey','Construction Monitoring','As-Built Survey','Deformation Monitoring') NOT NULL,
  `building_floors` int(11) DEFAULT NULL,
  `foundation_type` varchar(50) DEFAULT NULL,
  `structural_system` varchar(50) DEFAULT NULL,
  `survey_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`survey_features`)),
  `monitoring_points` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`monitoring_points`)),
  `tolerance_standards` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tolerance_standards`)),
  `quality_checks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`quality_checks`)),
  `equipment_used` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`equipment_used`)),
  `survey_team` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`survey_team`)),
  `safety_measures` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`safety_measures`)),
  `survey_cost` decimal(12,2) DEFAULT NULL,
  `project_value` decimal(15,2) DEFAULT NULL,
  `progress_percentage` decimal(5,2) DEFAULT 0.00,
  `deviations_found` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`deviations_found`)),
  `completion_certificate` tinyint(1) DEFAULT 0,
  `image_url` text DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `priority` enum('Low','Medium','High','Urgent') DEFAULT 'Medium',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `construction_surveying`
--

INSERT INTO `construction_surveying` (`id`, `project_name`, `location`, `construction_type`, `building_details`, `area`, `status`, `description`, `client_name`, `contractor_name`, `architect_name`, `start_date`, `completion_date`, `survey_phase`, `survey_type`, `building_floors`, `foundation_type`, `structural_system`, `survey_features`, `monitoring_points`, `tolerance_standards`, `quality_checks`, `equipment_used`, `survey_team`, `safety_measures`, `survey_cost`, `project_value`, `progress_percentage`, `deviations_found`, `completion_certificate`, `image_url`, `featured`, `priority`, `created_at`, `updated_at`) VALUES
(1, 'Commercial Complex - Kigali City Center', 'Kigali, Rwanda', 'Commercial', '25 Floors', '15,000 m²', 'Completed', 'Complete construction surveying for high-rise commercial complex', 'Kigali Commercial Properties Ltd', 'Construction Rwanda Ltd', 'Architects Rwanda', '2024-01-01', '2024-06-30', '', 'Construction Monitoring', 25, 'Deep Foundation', 'RC Frame', '[\"Building Layout\", \"Foundation Marking\", \"Grid Establishment\", \"Control Points\"]', '[\"MP-001\", \"MP-002\", \"MP-003\", \"MP-004\", \"MP-005\", \"MP-006\", \"MP-007\", \"MP-008\"]', '[\"Vertical Tolerance: ±10mm\", \"Horizontal Tolerance: ±15mm\", \"Dimensional Tolerance: ±5mm\"]', '[\"Alignment Checks\", \"Dimensional Control\", \"Level Verification\", \"Plumb Verification\"]', '[\"Total Station\", \"Laser Scanner\", \"Digital Level\", \"GPS Receivers\"]', '[\"Lead Surveyor\", \"Assistant Surveyor\", \"Technician\", \"Quality Controller\"]', '[\"Safety Harness\", \"Hard Hats\", \"Safety Boots\", \"High Visibility Vests\", \"Fall Protection\"]', 2800000.00, 250000000.00, 100.00, '[\"Minor alignment corrections on floor 15\", \"Elevation adjustments on ground floor\"]', 1, 'https://images.unsplash.com/photo-1541882090-65e832e95b85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 1, 'High', '2026-03-01 15:13:03', '2026-03-01 15:13:03'),
(2, 'Residential Development - Nyarutarama', 'Nyarutarama, Kigali', 'Residential', '10 Buildings', '8,000 m²', 'In Progress', 'Multi-building residential complex construction monitoring', 'Nyarutarama Housing Development', 'Home Builders Rwanda', 'Residential Architects Ltd', '2024-02-15', NULL, 'Quality Control', 'Site Layout Survey', 4, 'Shallow Foundation', 'Load Bearing Masonry', '[\"Building Layout\", \"Foundation Marking\", \"Grid Establishment\", \"Control Points\"]', '[\"BLK-A-MP1\", \"BLK-A-MP2\", \"BLK-B-MP1\", \"BLK-B-MP2\", \"BLK-C-MP1\", \"BLK-C-MP2\"]', '[\"Vertical Tolerance: ±15mm\", \"Horizontal Tolerance: ±20mm\", \"Dimensional Tolerance: ±10mm\"]', '[\"Progress Monitoring\", \"Dimensional Control\", \"Alignment Checks\", \"Quality Assurance\"]', '[\"Total Station\", \"Digital Level\", \"Measuring Tapes\", \"Laser Distance Meter\"]', '[\"Site Surveyor\", \"Assistant Surveyor\", \"Quality Inspector\"]', '[\"Site Safety Plan\", \"Personal Protective Equipment\", \"Tool Box Talks\", \"Safety Signage\"]', 1500000.00, 45000000.00, 65.00, '[\"Foundation level corrections in Block B\", \"Wall alignment adjustments in Block A\"]', 0, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'Medium', '2026-03-01 15:13:03', '2026-03-01 15:13:03'),
(3, 'Industrial Facility - Special Economic Zone', 'Masoro, Rwanda', 'Industrial', 'Single Level', '20,000 m²', 'Planning', 'Large-scale industrial facility construction surveying', 'SEZ Industrial Development', 'Industrial Construction Ltd', 'Industrial Architects International', '2024-04-01', NULL, 'Design Review', 'Site Layout Survey', 1, 'Pile Foundation', 'Steel Structure', '[\"Building Layout\", \"Foundation Marking\", \"Grid Establishment\", \"Control Points\"]', '[\"IND-MP-001\", \"IND-MP-002\", \"IND-MP-003\", \"IND-MP-004\"]', '[\"Vertical Tolerance: ±25mm\", \"Horizontal Tolerance: ±30mm\", \"Dimensional Tolerance: ±15mm\"]', '[\"Site Assessment\", \"Safety Planning\", \"Environmental Impact\", \"Operational Design\"]', '[\"GPS Equipment\", \"Total Station\", \"Drone\", \"Survey Software\"]', '[\"Lead Surveyor\", \"Senior Surveyor\", \"Junior Surveyor\", \"CAD Technician\"]', '[\"Industrial Safety Plan\", \"Heavy Equipment Safety\", \"Material Handling Safety\", \"Emergency Response Plan\"]', 3500000.00, 180000000.00, 0.00, '[]', 0, 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'High', '2026-03-01 15:13:03', '2026-03-01 15:13:03');

-- --------------------------------------------------------

--
-- Table structure for table `mining_surveying`
--

CREATE TABLE `mining_surveying` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `project_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `mineral_type` varchar(100) NOT NULL,
  `status` enum('Planning','In Progress','Completed','On Hold') DEFAULT 'Planning',
  `description` text DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `completion_date` date DEFAULT NULL,
  `survey_type` enum('Mineral Exploration','Mine Planning','Resource Assessment','Environmental Compliance') NOT NULL,
  `survey_area` decimal(12,2) DEFAULT NULL,
  `estimated_value` decimal(15,2) DEFAULT NULL,
  `team_size` int(11) DEFAULT 1,
  `equipment_used` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`equipment_used`)),
  `survey_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`survey_features`)),
  `findings` text DEFAULT NULL,
  `recommendations` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `priority` enum('Low','Medium','High','Urgent') DEFAULT 'Medium',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plots`
--

CREATE TABLE `plots` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `size` varchar(50) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'RWF',
  `use_type` enum('commercial','residential','industrial','agricultural') NOT NULL,
  `location` varchar(255) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `status` enum('available','sold','pending') DEFAULT 'available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plots`
--

INSERT INTO `plots` (`id`, `title`, `description`, `size`, `price`, `currency`, `use_type`, `location`, `image_url`, `featured`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Kigali City Center Plot', 'Prime commercial land in the heart of Kigali city center with excellent road access and utilities', '500 sqm', 50000000.00, 'RWF', 'commercial', 'Kigali, Rwanda', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 1, 'available', '2026-03-01 10:32:25', '2026-03-01 10:32:25'),
(2, 'Kacyiru Residential Plot', 'Beautiful residential plot in upscale Kacyiru neighborhood with great views', '300 sqm', 35000000.00, 'RWF', 'residential', 'Kigali, Kacyiru', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 1, 'available', '2026-03-01 10:32:25', '2026-03-01 10:32:25'),
(3, 'Nyabugogo Commercial Plot', 'Strategic commercial plot near Nyabugogo bus terminal', '800 sqm', 75000000.00, 'RWF', 'commercial', 'Kigali, Nyabugogo', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'available', '2026-03-01 10:32:25', '2026-03-01 10:32:25'),
(4, 'Kimihurura Residential Plot', 'Premium residential plot in prestigious Kimihurura area', '400 sqm', 45000000.00, 'RWF', 'residential', 'Kigali, Kimihurura', 'https://images.unsplash.com/photo-1600047509807-bfb8c5e9cb8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'pending', '2026-03-01 10:32:25', '2026-03-01 10:32:25'),
(5, 'Remera Mixed Use Plot', 'Versatile plot suitable for both commercial and residential development', '600 sqm', 55000000.00, 'RWF', 'commercial', 'Kigali, Remera', 'https://images.unsplash.com/photo-1600597156733-88e9b41da852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 1, 'available', '2026-03-01 10:32:25', '2026-03-01 10:32:25'),
(6, 'Kicukiro Agricultural Plot', 'Large agricultural plot perfect for farming development', '2000 sqm', 25000000.00, 'RWF', 'agricultural', 'Kigali, Kicukiro', 'https://images.unsplash.com/photo-1500937386664-56d1df01d4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'available', '2026-03-01 10:32:25', '2026-03-01 10:32:25'),
(7, 'imasaka', 'inzu ikodeshwa', '500 km2', 400000.00, 'RWF', 'residential', 'masaka', NULL, 0, 'pending', '2026-03-01 14:20:35', '2026-03-01 14:20:35');

-- --------------------------------------------------------

--
-- Table structure for table `residentials`
--

CREATE TABLE `residentials` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `beds` int(11) NOT NULL,
  `baths` int(11) NOT NULL,
  `area` varchar(50) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'RWF',
  `image_url` varchar(500) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `status` enum('available','sold','pending') DEFAULT 'available',
  `amenities` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `residentials`
--

INSERT INTO `residentials` (`id`, `title`, `description`, `location`, `beds`, `baths`, `area`, `price`, `currency`, `image_url`, `featured`, `status`, `amenities`, `created_at`, `updated_at`) VALUES
(1, 'Modern Family Home', 'Beautiful modern family home with spacious living areas and modern kitchen appliances', 'Kigali, Kacyiru', 4, 3, '250 sqm', 45000000.00, 'RWF', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 1, 'available', '[\"Garden\", \"Garage\", \"Modern Kitchen\", \"Air Conditioning\"]', '2026-03-01 11:10:49', '2026-03-01 11:10:49'),
(2, 'Luxury Villa', 'Stunning villa with panoramic city views and premium finishes throughout', 'Kigali, Nyarutarama', 6, 5, '450 sqm', 120000000.00, 'RWF', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 1, 'available', '[\"Swimming Pool\", \"Garden\", \"Home Theater\", \"Wine Cellar\", \"Smart Home\"]', '2026-03-01 11:10:49', '2026-03-01 11:10:49'),
(3, 'Cozy Apartment', 'Perfect starter apartment in quiet residential complex with great amenities', 'Kigali, Kimihurura', 2, 1, '120 sqm', 35000000.00, 'RWF', 'https://images.unsplash.com/photo-1600047509807-bfb8c5e9cb8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'available', '[\"Balcony\", \"Parking\", \"Security\", \"Gym Access\"]', '2026-03-01 11:10:49', '2026-03-01 11:10:49'),
(4, 'Executive Home', 'Executive family home in prestigious neighborhood with excellent schools nearby', 'Kigali, Kiyovu', 5, 4, '350 sqm', 75000000.00, 'RWF', 'https://images.unsplash.com/photo-1600597156733-88e9b41da852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'pending', '[\"Home Office\", \"Garden\", \"Double Garage\", \"Modern Kitchen\"]', '2026-03-01 11:10:49', '2026-03-01 11:10:49'),
(5, 'Townhouse Complex', 'Modern townhouse with private garden and community facilities', 'Kigali, Remera', 3, 2, '180 sqm', 55000000.00, 'RWF', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 1, 'available', '[\"Private Garden\", \"Parking\", \"Community Pool\", \"Security\"]', '2026-03-01 11:10:49', '2026-03-01 11:10:49'),
(6, 'Penthouse Suite', 'Luxury penthouse with stunning views and high-end finishes', 'Kigali, City Center', 3, 2, '200 sqm', 95000000.00, 'RWF', 'https://images.unsplash.com/photo-1600607217924-79b2d4e4c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'available', '[\"Rooftop Terrace\", \"City Views\", \"Modern Kitchen\", \"Wine Storage\"]', '2026-03-01 11:10:49', '2026-03-01 11:10:49');

-- --------------------------------------------------------

--
-- Table structure for table `topographic_surveying`
--

CREATE TABLE `topographic_surveying` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `project_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `survey_type` enum('Urban Planning','Agricultural','Infrastructure','Environmental','Construction') NOT NULL,
  `area` varchar(50) NOT NULL,
  `elevation_range` varchar(50) DEFAULT NULL,
  `status` enum('Planning','In Progress','Completed','On Hold') DEFAULT 'Planning',
  `description` text DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `completion_date` date DEFAULT NULL,
  `survey_purpose` enum('Contour Mapping','Digital Terrain Modeling','Hydrographic Survey','Vegetation Mapping') NOT NULL,
  `map_scale` varchar(20) DEFAULT NULL,
  `contour_interval` decimal(5,2) DEFAULT NULL,
  `accuracy_standard` varchar(50) DEFAULT NULL,
  `survey_methods` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`survey_methods`)),
  `survey_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`survey_features`)),
  `deliverables` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`deliverables`)),
  `terrain_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`terrain_features`)),
  `water_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`water_features`)),
  `vegetation_cover` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`vegetation_cover`)),
  `survey_cost` decimal(12,2) DEFAULT NULL,
  `team_size` int(11) DEFAULT 1,
  `equipment_used` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`equipment_used`)),
  `map_files` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`map_files`)),
  `image_url` text DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `priority` enum('Low','Medium','High','Urgent') DEFAULT 'Medium',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topographic_surveying`
--

INSERT INTO `topographic_surveying` (`id`, `project_name`, `location`, `survey_type`, `area`, `elevation_range`, `status`, `description`, `client_name`, `start_date`, `completion_date`, `survey_purpose`, `map_scale`, `contour_interval`, `accuracy_standard`, `survey_methods`, `survey_features`, `deliverables`, `terrain_features`, `water_features`, `vegetation_cover`, `survey_cost`, `team_size`, `equipment_used`, `map_files`, `image_url`, `featured`, `priority`, `created_at`, `updated_at`) VALUES
(1, 'Urban Development Survey - Kigali Heights', 'Kigali, Rwanda', 'Urban Planning', '2.5 km²', '1500-1800m', 'Completed', 'Comprehensive topographic survey for urban development project', 'Kigali City Development Authority', '2024-01-15', '2024-02-28', 'Contour Mapping', '1:500', 1.00, '±5cm', '[\"GPS/GNSS Surveying\", \"Total Station\", \"Drone Mapping\", \"GIS Software\"]', '[\"Elevation Survey\", \"Contour Lines\", \"Spot Heights\", \"Cross Sections\"]', '[\"Topographic Map\", \"Digital Model\", \"Contour Plan\", \"Volume Calculations\"]', '[\"Hills\", \"Valleys\", \"Plateaus\", \"Slopes\"]', '[\"Seasonal Streams\", \"Drainage Channels\", \"Runoff Patterns\"]', '[\"Urban Vegetation\", \"Parks\", \"Gardens\", \"Tree Cover\"]', 3500000.00, 12, '[\"GPS Receivers\", \"Total Station\", \"Drone\", \"Laptop\", \"GIS Software\"]', '[\"topo_map_kigali_heights.pdf\", \"digital_model.dwg\", \"contour_plan.dxf\", \"volume_calculations.xlsx\"]', 'https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 1, 'High', '2026-03-01 15:05:19', '2026-03-01 15:05:19'),
(2, 'Agricultural Land Survey - Eastern Province', 'Nyagatare, Rwanda', 'Agricultural', '10 km²', '1400-1600m', 'Completed', 'Large-scale agricultural land topographic mapping', 'Eastern Province Agricultural Office', '2024-02-01', '2024-03-15', 'Digital Terrain Modeling', '1:1000', 2.00, '±10cm', '[\"GPS/GNSS Surveying\", \"Total Station\", \"Drone Mapping\"]', '[\"3D Modeling\", \"Surface Analysis\", \"Volume Calculation\", \"Visualization\"]', '[\"Digital Elevation Model\", \"Slope Map\", \"Aspect Map\", \"Watershed Delineation\"]', '[\"Rolling Hills\", \"Flat Areas\", \"Gentle Slopes\", \"River Valleys\"]', '[\"Rivers\", \"Seasonal Streams\", \"Wetlands\", \"Drainage Basins\"]', '[\"Croplands\", \"Grasslands\", \"Forest Patches\", \"Fallow Land\"]', 5800000.00, 15, '[\"GPS Receivers\", \"Total Station\", \"Drone\", \"Data Processing Equipment\"]', '[\"dem_model.tif\", \"slope_map.pdf\", \"watershed_map.dxf\", \"agricultural_suitability.pdf\"]', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'Medium', '2026-03-01 15:05:19', '2026-03-01 15:05:19'),
(3, 'Infrastructure Development - Northern Province', 'Musanze, Rwanda', 'Infrastructure', '5 km²', '1800-2200m', 'In Progress', 'Topographic survey for road and infrastructure development', 'Rwanda Transport Development Agency', '2024-03-01', NULL, 'Hydrographic Survey', '1:2000', 2.50, '±15cm', '[\"GPS/GNSS Surveying\", \"Total Station\", \"Hydrographic Equipment\"]', '[\"Water Body Mapping\", \"Drainage Analysis\", \"Flood Assessment\", \"Water Flow Studies\"]', '[\"Hydrographic Map\", \"Drainage Plan\", \"Flood Risk Assessment\", \"Culvert Design\"]', '[\"Mountainous Terrain\", \"Steep Slopes\", \"Valleys\", \"Ridge Lines\"]', '[\"Rivers\", \"Streams\", \"Watersheds\", \"Floodplains\"]', '[\"Forest Cover\", \"Alpine Vegetation\", \"Grasslands\"]', 4200000.00, 10, '[\"GPS Receivers\", \"Total Station\", \"Echo Sounder\", \"Current Meter\"]', '[\"hydro_map.pdf\", \"drainage_analysis.dxf\", \"flood_assessment.pdf\"]', 'https://images.unsplash.com/photo-1508520173962-293b6a5b0326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 0, 'High', '2026-03-01 15:05:19', '2026-03-01 15:05:19');

-- --------------------------------------------------------

--
-- Table structure for table `villas`
--

CREATE TABLE `villas` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `bathrooms` int(11) NOT NULL,
  `area` varchar(100) NOT NULL,
  `land_area` varchar(100) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `currency` varchar(3) DEFAULT 'RWF',
  `image_url` text DEFAULT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `status` enum('available','sold','pending') DEFAULT 'available',
  `amenities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`amenities`)),
  `luxury_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`luxury_features`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apartments`
--
ALTER TABLE `apartments`
  ADD KEY `idx_apartments_location` (`location`),
  ADD KEY `idx_apartments_status` (`status`),
  ADD KEY `idx_apartments_featured` (`featured`),
  ADD KEY `idx_apartments_bedrooms` (`bedrooms`),
  ADD KEY `idx_apartments_floor` (`floor_number`);

--
-- Indexes for table `cadastral_surveying`
--
ALTER TABLE `cadastral_surveying`
  ADD KEY `idx_cadastral_location` (`location`),
  ADD KEY `idx_cadastral_status` (`status`),
  ADD KEY `idx_cadastral_property_type` (`property_type`),
  ADD KEY `idx_cadastral_survey_type` (`survey_type`),
  ADD KEY `idx_cadastral_parcel_number` (`parcel_number`);

--
-- Indexes for table `commercial`
--
ALTER TABLE `commercial`
  ADD KEY `idx_commercial_location` (`location`),
  ADD KEY `idx_commercial_status` (`status`),
  ADD KEY `idx_commercial_featured` (`featured`),
  ADD KEY `idx_commercial_type` (`property_type`);

--
-- Indexes for table `construction_surveying`
--
ALTER TABLE `construction_surveying`
  ADD KEY `idx_construction_location` (`location`),
  ADD KEY `idx_construction_status` (`status`),
  ADD KEY `idx_construction_type` (`construction_type`),
  ADD KEY `idx_construction_survey_type` (`survey_type`),
  ADD KEY `idx_construction_phase` (`survey_phase`);

--
-- Indexes for table `mining_surveying`
--
ALTER TABLE `mining_surveying`
  ADD KEY `idx_mining_location` (`location`),
  ADD KEY `idx_mining_status` (`status`),
  ADD KEY `idx_mining_mineral_type` (`mineral_type`),
  ADD KEY `idx_mining_survey_type` (`survey_type`);

--
-- Indexes for table `plots`
--
ALTER TABLE `plots`
  ADD KEY `idx_plots_location` (`location`),
  ADD KEY `idx_plots_status` (`status`);

--
-- Indexes for table `residentials`
--
ALTER TABLE `residentials`
  ADD KEY `idx_residentials_location` (`location`),
  ADD KEY `idx_residentials_status` (`status`);

--
-- Indexes for table `topographic_surveying`
--
ALTER TABLE `topographic_surveying`
  ADD KEY `idx_topographic_location` (`location`),
  ADD KEY `idx_topographic_status` (`status`),
  ADD KEY `idx_topographic_survey_type` (`survey_type`),
  ADD KEY `idx_topographic_purpose` (`survey_purpose`);

--
-- Indexes for table `villas`
--
ALTER TABLE `villas`
  ADD KEY `idx_villas_location` (`location`),
  ADD KEY `idx_villas_status` (`status`),
  ADD KEY `idx_villas_featured` (`featured`),
  ADD KEY `idx_villas_bedrooms` (`bedrooms`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apartments`
--
ALTER TABLE `apartments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cadastral_surveying`
--
ALTER TABLE `cadastral_surveying`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `commercial`
--
ALTER TABLE `commercial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `construction_surveying`
--
ALTER TABLE `construction_surveying`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `mining_surveying`
--
ALTER TABLE `mining_surveying`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plots`
--
ALTER TABLE `plots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `residentials`
--
ALTER TABLE `residentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `topographic_surveying`
--
ALTER TABLE `topographic_surveying`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `villas`
--
ALTER TABLE `villas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
