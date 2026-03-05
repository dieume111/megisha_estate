import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET all apartments
export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM apartments ORDER BY created_at DESC'
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch apartments' },
      { status: 500 }
    );
  }
}

// POST new apartment
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
      floor_number,
      total_floors,
      price,
      currency = 'RWF',
      image_url = '',
      featured = false,
      status = 'available',
      amenities = [],
      building_features = []
    } = body;

    if (!title || !location || !bedrooms || !bathrooms || !area || !floor_number || !total_floors || !price) {
      return NextResponse.json(
        { error: 'Title, location, bedrooms, bathrooms, area, floor_number, total_floors, and price are required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO apartments (
        title, description, location, bedrooms, bathrooms, area, floor_number, 
        total_floors, price, currency, image_url, featured, status, amenities, building_features
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || '',
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
        JSON.stringify(amenities || []),
        JSON.stringify(building_features || [])
      ]
    );

    return NextResponse.json(
      { 
        message: 'Apartment created successfully',
        id: (result as any).insertId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating apartment:', error);
    return NextResponse.json(
      { error: 'Failed to create apartment' },
      { status: 500 }
    );
  }
}

// PUT update apartment
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Apartment ID is required' },
        { status: 400 }
      );
    }

    // Build dynamic update query
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    Object.keys(updateData).forEach(key => {
      if (key === 'amenities' || key === 'building_features') {
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
      `UPDATE apartments SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    return NextResponse.json(
      { 
        message: 'Apartment updated successfully',
        affectedRows: (result as any).affectedRows 
      }
    );
  } catch (error) {
    console.error('Error updating apartment:', error);
    return NextResponse.json(
      { error: 'Failed to update apartment' },
      { status: 500 }
    );
  }
}

// DELETE apartment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Apartment ID is required' },
        { status: 400 }
      );
    }

    const result = await query(
      'DELETE FROM apartments WHERE id = ?',
      [id]
    );

    return NextResponse.json(
      { 
        message: 'Apartment deleted successfully',
        affectedRows: (result as any).affectedRows 
      }
    );
  } catch (error) {
    console.error('Error deleting apartment:', error);
    return NextResponse.json(
      { error: 'Failed to delete apartment' },
      { status: 500 }
    );
  }
}
