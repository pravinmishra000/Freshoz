import { NextRequest, NextResponse } from 'next/server';
import { addToWallet } from '@/lib/wallet';

export async function POST(request: NextRequest) {
  try {
    const { amount, userId } = await request.json();

    if (!amount || !userId) {
      return NextResponse.json(
        { success: false, error: 'Amount and userId are required' },
        { status: 400 }
      );
    }

    await addToWallet(userId, amount);
    return NextResponse.json({
      success: true,
      message: `₹${amount} added to wallet successfully`
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}