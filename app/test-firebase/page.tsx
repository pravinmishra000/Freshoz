'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { testFirebaseConnection, testFirebaseRead } from '@/lib/wallet';

export default function TestFirebasePage() {
  const [result, setResult] = useState<string>('');
  const [readResult, setReadResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    try {
      const testResult = await testFirebaseConnection();
      setResult(testResult);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReadTest = async () => {
    setLoading(true);
    try {
      const testResult = await testFirebaseRead();
      setReadResult(testResult);
    } catch (error: any) {
      setReadResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Firebase Connection Test</h1>

        <Card className="mb-6">
          <CardContent className="p-6">
            <Button
              onClick={handleTest}
              disabled={loading}
              className="w-full mb-4"
            >
              Test Firebase Connection
            </Button>

            <Button
              onClick={handleReadTest}
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              Test Data Read
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="mb-4">
            <CardContent className="p-6">
              <h2 className="font-semibold mb-2">Write Test Result:</h2>
              <p className={`text-sm ${result.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                {result}
              </p>
            </CardContent>
          </Card>
        )}

        {readResult && (
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold mb-2">Read Test Result:</h2>
              <p className={`text-sm ${readResult.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                {readResult}
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-2">Next Steps:</h2>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>Firebase Console में जाकर Data check करें</li>
              <li>Realtime Database में "connectionTest" node देखें</li>
              <li>अगर error आए तो API keys check करें</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}