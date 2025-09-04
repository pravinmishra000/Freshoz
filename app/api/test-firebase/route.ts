import { NextRequest, NextResponse } from 'next/server';
import { testFirebaseConnection } from '@/lib/wallet';

export async function POST(request: NextRequest) {
  try {
    const result = await testFirebaseConnection();
    return NextResponse.json({ success: true, message: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}