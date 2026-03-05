# 🏗️ Megisha Estate Surveying Services Database Setup Guide

## 📋 Overview
This guide will help you set up all the surveying services database tables that match your existing surveying service pages.

## 🗄️ Surveying Services Tables Created

### 1. **Mining Surveying Table** (`mining_surveying`)
- **Purpose**: Store mining exploration and survey projects
- **Page Reference**: `surveying-services/mining-surveying/page.tsx`
- **Key Features**: Mineral types, survey areas, equipment used, findings
- **Status Options**: Planning, In Progress, Completed, On Hold

### 2. **Cadastral Surveying Table** (`cadastral_surveying`)
- **Purpose**: Store land registration and boundary survey projects
- **Page Reference**: `surveying-services/cadastral-surveying/page.tsx`
- **Key Features**: Property types, parcel numbers, legal documents, coordinates
- **Status Options**: Planning, In Progress, Completed, On Hold

### 3. **Topographic Surveying Table** (`topographic_surveying`)
- **Purpose**: Store terrain mapping and topographic survey projects
- **Page Reference**: `surveying-services/topographic-surveying/page.tsx`
- **Key Features**: Survey areas, elevation ranges, terrain features, water bodies
- **Status Options**: Planning, In Progress, Completed, On Hold

### 4. **Construction Surveying Table** (`construction_surveying`)
- **Purpose**: Store construction site survey and monitoring projects
- **Page Reference**: `surveying-services/construction-surveying/page.tsx`
- **Key Features**: Building details, construction phases, monitoring points, quality checks
- **Status Options**: Planning, In Progress, Completed, On Hold, Delayed

## 🚀 Quick Setup Steps

### Step 1: Execute Database SQL
```sql
-- Run this in your XAMPP MariaDB:
-- File: database/surveying_services_tables.sql
```

**In XAMPP:**
1. Open phpMyAdmin
2. Select `megishadata` database
3. Go to "SQL" tab
4. Copy and paste the contents of `database/surveying_services_tables.sql`
5. Click "Go"

### Step 2: Verify Table Creation
After execution, you should see these tables:
- `mining_surveying`
- `cadastral_surveying`
- `topographic_surveying`
- `construction_surveying`

## 📊 Detailed Table Schemas

### Mining Surveying Table Structure
```sql
CREATE TABLE mining_surveying (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    mineral_type VARCHAR(100) NOT NULL,
    status ENUM('Planning', 'In Progress', 'Completed', 'On Hold') DEFAULT 'Planning',
    description TEXT,
    client_name VARCHAR(255),
    start_date DATE,
    completion_date DATE,
    survey_type ENUM('Mineral Exploration', 'Mine Planning', 'Resource Assessment', 'Environmental Compliance'),
    survey_area DECIMAL(12, 2), -- in square kilometers
    estimated_value DECIMAL(15, 2), -- in USD
    team_size INT DEFAULT 1,
    equipment_used JSON,
    survey_features JSON,
    findings TEXT,
    recommendations TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    priority ENUM('Low', 'Medium', 'High', 'Urgent') DEFAULT 'Medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Cadastral Surveying Table Structure
```sql
CREATE TABLE cadastral_surveying (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    property_type ENUM('Residential', 'Commercial', 'Industrial', 'Agricultural', 'Mixed Use'),
    area VARCHAR(50) NOT NULL, -- e.g., "500 sqm", "5 hectares"
    status ENUM('Planning', 'In Progress', 'Completed', 'On Hold') DEFAULT 'Planning',
    description TEXT,
    client_name VARCHAR(255),
    parcel_number VARCHAR(100),
    title_number VARCHAR(100),
    survey_type ENUM('Land Registration', 'Property Boundary Survey', 'Land Title Processing', 'Property Valuation'),
    survey_date DATE,
    completion_date DATE,
    coordinates JSON, -- GPS coordinates of boundaries
    boundary_markers JSON,
    legal_documents JSON,
    survey_features JSON,
    property_value DECIMAL(12, 2),
    survey_cost DECIMAL(10, 2),
    surveyor_name VARCHAR(255),
    approval_status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    government_fees DECIMAL(10, 2),
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    priority ENUM('Low', 'Medium', 'High', 'Urgent') DEFAULT 'Medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Topographic Surveying Table Structure
```sql
CREATE TABLE topographic_surveying (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    survey_type ENUM('Urban Planning', 'Agricultural', 'Infrastructure', 'Environmental', 'Construction'),
    area VARCHAR(50) NOT NULL, -- e.g., "2.5 km²", "10 km²"
    elevation_range VARCHAR(50), -- e.g., "1500-1800m"
    status ENUM('Planning', 'In Progress', 'Completed', 'On Hold') DEFAULT 'Planning',
    description TEXT,
    client_name VARCHAR(255),
    start_date DATE,
    completion_date DATE,
    survey_purpose ENUM('Contour Mapping', 'Digital Terrain Modeling', 'Hydrographic Survey', 'Vegetation Mapping'),
    map_scale VARCHAR(20), -- e.g., "1:500", "1:1000"
    contour_interval DECIMAL(5, 2), -- in meters
    accuracy_standard VARCHAR(50), -- e.g., "±5cm", "±10cm"
    survey_methods JSON,
    survey_features JSON,
    deliverables JSON,
    terrain_features JSON,
    water_features JSON,
    vegetation_cover JSON,
    survey_cost DECIMAL(12, 2),
    team_size INT DEFAULT 1,
    equipment_used JSON,
    map_files JSON,
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    priority ENUM('Low', 'Medium', 'High', 'Urgent') DEFAULT 'Medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Construction Surveying Table Structure
```sql
CREATE TABLE construction_surveying (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    construction_type ENUM('Commercial', 'Residential', 'Industrial', 'Infrastructure', 'Institutional'),
    building_details VARCHAR(100), -- e.g., "25 Floors", "10 Buildings", "Single Level"
    area VARCHAR(50) NOT NULL, -- e.g., "15,000 m²", "8,000 m²"
    status ENUM('Planning', 'In Progress', 'Completed', 'On Hold', 'Delayed') DEFAULT 'Planning',
    description TEXT,
    client_name VARCHAR(255),
    contractor_name VARCHAR(255),
    architect_name VARCHAR(255),
    start_date DATE,
    completion_date DATE,
    survey_phase ENUM('Design Review', 'Site Preparation', 'Layout Marking', 'Quality Control', 'As-Built'),
    survey_type ENUM('Site Layout Survey', 'Construction Monitoring', 'As-Built Survey', 'Deformation Monitoring'),
    building_floors INT,
    foundation_type VARCHAR(50),
    structural_system VARCHAR(50),
    survey_features JSON,
    monitoring_points JSON,
    tolerance_standards JSON,
    quality_checks JSON,
    equipment_used JSON,
    survey_team JSON,
    safety_measures JSON,
    survey_cost DECIMAL(12, 2),
    project_value DECIMAL(15, 2),
    progress_percentage DECIMAL(5, 2) DEFAULT 0.00,
    deviations_found JSON,
    completion_certificate BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    priority ENUM('Low', 'Medium', 'High', 'Urgent') DEFAULT 'Medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🎯 Sample Data Included

Each table comes with realistic sample data based on the page content:

### Mining Surveying Sample Data
- **Tin Mining Project** (Musanze) - Completed - 2.5M USD value
- **Gold Exploration** (Kayonza) - In Progress - 1.8M USD value
- **Coltan Survey** (Rubavu) - Planning - 1.2M USD value

### Cadastral Surveying Sample Data
- **Residential Land Registration** (Kacyiru) - Completed - 25M RWF
- **Commercial Property Survey** (Nyarutarama) - Completed - 85M RWF
- **Agricultural Land Mapping** (Kayonza) - In Progress - 15M RWF

### Topographic Surveying Sample Data
- **Urban Development Survey** (Kigali) - Completed - 2.5 km²
- **Agricultural Land Survey** (Nyagatare) - Completed - 10 km²
- **Infrastructure Development** (Musanze) - In Progress - 5 km²

### Construction Surveying Sample Data
- **Commercial Complex** (Kigali) - Completed - 25 floors, 15,000 m²
- **Residential Development** (Nyarutarama) - In Progress - 10 buildings, 8,000 m²
- **Industrial Facility** (Masoro) - Planning - Single level, 20,000 m²

## 🔍 Database Indexes

Performance indexes are automatically created:
- **Location indexes** for fast location-based searches
- **Status indexes** for filtering by project status
- **Type indexes** for filtering by survey/construction types
- **Priority indexes** for urgent project identification

## 📊 JSON Field Explanations

### Equipment Used JSON
```json
["GPS Equipment", "Total Station", "Drone", "Survey Tools"]
```

### Survey Features JSON
```json
["Geological Mapping", "Sample Collection", "Laboratory Analysis"]
```

### Coordinates JSON (Cadastral)
```json
{
  "northeast": {"lat": -1.9536, "lng": 30.0605},
  "southwest": {"lat": -1.9546, "lng": 30.0595}
}
```

### Monitoring Points JSON (Construction)
```json
["MP-001", "MP-002", "MP-003", "MP-004"]
```

## ✅ Verification Checklist

After setup, verify:

- [ ] All 4 surveying tables created successfully
- [ ] Sample data inserted correctly
- [ ] JSON fields contain proper data
- [ ] Indexes created for performance
- [ ] Foreign key relationships (if applicable)
- [ ] Data types match page requirements

## 🚨 Troubleshooting

### Common Issues:

1. **JSON Field Errors**
   - Ensure MariaDB version supports JSON (10.2+)
   - Use `TEXT` field if JSON not supported

2. **ENUM Type Issues**
   - Check ENUM values match exactly
   - Ensure proper case sensitivity

3. **Date Format Issues**
   - Use YYYY-MM-DD format
   - Check for valid date ranges

4. **Decimal Precision**
   - Ensure proper decimal places for currency
   - Check for overflow in large numbers

## 🎉 Success Indicators

You'll know everything is working when:

- All 4 tables are created without errors
- Sample data displays correctly in database
- JSON fields contain structured data
- Indexes improve query performance
- Data matches the page content requirements

## 🔄 Next Steps

After successful table creation:

1. **Create API Routes** for each surveying service
2. **Build Admin Pages** for managing survey projects
3. **Connect Frontend Pages** to display real data
4. **Add Search/Filter** functionality
5. **Implement Reporting** features

---

**🎯 Ready to Go!** Your surveying services database is now fully structured and ready for integration with your existing pages!
