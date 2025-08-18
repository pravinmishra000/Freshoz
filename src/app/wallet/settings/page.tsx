
'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, HelpCircle, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export default function WalletSettingsPage() {
    const router = useRouter();
    const userPhone = "9097882555";

    return (
        <div className="flex min-h-screen flex-col bg-muted/20">
            <header className="sticky top-0 z-40 w-full border-b bg-background">
                <div className="container mx-auto flex h-16 items-center px-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ChevronLeft />
                    </Button>
                    <h1 className="text-xl font-bold mx-auto">Freshoz Money Settings</h1>
                    <div className="w-10"></div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-2 py-6 sm:px-4">
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">Account linked with</p>
                            <p className="font-semibold">+91 {userPhone}</p>
                        </CardContent>
                    </Card>

                    <div className="space-y-2">
                        <h2 className="px-2 text-2xl font-bold">Quick action</h2>
                        <Card>
                            <CardContent className="p-0">
                               <Dialog>
                                <DialogTrigger asChild>
                                    <button className="w-full text-left p-4 flex justify-between items-center">
                                        <span>Change phone number</span>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                    <DialogTitle>Change Phone Number</DialogTitle>
                                    <DialogDescription>
                                        Enter your new phone number below. We'll send a verification code.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="new-phone">New Phone Number</Label>
                                            <Input id="new-phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                                        </div>
                                         <Alert variant="destructive" className="bg-yellow-50 border-yellow-200 text-yellow-800">
                                            <Info className="h-4 w-4 !text-yellow-700" />
                                            <AlertTitle className="font-semibold !text-yellow-900">Important Note</AlertTitle>
                                            <AlertDescription className="!text-yellow-800">
                                               The existing Freshoz Money balance will not be transferred to the new phone number.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                    <DialogFooter>
                                    <Button type="submit">Continue</Button>
                                    </DialogFooter>
                                </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-2">
                        <Card>
                           <CardContent className="p-0">
                                <Link href="/faq">
                                    <button className="w-full text-left p-4 flex justify-between items-center">
                                        <span>FAQ</span>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    </button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
