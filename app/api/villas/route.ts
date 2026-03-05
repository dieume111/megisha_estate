import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET all villas
export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM villas ORDER BY created_at DESC'
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching villas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch villas' },
      { status: 500 }
    );
  }
}

// POST new villa
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      title,
      description,
      location,
      bedrooms,
      bathrooms,
      area,
      land_area,
      price,
      currency = 'RWF',
      image_url = '',
      featured = false,
      status = 'available',
      amenities = [],
      luxury_features = []
    } = body;

    if (!title || !location || !bedrooms || !bathrooms || !area || !land_area || !price) {
      return NextResponse.json(
        { error: 'Title, location, bedrooms, bathrooms, area, land_area, and price are required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO villas (
        title, description, location, bedrooms, bathrooms, area, land_area, 
        price, currency, image_url, featured, status, amenities, luxury_features
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || '',
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
        JSON.stringify(amenities || []),
        JSON.stringify(luxury_features || [])
      ]
    );

    return NextResponse.json(
      { 
        message: 'Villa created successfully',
        id: (result as any).insertId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating villa:', error);
    return NextResponse.json(
      { error: 'Failed to create villa' },
      { status: 500 }
    );
  }
}

// PUT update villa
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Villa ID is required' },
        { status: 400 }
      );
    }

    // Build dynamic update query
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    Object.keys(updateData).forEach(key => {
      if (key === 'amenities' || key === 'luxury_features') {
        updateFields.push(`${key} = ?`);
        updateValues.push(JSON.stringify(updateData[key]));
      } else if (updateData[key] !== undefined) {
        updateFields.push(`${key} = ?`);
        updateValues.push(updateData[key]);
      }
    });

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    updateValues.push(id);

    const result = await query(
      `UPDATE villas SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    return NextResponse.json(
      { 
        message: 'Villa updated successfully',
        affectedRows: (result as any).affectedRows 
      }
    );
  } catch (error) {
    console.error('Error updating villa:', error);
    return NextResponse.json(
      { error: 'Failed to update villa' },
      { status: 500 }
    );
  }
}

// DELETE villa
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Villa ID is required' },
        { status: 400 }
      );
    }

    const result = await query(
      'DELETE FROM villas WHERE id = ?',
      [id]
    );

    return NextResponse.json(
      { 
        message: 'Villa deleted successfully',
        affectedRows: (result as any).affectedRows 
      }
    );
  } catch (error) {
    console.error('Error deleting villa:', error);
    return NextResponse.json(
      { error: 'Failed to delete villa' },
      { status: 500 }
    );
  }
}
