'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import AIChatSheet from './ai-chat-sheet';

export default function AIChatButton() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
        onClick={() => setSheetOpen(true)}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="h-8 w-8" />
      </Button>
      <AIChatSheet open={isSheetOpen} onOpenChange={setSheetOpen} />
    </>
  );
}
