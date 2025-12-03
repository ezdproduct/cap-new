"use client";

import { MessageSquare } from 'lucide-react';
import { Button } from './button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function FloatingChatButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-cap-purple hover:bg-cap-purple/90"
            onClick={() => console.log('Chat opened')}
          >
            <MessageSquare className="h-7 w-7" />
            <span className="sr-only">Open Chat</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chat with us!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}