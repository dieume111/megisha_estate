-- ============================================
-- PLOTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS plots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    size VARCHAR(100) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'RWF',
    use_type ENUM('commercial', 'residential', 'industrial', 'agricultural') DEFAULT 'residential',
    location VARCHAR(255) NOT NULL,
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('available', 'sold', 'pending') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample plot properties
INSERT INTO plots (
    title, 
    description, 
    size, 
    price, 
    currency, 
    use_type,
    location, 
    image_url, 
    featured, 
    status
) VALUES 
(
    'Prime Commercial Land',
    'Excellent commercial land in high-traffic area perfect for business development',
    '500 sqm',
    25000000.00,
    'RWF',
    'commercial',
    'Kigali, City Center',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    TRUE,
    'available'
),
(
    'Residential Plot with Views',
    'Beautiful residential plot with stunning city views in upscale neighborhood',
    '300 sqm',
    18000000.00,
    'RWF',
    'residential',
    'Kigali, Nyarutarama',
    'https://images.unsplash.com/photo-1600585154340-e6296ab3f027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    FALSE,
    'available'
),
(
    'Industrial Development Land',
    'Large industrial plot perfect for manufacturing or warehouse development',
    '1000 sqm',
    35000000.00,
    'RWF',
    'industrial',
    'Kigali, Kicukiro',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    TRUE,
    'available'
),
(
    'Agricultural Land',
    'Fertile agricultural land perfect for farming or agricultural development',
    '2000 sqm',
    12000000.00,
    'RWF',
    'agricultural',
    'Kigali, Gasabo',
    'https://images.unsplash.com/photo-1590417829951-4a1ba2535b9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    FALSE,
    'sold'
),
(
    'Mixed-Use Development Plot',
    'Versatile plot suitable for both residential and commercial development',
    '400 sqm',
    22000000.00,
    'RWF',
    'commercial',
    'Kigali, Remera',
    'https://images.unsplash.com/photo-1600607687942-7a7c3c8c8b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    FALSE,
    'pending'
);

-- Create indexes for plots table
CREATE INDEX idx_plots_location ON plots(location);
CREATE INDEX idx_plots_status ON plots(status);
CREATE INDEX idx_plots_featured ON plots(featured);
CREATE INDEX idx_plots_use_type ON plots(use_type);
CREATE INDEX idx_plots_size ON plots(size);

SELECT 'Plots table created successfully!' AS message;
