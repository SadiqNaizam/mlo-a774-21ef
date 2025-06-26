import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Settings = () => {
  console.log('Settings page loaded');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Custom Header for Settings Page */}
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4">
        <div className="flex items-center gap-3 w-full">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/chat-list"> {/* Path from App.tsx */}
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Chat List</span>
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </header>

      {/* Main Settings Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Profile Section */}
        <section className="space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@username" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="ghost">Change Photo</Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input id="status" defaultValue="Available" />
          </div>
           <Button className="w-full">Save Profile</Button>
        </section>

        <Separator />

        {/* Notifications Section */}
        <section className="space-y-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <Label htmlFor="push-notifications" className="font-medium">
                    Push Notifications
                </Label>
                <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                />
            </div>
        </section>

        <Separator />

        {/* Accordion for other settings */}
        <section>
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Account Information</AccordionTrigger>
                    <AccordionContent>
                    Manage your account details, such as phone number and email address associated with ChatConnect.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Privacy</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="read-receipts" className="font-medium">
                                Read Receipts
                            </Label>
                            <Switch
                                id="read-receipts"
                                checked={readReceipts}
                                onCheckedChange={setReadReceipts}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            If turned off, you won't be able to see read receipts from other people.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Help & Support</AccordionTrigger>
                    <AccordionContent>
                    Visit our help center or contact support if you have any issues.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>

        <Separator />

        {/* Logout Section */}
        <section>
            <Link to="/"> {/* Path from App.tsx, leading to Authentication */}
                 <Button variant="destructive" className="w-full">Logout</Button>
            </Link>
        </section>

      </main>
    </div>
  );
};

export default Settings;