import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Mock data fallback
const mockPlots = [
  {
    id: 1,
    title: "Prime Commercial Land",
    description: "Excellent commercial land in high-traffic area perfect for business development",
    size: "500 sqm",
    price: 25000000,
    currency: "RWF",
    use_type: "commercial",
    location: "Kigali, City Center",
    image_url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true,
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Residential Plot with Views",
    description: "Beautiful residential plot with stunning city views in upscale neighborhood",
    size: "300 sqm",
    price: 18000000,
    currency: "RWF",
    use_type: "residential",
    location: "Kigali, Nyarutarama",
    image_url: "https://images.unsplash.com/photo-1600585154340-e6296ab3f027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false,
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Industrial Development Land",
    description: "Large industrial plot perfect for manufacturing or warehouse development",
    size: "1000 sqm",
    price: 35000000,
    currency: "RWF",
    use_type: "industrial",
    location: "Kigali, Kicukiro",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true,
    status: "available",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    title: "Agricultural Land",
    description: "Fertile agricultural land perfect for farming or agricultural development",
    size: "2000 sqm",
    price: 12000000,
    currency: "RWF",
    use_type: "agricultural",
    location: "Kigali, Gasabo",
    image_url: "https://images.unsplash.com/photo-1590417829951-4a1ba2535b9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false,
    status: "sold",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    title: "Mixed-Use Development Plot",
    description: "Versatile plot suitable for both residential and commercial development",
    size: "400 sqm",
    price: 22000000,
    currency: "RWF",
    use_type: "commercial",
    location: "Kigali, Remera",
    image_url: "https://images.unsplash.com/photo-1600607687942-7a7c3c8c8b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    featured: false,
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    // Try to fetch from database first
    const plots = await query(`
      SELECT id, title, description, size, price, currency, use_type, 
             location, image_url, featured, status, created_at, updated_at
      FROM plots 
      ORDER BY featured DESC, created_at DESC
    `);

    return NextResponse.json(plots);
  } catch (error) {
    console.warn('Database connection failed, using mock data for plots:', error);
    
    // Fallback to mock data if database is not available
    return NextResponse.json(mockPlots);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, description, size, price, use_type, location } = body;
    
    if (!title || !description || !size || !price || !use_type || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert new plot
    const result = await query(`
      INSERT INTO plots (title, description, size, price, currency, use_type, location, image_url, featured, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      description,
      size,
      price,
      body.currency || 'RWF',
      use_type,
      location,
      body.image_url || null,
      body.featured || false,
      body.status || 'available'
    ]);

    return NextResponse.json({ 
      message: 'Plot created successfully',
      id: (result as any).insertId 
    });
  } catch (error) {
    console.error('Error creating plot:', error);
    return NextResponse.json(
      { error: 'Failed to create plot' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Plot ID is required' },
        { status: 400 }
      );
    }

    // Update plot
    await query(`
      UPDATE plots 
      SET title = ?, description = ?, size = ?, price = ?, currency = ?, 
          use_type = ?, location = ?, image_url = ?, featured = ?, status = ?
      WHERE id = ?
    `, [
      body.title,
      body.description,
      body.size,
      body.price,
      body.currency || 'RWF',
      body.use_type,
      body.location,
      body.image_url || null,
      body.featured || false,
      body.status || 'available',
      id
    ]);

    return NextResponse.json({ 
      message: 'Plot updated successfully'
    });
  } catch (error) {
    console.error('Error updating plot:', error);
    return NextResponse.json(
      { error: 'Failed to update plot' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Valid plot ID is required' },
        { status: 400 }
      );
    }

    // Delete plot
    await query('DELETE FROM plots WHERE id = ?', [Number(id)]);

    return NextResponse.json({ 
      message: 'Plot deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting plot:', error);
    return NextResponse.json(
      { error: 'Failed to delete plot' },
      { status: 500 }
    );
  }
}
