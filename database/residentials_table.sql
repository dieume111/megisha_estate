-- ============================================
-- RESIDENTIALS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS residentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    area VARCHAR(100) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'RWF',
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('available', 'sold', 'pending') DEFAULT 'available',
    amenities JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample residential properties
INSERT INTO residentials (
    title, 
    description, 
    location, 
    beds, 
    baths, 
    area, 
    price, 
    currency, 
    image_url, 
    featured, 
    status, 
    amenities
) VALUES 
(
    'Modern Family Home',
    'Beautiful family home in quiet neighborhood with great amenities and schools nearby',
    'Kigali, Kacyiru',
    4,
    3,
    '250 sqm',
    45000000.00,
    'RWF',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    TRUE,
    'available',
    JSON_ARRAY('Garden', 'Garage', 'Security', 'Modern Kitchen', 'Balcony', 'Storage')
),
(
    'Cozy Starter Home',
    'Perfect starter home for young families in up-and-coming neighborhood',
    'Kigali, Remera',
    3,
    2,
    '180 sqm',
    28000000.00,
    'RWF',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    FALSE,
    'available',
    JSON_ARRAY('Parking', 'Security', 'Modern Kitchen', 'Garden')
),
(
    'Luxury Residence',
    'High-end residential property with premium finishes and excellent location',
    'Kigali, Nyarutarama',
    5,
    4,
    '320 sqm',
    85000000.00,
    'RWF',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    TRUE,
    'available',
    JSON_ARRAY('Swimming Pool', 'Garden', 'Double Garage', 'Security', 'Gym', 'Home Theater', 'Smart Home')
),
(
    'Affordable Apartment',
    'Budget-friendly apartment in convenient location with good access to transport',
    'Kigali, Nyabugogo',
    2,
    1,
    '90 sqm',
    15000000.00,
    'RWF',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    FALSE,
    'sold',
    JSON_ARRAY('Parking', 'Security', 'Modern Kitchen')
),
(
    'Executive Townhouse',
    'Modern townhouse perfect for executives and small families',
    'Kigali, Kimihurura',
    3,
    3,
    '200 sqm',
    55000000.00,
    'RWF',
    'https://images.unsplash.com/photo-1600047509807-bfb8c5e9cb8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    FALSE,
    'pending',
    JSON_ARRAY('Garage', 'Security', 'Modern Kitchen', 'Rooftop Terrace', 'Home Office')
);

-- Create indexes for residentials table
CREATE INDEX idx_residentials_location ON residentials(location);
CREATE INDEX idx_residentials_status ON residentials(status);
CREATE INDEX idx_residentials_featured ON residentials(featured);
CREATE INDEX idx_residentials_beds ON residentials(beds);
CREATE INDEX idx_residentials_price ON residentials(price);

SELECT 'Residentials table created successfully!' AS message;
