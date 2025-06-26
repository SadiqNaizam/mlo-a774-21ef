import React, { useState, useEffect, useRef } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import ChatBubble, { MessageStatus } from '@/components/ChatBubble';
import MessageInputBar from '@/components/MessageInputBar';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define the structure for a message object
interface Message {
  id: string;
  message: string;
  timestamp: string;
  isSent: boolean;
  status: MessageStatus;
}

// Placeholder data for the contact and initial messages
const contactDetails = {
  name: 'Sam',
  avatarUrl: 'https://i.pravatar.cc/150?u=sam',
  isOnline: true,
};

const initialMessages: Message[] = [
  {
    id: '1',
    message: "Hey Sam, welcome to the team! Glad to have you on board.",
    timestamp: '10:00 AM',
    isSent: true,
    status: 'read',
  },
  {
    id: '2',
    message: "Thanks! Happy to be here. I'm just getting my setup sorted out.",
    timestamp: '10:01 AM',
    isSent: false,
    status: 'read',
  },
  {
    id: '3',
    message: "Great. Let me know if you need anything. We have a team sync at 11 AM, I'll send you the invite.",
    timestamp: '10:02 AM',
    isSent: true,
    status: 'delivered',
  },
];

const ChatWindow = () => {
  console.log('ChatWindow loaded');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    // The viewport is the direct child of the ScrollArea component's ref
    const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handler for sending a new message
  const handleSendMessage = (messageText: string) => {
    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      message: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true,
      status: 'sent',
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <AppHeader context="chat-window" contact={contactDetails} />
      
      <div className="flex-grow overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg.message}
                timestamp={msg.timestamp}
                isSent={msg.isSent}
                status={msg.status}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <MessageInputBar onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;