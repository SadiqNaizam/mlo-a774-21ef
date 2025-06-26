import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChatListItemProps {
  chatId: string;
  avatarUrl: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isActive?: boolean;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  chatId,
  avatarUrl,
  name,
  lastMessage,
  lastMessageTime,
  unreadCount,
  isActive = false,
}) => {
  console.log(`ChatListItem loaded for: ${name}`);

  // Generate fallback initials from the name
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Link
      to={`/chat-window?chatId=${chatId}`}
      className={cn(
        "flex items-center p-3 w-full gap-4 transition-colors duration-200 rounded-lg",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive ? "bg-gray-200 dark:bg-gray-700" : "bg-transparent"
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Avatar className="h-14 w-14 flex-shrink-0">
        <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>

      <div className="flex-grow overflow-hidden border-b border-gray-200 dark:border-gray-700 py-2">
        <div className="flex justify-between items-center mb-1">
          <p className="font-semibold text-base text-gray-900 dark:text-gray-100 truncate">{name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
            {lastMessageTime}
          </p>
        </div>
        <div className="flex justify-between items-start">
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate pr-2">
            {lastMessage}
          </p>
          {unreadCount > 0 && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white h-6 min-w-[24px] flex items-center justify-center text-xs px-1.5 rounded-full">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatListItem;