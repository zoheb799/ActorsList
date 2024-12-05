import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';
import Actor from '../model';

dbConnect();

interface RouteParams {
  params: {
    actorId: string;
  };
}

export async function GET(req: NextRequest, context: RouteParams) {
  const { actorId } = context.params;

  try {
    const actor = await Actor.findById(actorId);
    if (!actor) {
      return NextResponse.json({ message: 'Actor not found' }, { status: 404 });
    }
    return NextResponse.json(actor, { status: 200 });
  } catch (error) {
    console.error('Error fetching actor:', error);
    return NextResponse.json({ message: 'Error fetching actor' }, { status: 500 });
  }
}
