import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, UserPlus, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

// Mock contact data
const contacts = [
  { id: '1', name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=alice', status: "Hey there! I'm using ChatConnect." },
  { id: '2', name: 'Bob Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=bob', status: "At the movies." },
  { id: '3', name: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/150?u=charlie', status: "Available" },
  { id: '4', name: 'Diana Prince', avatarUrl: 'https://i.pravatar.cc/150?u=diana', status: "On a work call." },
  { id: '5', name: 'Ethan Hunt', avatarUrl: 'https://i.pravatar.cc/150?u=ethan', status: "In a meeting." },
  { id: '6', name: 'Fiona Glenanne', avatarUrl: 'https://i.pravatar.cc/150?u=fiona', status: "Sleeping" },
  { id: '7', name: 'George Costanza', avatarUrl: 'https://i.pravatar.cc/150?u=george', status: "Architecting." },
  { id: '8', name: 'Hannah Montana', avatarUrl: 'https://i.pravatar.cc/150?u=hannah', status: "Best of both worlds!" },
];

const ContactSelection = () => {
  console.log('ContactSelection page loaded');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };
  
  const handleStartChat = () => {
    // For now, navigates to the generic chat window.
    // In a real app, you would pass the selected contact IDs.
    if (selectedContacts.length > 0) {
      navigate('/chat-window');
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4">
        <div className="flex items-center gap-4 w-full">
            <Link to="/chat-list">
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back to Chat List</span>
                </Button>
            </Link>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Select Contact</h1>
            <p className="text-sm text-muted-foreground">{contacts.length} contacts</p>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search contacts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
         {/* Action buttons */}
         <div className="p-4 space-y-4">
            <Button variant="ghost" className="w-full justify-start gap-3">
                <Users className="h-5 w-5 text-primary"/>
                New Group
            </Button>
             <Button variant="ghost" className="w-full justify-start gap-3">
                <UserPlus className="h-5 w-5 text-primary"/>
                New Contact
            </Button>
        </div>
        <Separator/>

        <p className="p-4 text-sm font-semibold text-primary">Contacts on ChatConnect</p>
      
        {/* Contact List */}
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-4 pt-0">
            {filteredContacts.map(contact => {
                 const initials = contact.name.split(' ').map((n) => n[0]).join('').toUpperCase();
                return (
                    <label 
                        key={contact.id} 
                        htmlFor={`contact-${contact.id}`} 
                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent cursor-pointer"
                    >
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-medium">{contact.name}</p>
                        </div>
                        <Checkbox
                            id={`contact-${contact.id}`}
                            checked={selectedContacts.includes(contact.id)}
                            onCheckedChange={() => handleSelectContact(contact.id)}
                        />
                    </label>
                )
            })}
          </div>
        </ScrollArea>
      </div>
      
      {/* Footer Action Button */}
      {selectedContacts.length > 0 && (
          <footer className="p-4 border-t bg-background">
            <Button 
                className="w-full" 
                size="lg"
                onClick={handleStartChat}
            >
              {selectedContacts.length === 1 ? 'Start Chat' : `Start Group Chat (${selectedContacts.length})`}
            </Button>
          </footer>
      )}
    </div>
  );
};

export default ContactSelection;