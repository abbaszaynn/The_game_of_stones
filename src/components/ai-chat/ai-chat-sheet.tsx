'use client';

import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, User, Bot } from 'lucide-react';
import { answerInvestorQuery } from '@/ai/flows/answer-investor-queries';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { cn } from '@/lib/utils';

interface AIChatSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const formSchema = z.object({
  query: z.string().min(1, { message: 'Query cannot be empty.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AIChatSheet({ open, onOpenChange }: AIChatSheetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: '' },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const userMessage: Message = { role: 'user', content: data.query };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    form.reset();

    try {
      const result = await answerInvestorQuery({ query: data.query });
      const assistantMessage: Message = { role: 'assistant', content: result.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I encountered an error and can't respond right now.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('AI query failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>AI Investor Assistant</SheetTitle>
          <SheetDescription>Ask me anything about the companies, projects, or documents.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-xs rounded-lg p-3 text-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {message.content}
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                   <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                        <span className="h-2 w-2 bg-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-foreground rounded-full animate-pulse"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        <div className="p-4 border-t">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="e.g., 'What is the status of the Skardu project?'"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
