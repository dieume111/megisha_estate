import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Fetch all residentials from database
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
    console.error('Error fetching residentials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch residentials' },
      { status: 500 }
    );
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
