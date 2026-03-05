import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Fetch all plots from database
    const plots = await query(`
      SELECT id, title, description, size, price, currency, use_type, 
             location, image_url, featured, status, created_at, updated_at
      FROM plots 
      ORDER BY featured DESC, created_at DESC
    `);

    return NextResponse.json(plots);
  } catch (error) {
    console.error('Error fetching plots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plots' },
      { status: 500 }
    );
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
