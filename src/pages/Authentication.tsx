import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const Authentication = () => {
  console.log('Authentication page loaded');

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Basic phone number validation
    if (phone.length > 8 && /^\+?[0-9\s]+$/.test(phone)) {
      console.log(`Phone number submitted: ${phone}. Proceeding to OTP step.`);
      setStep('otp');
    } else {
      setError('Please enter a valid phone number, including country code.');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Mock OTP validation
    if (otp === '123456') { // Using a mock OTP for demonstration
      console.log('OTP verification successful. Navigating to chat list.');
      // On successful login, navigate to the chat list page
      navigate('/chat-list');
    } else {
      setError('The OTP you entered is incorrect. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* AppHeader is used here to maintain layout consistency, as specified */}
      <AppHeader context="chat-list" />

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          {step === 'phone' ? (
            <>
              <CardHeader>
                <CardTitle>Welcome to ChatConnect</CardTitle>
                <CardDescription>Enter your phone number to get started.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePhoneSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel"
                        placeholder="+1 555-123-4567" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <Button type="submit" className="w-full">
                      Send Verification Code
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Verify Your Number</CardTitle>
                <CardDescription>Enter the 6-digit code sent to {phone}.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                   <div className="flex flex-col items-center space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <InputOTP 
                      id="otp" 
                      maxLength={6} 
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {error && (
                      <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  <Button type="submit" className="w-full">
                    Verify & Continue
                  </Button>
                   <Button variant="link" size="sm" onClick={() => { setStep('phone'); setError(null); }}>
                    Use a different phone number
                  </Button>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Authentication;