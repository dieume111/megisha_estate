import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Mock data fallback
const mockResidentials = [
  {
    id: 1,
    title: "Modern Family Home",
    description: "Beautiful family home in quiet neighborhood with great amenities and schools nearby",
    location: "Kigali, Kacyiru",
    beds: 4,
    baths: 3,
    area: "250 sqm",
    price: 45000000,
    currency: "RWF",
    image_url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true,
    status: "available",
    amenities: ["Garden", "Garage", "Security", "Modern Kitchen", "Balcony", "Storage"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Cozy Starter Home",
    description: "Perfect starter home for young families in up-and-coming neighborhood",
    location: "Kigali, Remera",
    beds: 3,
    baths: 2,
    area: "180 sqm",
    price: 28000000,
    currency: "RWF",
    image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false,
    status: "available",
    amenities: ["Parking", "Security", "Modern Kitchen", "Garden"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Luxury Residence",
    description: "High-end residential property with premium finishes and excellent location",
    location: "Kigali, Nyarutarama",
    beds: 5,
    baths: 4,
    area: "320 sqm",
    price: 85000000,
    currency: "RWF",
    image_url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true,
    status: "available",
    amenities: ["Swimming Pool", "Garden", "Double Garage", "Security", "Gym", "Home Theater", "Smart Home"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    title: "Affordable Apartment",
    description: "Budget-friendly apartment in convenient location with good access to transport",
    location: "Kigali, Nyabugogo",
    beds: 2,
    baths: 1,
    area: "90 sqm",
    price: 15000000,
    currency: "RWF",
    image_url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false,
    status: "sold",
    amenities: ["Parking", "Security", "Modern Kitchen"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    title: "Executive Townhouse",
    description: "Modern townhouse perfect for executives and small families",
    location: "Kigali, Kimihurura",
    beds: 3,
    baths: 3,
    area: "200 sqm",
    price: 55000000,
    currency: "RWF",
    image_url: "https://images.unsplash.com/photo-1600047509807-bfb8c5e9cb8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false,
    status: "pending",
    amenities: ["Garage", "Security", "Modern Kitchen", "Rooftop Terrace", "Home Office"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    // Try to fetch from database first
    const residentials = await query(`
      SELECT id, title, description, location, beds, baths, area, price, currency, 
             image_url, featured, status, amenities, created_at, updated_at
      FROM residentials 
      ORDER BY featured DESC, created_at DESC
    `);

    // Parse amenities from JSON string
    const residentialsWithParsedAmenities = (residentials as any[]).map((residential: any) => ({
      ...residential,
      amenities: typeof residential.amenities === 'string' 
        ? JSON.parse(residential.amenities) 
        : residential.amenities
    }));

    return NextResponse.json(residentialsWithParsedAmenities);
  } catch (error) {
    console.warn('Database connection failed, using mock data for residentials:', error);
    
    // Fallback to mock data if database is not available
    return NextResponse.json(mockResidentials);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, description, location, beds, baths, area, price } = body;
    
    if (!title || !description || !location || !beds || !baths || !area || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert new residential
    const result = await query(`
      INSERT INTO residentials (title, description, location, beds, baths, area, price, currency, image_url, featured, status, amenities)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      description,
      location,
      beds,
      baths,
      area,
      price,
      body.currency || 'RWF',
      body.image_url || null,
      body.featured || false,
      body.status || 'available',
      body.amenities ? JSON.stringify(body.amenities) : null
    ]);

    return NextResponse.json({ 
      message: 'Residential created successfully',
      id: (result as any).insertId 
    });
  } catch (error) {
    console.error('Error creating residential:', error);
    return NextResponse.json(
      { error: 'Failed to create residential' },
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
        { error: 'Residential ID is required' },
        { status: 400 }
      );
    }

    // Update residential
    await query(`
      UPDATE residentials 
      SET title = ?, description = ?, location = ?, beds = ?, baths = ?, area = ?, 
          price = ?, currency = ?, image_url = ?, featured = ?, status = ?, amenities = ?
      WHERE id = ?
    `, [
      body.title,
      body.description,
      body.location,
      body.beds,
      body.baths,
      body.area,
      body.price,
      body.currency || 'RWF',
      body.image_url || null,
      body.featured || false,
      body.status || 'available',
      body.amenities ? JSON.stringify(body.amenities) : null,
      id
    ]);

    return NextResponse.json({ 
      message: 'Residential updated successfully'
    });
  } catch (error) {
    console.error('Error updating residential:', error);
    return NextResponse.json(
      { error: 'Failed to update residential' },
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
        { error: 'Valid residential ID is required' },
        { status: 400 }
      );
    }

    // Delete residential
    await query('DELETE FROM residentials WHERE id = ?', [Number(id)]);

    return NextResponse.json({ 
      message: 'Residential deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting residential:', error);
    return NextResponse.json(
      { error: 'Failed to delete residential' },
      { status: 500 }
    );
  }
}
