import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET all commercial properties
export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM commercial ORDER BY created_at DESC'
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching commercial properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch commercial properties' },
      { status: 500 }
    );
  }
}

// POST new commercial property
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      title,
      description,
      location,
      area,
      price,
      currency = 'RWF',
      property_type = 'office',
      floors = 1,
      parking_spaces = 0,
      image_url = '',
      featured = false,
      status = 'available',
      amenities = []
    } = body;

    if (!title || !location || !area || !price) {
      return NextResponse.json(
        { error: 'Title, location, area, and price are required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO commercial (
        title, description, location, area, price, currency, 
        property_type, floors, parking_spaces, image_url, 
        featured, status, amenities
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || '',
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
        JSON.stringify(amenities || [])
      ]
    );

    return NextResponse.json(
      { 
        message: 'Commercial property created successfully',
        id: (result as any).insertId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating commercial property:', error);
    return NextResponse.json(
      { error: 'Failed to create commercial property' },
      { status: 500 }
    );
  }
}

// PUT update commercial property
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    // Build dynamic update query
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    Object.keys(updateData).forEach(key => {
      if (key === 'amenities') {
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
      `UPDATE commercial SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    return NextResponse.json(
      { 
        message: 'Commercial property updated successfully',
        affectedRows: (result as any).affectedRows 
      }
    );
  } catch (error) {
    console.error('Error updating commercial property:', error);
    return NextResponse.json(
      { error: 'Failed to update commercial property' },
      { status: 500 }
    );
  }
}

// DELETE commercial property
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    const result = await query(
      'DELETE FROM commercial WHERE id = ?',
      [id]
    );

    return NextResponse.json(
      { 
        message: 'Commercial property deleted successfully',
        affectedRows: (result as any).affectedRows 
      }
    );
  } catch (error) {
    console.error('Error deleting commercial property:', error);
    return NextResponse.json(
      { error: 'Failed to delete commercial property' },
      { status: 500 }
    );
  }
}
