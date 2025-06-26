import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Settings, ArrowLeft, Phone, MoreVertical } from 'lucide-react';

// Define discriminated union for props to ensure type safety
interface ChatListHeaderProps {
  context: 'chat-list';
}

interface ChatWindowHeaderProps {
  context: 'chat-window';
  contact: {
    name: string;
    avatarUrl: string;
    isOnline: boolean;
  };
}

type AppHeaderProps = ChatListHeaderProps | ChatWindowHeaderProps;

const AppHeader: React.FC<AppHeaderProps> = (props) => {
  console.log('AppHeader loaded');

  const renderChatListHeader = () => (
    <div className="flex items-center justify-between w-full">
      <h1 className="text-xl font-bold text-primary">ChatConnect</h1>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search Chats</span>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link to="/settings">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Open Settings</span>
          </Link>
        </Button>
      </div>
    </div>
  );

  const renderChatWindowHeader = (contact: ChatWindowHeaderProps['contact']) => {
    const initials = contact.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" asChild>
            <Link to="/chat-list">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Chat List</span>
            </Link>
          </Button>
          <Avatar>
            <AvatarImage src={contact.avatarUrl} alt={contact.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{contact.name}</span>
            <span className="text-xs text-muted-foreground">
              {contact.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
            <span className="sr-only">Call Contact</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">More Options</span>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4">
      {props.context === 'chat-window'
        ? renderChatWindowHeader(props.contact)
        : renderChatListHeader()}
    </header>
  );
};

export default AppHeader;