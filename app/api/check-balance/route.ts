import { NextRequest, NextResponse } from 'next/server';
import { getWalletBalance } from '@/lib/wallet';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }

    // ✅ Actual Firebase call
    const balance = await getWalletBalance(userId);

    return NextResponse.json({
      success: true,
      balance: balance,
      userId: userId
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}