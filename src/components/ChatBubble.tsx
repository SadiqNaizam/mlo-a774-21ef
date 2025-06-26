import React from 'react';
import clsx from 'clsx';
import ReadReceiptIcon from '@/components/ReadReceiptIcon';

export type MessageStatus = 'sent' | 'delivered' | 'read';

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  isSent: boolean;
  status: MessageStatus;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, timestamp, isSent, status }) => {
  console.log('ChatBubble loaded');

  const bubbleContainerClasses = clsx(
    'flex w-full mb-2',
    {
      'justify-end': isSent,
      'justify-start': !isSent,
    }
  );

  const bubbleClasses = clsx(
    'relative max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl shadow-md',
    {
      'bg-blue-600 text-white': isSent,
      'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100': !isSent,
    }
  );

  return (
    <div className={bubbleContainerClasses}>
      <div className={bubbleClasses}>
        <p className="text-sm break-words">{message}</p>
        <div className="flex justify-end items-center mt-1 pt-1 clear-both">
          <span className={clsx('text-xs mr-2', {
            'text-blue-200': isSent,
            'text-gray-500 dark:text-gray-400': !isSent,
          })}>
            {timestamp}
          </span>
          {isSent && <ReadReceiptIcon status={status} />}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;