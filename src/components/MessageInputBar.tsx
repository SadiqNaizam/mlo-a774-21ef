import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Paperclip, Smile, Send } from 'lucide-react';

interface MessageInputBarProps {
  /**
   * Callback function to be invoked when the user sends a message.
   * @param message The text content of the message.
   */
  onSendMessage: (message: string) => void;
}

const MessageInputBar: React.FC<MessageInputBarProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  console.log('MessageInputBar loaded');

  // Effect to handle auto-resizing of the textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Temporarily shrink to calculate the real scroll height
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      // Set the new height, respecting a max-height
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [message]);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on 'Enter' key press, unless 'Shift' is held
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line
      handleSendMessage();
    }
  };

  const handleAttachFile = () => {
    // Placeholder for file attachment logic
    console.log("Attach file button clicked. Implement file input logic here.");
    // Example: document.getElementById('file-input')?.click();
  };

  const handleEmojiPicker = () => {
    // Placeholder for emoji picker logic
    console.log("Emoji picker button clicked. Implement emoji picker popover here.");
  };

  return (
    <div className="p-2 sm:p-4 bg-background border-t flex items-end gap-2 w-full">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="flex-shrink-0" onClick={handleEmojiPicker}>
          <Smile className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Open emoji picker</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex-shrink-0" onClick={handleAttachFile}>
          <Paperclip className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Attach a file</span>
        </Button>
      </div>

      <div className="flex-grow">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="w-full resize-none overflow-y-auto max-h-40 rounded-xl bg-muted py-3 px-4"
          rows={1}
        />
      </div>

      <Button
        size="icon"
        className="flex-shrink-0 rounded-full w-12 h-12"
        onClick={handleSendMessage}
        disabled={!message.trim()}
        aria-label="Send message"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MessageInputBar;