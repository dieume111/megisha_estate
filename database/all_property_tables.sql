-- ============================================
-- MEGISHA ESTATE - ALL PROPERTY TABLES
-- ============================================

-- 1. VILLAS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS villas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    area VARCHAR(100) NOT NULL,
    land_area VARCHAR(100) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'RWF',
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('available', 'sold', 'pending') DEFAULT 'available',
    amenities JSON,
    luxury_features JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample villa properties
INSERT INTO villas (
    title, 
    description, 
    location, 
    bedrooms, 
    bathrooms, 
    area, 
    land_area, 
    price, 
    currency, 
    image_url, 
    featured, 
    status, 
    amenities, 
    luxury_features
) VALUES 
(
    'Luxury Villa with Pool',
    'Stunning luxury villa with panoramic views and premium finishes',
    'Kigali, Nyarutarama',
    6,
    5,
    '450 sqm',
    '1200 sqm',
    120000000.00,
    'RWF',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    TRUE,
    'available',
    JSON_ARRAY('Swimming Pool', 'Garden', 'Garage', 'Security', 'Gym', 'Modern Kitchen'),
    JSON_ARRAY('Home Theater', 'Wine Cellar', 'Smart Home', 'Rooftop Terrace', 'Spa Bathroom')
),
(
    'Modern Executive Villa',
    'Contemporary executive villa with state-of-the-art facilities',
    'Kigali, Kacyiru',
    5,
    4,
    '380 sqm',
    '800 sqm',
    95000000.00,
    'RWF',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    FALSE,
    'available',
    JSON_ARRAY('Garden', 'Double Garage', 'Security', 'Modern Kitchen', 'Balcony'),
    JSON_ARRAY('Home Office', 'Spa Bathroom', 'Outdoor Kitchen', 'Entertainment Room')
);

-- Create indexes for villas table
CREATE INDEX idx_villas_location ON villas(location);
CREATE INDEX idx_villas_status ON villas(status);
CREATE INDEX idx_villas_featured ON villas(featured);
CREATE INDEX idx_villas_bedrooms ON villas(bedrooms);

-- ============================================
-- 2. COMMERCIAL TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS commercial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    area VARCHAR(100) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'RWF',
    property_type ENUM('office', 'retail', 'warehouse', 'industrial', 'mixed') DEFAULT 'office',
    floors INT DEFAULT 1,
    parking_spaces INT DEFAULT 0,
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('available', 'sold', 'leased', 'pending') DEFAULT 'available',
    amenities JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample commercial properties
INSERT INTO commercial (
    title, 
    description, 
    location, 
    area, 
    price, 
    currency, 
    property_type, 
    floors, 
    parking_spaces, 
    image_url, 
    featured, 
    status, 
    amenities
) VALUES 
(
    'Modern Office Complex',
    'Prime office space in city center with modern amenities and excellent connectivity',
    'Kigali, City Center',
    '500 sqm',
    85000000.00,
    'RWF',
    'office',
    3,
    20,
    'https://images.unsplash.com/photo-1497366216546-3f970773e440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    TRUE,
    'available',
    JSON_ARRAY('Elevator', 'Parking', 'Security', 'Conference Rooms', 'Kitchen', 'High-speed Internet', 'Backup Power')
),
(
    'Retail Space in Shopping Mall',
    'High-traffic retail location with excellent visibility and foot traffic',
    'Kigali, Kiyovu',
    '200 sqm',
    45000000.00,
    'RWF',
    'retail',
    1,
    10,
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    FALSE,
    'available',
    JSON_ARRAY('Display Windows', 'Storage', 'Security', 'Parking', 'Air Conditioning', 'Lighting')
),
(
    'Industrial Warehouse',
    'Large warehouse space ideal for storage and distribution operations',
    'Kigali, Nyabugogo',
    '1000 sqm',
    120000000.00,
    'RWF',
    'warehouse',
    1,
    50,
    'https://images.unsplash.com/photo-1581094794329-cbf11b6246c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    FALSE,
    'available',
    JSON_ARRAY('Loading Dock', 'High Ceiling', 'Security', 'Parking', 'Office Space', 'Restrooms')
);

-- Create indexes for commercial table
CREATE INDEX idx_commercial_location ON commercial(location);
CREATE INDEX idx_commercial_status ON commercial(status);
CREATE INDEX idx_commercial_featured ON commercial(featured);
CREATE INDEX idx_commercial_type ON commercial(property_type);

-- ============================================
-- 3. APARTMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS apartments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    area VARCHAR(100) NOT NULL,
    floor_number INT NOT NULL,
    total_floors INT NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'RWF',
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('available', 'sold', 'rented', 'pending') DEFAULT 'available',
    amenities JSON,
    building_features JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample apartment properties
INSERT INTO apartments (
    title, 
    description, 
    location, 
    bedrooms, 
    bathrooms, 
    area, 
    floor_number, 
    total_floors, 
    price, 
    currency, 
    image_url, 
    featured, 
    status, 
    amenities, 
    building_features
) VALUES 
(
    'Modern 2BR Apartment',
    'Contemporary apartment with city views and modern amenities',
    'Kigali, Kimihurura',
    2,
    1,
    '120 sqm',
    5,
    12,
    35000000.00,
    'RWF',
    'https://images.unsplash.com/photo-1600047509807-bfb8c5e9cb8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    TRUE,
    'available',
    JSON_ARRAY('Balcony', 'Parking', 'Security', 'Gym Access', 'Storage', 'Modern Kitchen'),
    JSON_ARRAY('Elevator', '24/7 Security', 'Backup Power', 'Rooftop Garden', 'Concierge Service')
),
(
    'Luxury Penthouse',
    'Exclusive penthouse with panoramic city views and premium finishes',
    'Kigali, City Center',
    3,
    2,
    '200 sqm',
    12,
    12,
    95000000.00,
    'RWF',
    'https://images.unsplash.com/photo-1600607217924-79b2d4e4c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    FALSE,
    'available',
    JSON_ARRAY('Rooftop Terrace', 'City Views', 'Modern Kitchen', 'Wine Storage', 'Private Elevator'),
    JSON_ARRAY('Concierge Service', 'Smart Home', 'Private Elevator', 'Sky Lounge', 'Butler Service')
),
(
    'Cozy Studio Apartment',
    'Perfect starter apartment in quiet neighborhood with great amenities',
    'Kigali, Nyamirambo',
    1,
    1,
    '60 sqm',
    3,
    8,
    18000000.00,
    'RWF',
    'https://images.unsplash.com/photo-1613478607407-4a7d1f077b1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    FALSE,
    'rented',
    JSON_ARRAY('Balcony', 'Security', 'Modern Kitchen', 'Built-in Wardrobes'),
    JSON_ARRAY('Elevator', 'Security', 'Parking', 'Laundry Room', 'Community Garden')
);

-- Create indexes for apartments table
CREATE INDEX idx_apartments_location ON apartments(location);
CREATE INDEX idx_apartments_status ON apartments(status);
CREATE INDEX idx_apartments_featured ON apartments(featured);
CREATE INDEX idx_apartments_bedrooms ON apartments(bedrooms);
CREATE INDEX idx_apartments_floor ON apartments(floor_number);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT 'All property tables created successfully!' AS message;
