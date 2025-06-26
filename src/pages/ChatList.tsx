import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import ChatListItem from '@/components/ChatListItem';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

// Icons
import { MessageSquarePlus } from 'lucide-react';

// Placeholder data for the chat list, as described in page_type_info
const mockChats = [
  {
    chatId: '1',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    name: 'Alice Johnson',
    lastMessage: "Hey, are you free for the meeting tomorrow?",
    lastMessageTime: '10:42 AM',
    unreadCount: 2,
  },
  {
    chatId: '2',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    name: 'Tech Team Group',
    lastMessage: "Bob: Don't forget to push the latest changes.",
    lastMessageTime: '9:15 AM',
    unreadCount: 5,
  },
  {
    chatId: '3',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    name: 'Charlie Brown',
    lastMessage: "Sounds good, see you then!",
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    chatId: '4',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
    name: 'Diana Prince',
    lastMessage: "Can you send over the report?",
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    chatId: '5',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704b',
    name: 'Project Phoenix',
    lastMessage: "You: I've updated the documentation.",
    lastMessageTime: '2 days ago',
    unreadCount: 0,
  },
];

const ChatList = () => {
  console.log('ChatList page loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-background max-w-2xl mx-auto border-x border-border">
      <AppHeader context="chat-list" />

      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Search Input */}
        <div className="p-4 border-b border-border">
          <Input
            type="search"
            placeholder="Search or start a new chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <ChatListItem
                  key={chat.chatId}
                  chatId={chat.chatId}
                  avatarUrl={chat.avatarUrl}
                  name={chat.name}
                  lastMessage={chat.lastMessage}
                  lastMessageTime={chat.lastMessageTime}
                  unreadCount={chat.unreadCount}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground p-8">No chats found.</p>
            )}
          </div>
        </ScrollArea>

        {/* Floating Action Button to start a new chat */}
        <Button asChild className="absolute bottom-6 right-6 h-14 w-14 rounded-full shadow-lg">
          <Link to="/contact-selection"> {/* Path from App.tsx and user journey */}
            <MessageSquarePlus className="h-7 w-7" />
            <span className="sr-only">New Chat</span>
          </Link>
        </Button>
      </main>
    </div>
  );
};

export default ChatList;