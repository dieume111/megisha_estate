# 🏗️ Megisha Estate Database Setup Guide

## 📋 Overview
This guide will help you set up all the database tables and API routes for the Megisha Estate admin system.

## 🗄️ Database Tables Created

### 1. **Villas Table**
- **Purpose**: Store luxury villa properties
- **Key Features**: Bedrooms, bathrooms, area, land area, luxury features
- **Status Options**: available, sold, pending

### 2. **Commercial Table** 
- **Purpose**: Store commercial properties (office, retail, warehouse, industrial, mixed)
- **Key Features**: Property type, floors, parking spaces
- **Status Options**: available, sold, leased, pending

### 3. **Apartments Table**
- **Purpose**: Store apartment complexes and units
- **Key Features**: Floor number, total floors, building features
- **Status Options**: available, sold, rented, pending

## 🚀 Quick Setup Steps

### Step 1: Execute Database SQL
```sql
-- Run this in your XAMPP MariaDB:
-- File: database/all_property_tables.sql
```

**In XAMPP:**
1. Open phpMyAdmin
2. Select `megishadata` database
3. Go to "SQL" tab
4. Copy and paste the contents of `database/all_property_tables.sql`
5. Click "Go"

### Step 2: Verify API Routes
All API routes are automatically created and connected:

```
/api/villas     -> Villas CRUD operations
/api/commercial  -> Commercial CRUD operations  
/api/apartments  -> Apartments CRUD operations
/api/plots       -> Plots CRUD operations
/api/residentials -> Residentials CRUD operations
```

### Step 3: Test Admin Pages
Navigate to these URLs to test:

```
/admin          -> Main Dashboard
/admin/villas    -> Villas Management
/admin/commercial -> Commercial Management
/admin/apartments -> Apartments Management
/admin/plots     -> Plots Management
/admin/residentials -> Residentials Management
```

## 📊 Database Schema Details

### Villas Table Structure
```sql
CREATE TABLE villas (
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
```

### Commercial Table Structure
```sql
CREATE TABLE commercial (
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
```

### Apartments Table Structure
```sql
CREATE TABLE apartments (
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
```

## 🔌 API Endpoints

### Villas API
- `GET /api/villas` - Get all villas
- `POST /api/villas` - Create new villa
- `PUT /api/villas/{id}` - Update villa
- `DELETE /api/villas/{id}` - Delete villa

### Commercial API
- `GET /api/commercial` - Get all commercial properties
- `POST /api/commercial` - Create new commercial property
- `PUT /api/commercial/{id}` - Update commercial property
- `DELETE /api/commercial/{id}` - Delete commercial property

### Apartments API
- `GET /api/apartments` - Get all apartments
- `POST /api/apartments` - Create new apartment
- `PUT /api/apartments/{id}` - Update apartment
- `DELETE /api/apartments/{id}` - Delete apartment

## 🎯 Sample Data Included

Each table comes with sample data for testing:

### Villas Sample Data
- Luxury Villa with Pool (Nyarutarama) - 120M RWF
- Modern Executive Villa (Kacyiru) - 95M RWF

### Commercial Sample Data  
- Modern Office Complex (City Center) - 85M RWF
- Retail Space in Shopping Mall (Kiyovu) - 45M RWF
- Industrial Warehouse (Nyabugogo) - 120M RWF

### Apartments Sample Data
- Modern 2BR Apartment (Kimihurura) - 35M RWF
- Luxury Penthouse (City Center) - 95M RWF
- Cozy Studio Apartment (Nyamirambo) - 18M RWF

## 🔍 Database Indexes

Performance indexes are automatically created:
- Location indexes for fast location-based searches
- Status indexes for filtering by availability
- Featured indexes for quick featured property queries
- Property-specific indexes (bedrooms, floors, etc.)

## ✅ Verification Checklist

After setup, verify:

- [ ] All 3 tables created successfully
- [ ] Sample data inserted correctly
- [ ] Admin dashboard shows real property counts
- [ ] CRUD operations work on all property types
- [ ] Navigation between admin pages works
- [ ] Search and filter functions work
- [ ] Image URLs display correctly

## 🚨 Troubleshooting

### Common Issues:

1. **API Not Connecting**
   - Check XAMPP is running
   - Verify database name is `megishadata`
   - Check database credentials in `lib/db.js`

2. **Tables Not Found**
   - Ensure SQL was executed in correct database
   - Check for any SQL syntax errors
   - Verify user has CREATE TABLE permissions

3. **Admin Pages Not Loading**
   - Check Next.js development server is running
   - Verify API routes exist in correct folders
   - Check browser console for errors

## 🎉 Success Indicators

You'll know everything is working when:

- Dashboard shows real property counts from database
- All admin pages load without errors
- CRUD operations create/update/delete database records
- Search and filter functions work with real data
- Navigation between pages is smooth

---

**🎯 Ready to Go!** Your Megisha Estate admin system is now fully connected to the database with all property types supported!
