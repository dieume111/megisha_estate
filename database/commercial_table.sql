-- Create commercial properties table for Megisha Estate
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
),
(
    'Mixed Use Building',
    'Versatile mixed-use property suitable for both retail and office space',
    'Kigali, Remera',
    '350 sqm',
    65000000.00,
    'RWF',
    'mixed',
    2,
    15,
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    FALSE,
    'available',
    JSON_ARRAY('Retail Space', 'Office Space', 'Parking', 'Security', 'Separate Entrances')
);

-- Create indexes for better performance
CREATE INDEX idx_commercial_location ON commercial(location);
CREATE INDEX idx_commercial_status ON commercial(status);
CREATE INDEX idx_commercial_featured ON commercial(featured);
CREATE INDEX idx_commercial_type ON commercial(property_type);
