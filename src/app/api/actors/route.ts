import { NextRequest, NextResponse } from 'next/server';
import Actor from './model';
import dbConnect from '@/app/utils/dbConnect';

dbConnect();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  try {
    let actors;
    if (name) {
      // Fetch actors matching the name
      actors = await Actor.find({ name: { $regex: name, $options: 'i' } });
    } else {
      // Fetch default actors (e.g., top 10 actors)
      actors = await Actor.find().limit(10);
    }
    return NextResponse.json(actors, { status: 200 });
  } catch (error) {
    console.error('Error fetching actors:', error);
    return NextResponse.json({ message: 'Error fetching actors' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, pictureUrl, age, bio } = body;

    const newActor = new Actor({ name, pictureUrl, age, bio });
    await newActor.save();

    return NextResponse.json(newActor, { status: 201 });
  } catch (error) {
    console.error('Error adding actor:', error);
    return NextResponse.json({ message: 'Error adding actor' }, { status: 500 });
  }
}
