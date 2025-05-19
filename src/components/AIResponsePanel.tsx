
import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActionType } from './ActionButton';

interface AIResponsePanelProps {
  actionType: ActionType | null;
  content: string | null;
  className?: string;
}

const AIResponsePanel = ({ actionType, content, className }: AIResponsePanelProps) => {
  const formatContent = (text: string) => {
    // Simple markdown-like formatting
    // Convert code blocks
    const formattedText = text
      .replace(/```([\s\S]*?)```/g, '<pre>$1</pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br />');
    
    return formattedText;
  };

  const getActionTitle = () => {
    switch (actionType) {
      case 'suggest':
        return 'Suggested Fix';
      case 'improve':
        return 'Code Improvement';
      case 'explain':
        return 'Code Explanation';
      case 'refactor':
        return 'Refactored Code';
      default:
        return 'AI Response';
    }
  };

  const getActionColor = () => {
    switch (actionType) {
      case 'suggest':
        return 'border-l-ai-suggest';
      case 'improve':
        return 'border-l-ai-improve';
      case 'explain':
        return 'border-l-ai-explain';
      case 'refactor':
        return 'border-l-ai-refactor';
      default:
        return 'border-l-border';
    }
  };

  return (
    <div className={cn('bg-card rounded-md border border-border h-full', className)}>
      <div className="flex items-center px-3 py-2 border-b border-border">
        <h3 className="text-sm font-medium">
          {actionType ? getActionTitle() : 'AI Assistant'}
        </h3>
      </div>
      
      <ScrollArea className="h-[calc(100%-40px)] p-4">
        {content ? (
          <div 
            className={cn('ai-response-content p-3 border-l-2 rounded-r-sm', getActionColor())}
            dangerouslySetInnerHTML={{ __html: formatContent(content) }}
          />
        ) : (
          <div className="text-muted-foreground italic text-sm">
            Use the action buttons above to get AI assistance with your code.
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default AIResponsePanel;
