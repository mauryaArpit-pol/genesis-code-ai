
import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TerminalOutput {
  type: 'log' | 'error' | 'result';
  content: string;
}

interface TerminalProps {
  output: TerminalOutput[];
  executionTime?: number;
  className?: string;
}

const Terminal = ({ output, executionTime, className }: TerminalProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className={cn('bg-card rounded-md border border-border h-full', className)}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <h3 className="text-sm font-medium">Output</h3>
        {executionTime !== undefined && (
          <span className="text-xs text-muted-foreground">
            Execution time: {executionTime.toFixed(2)}ms
          </span>
        )}
      </div>
      <ScrollArea className="h-[calc(100%-40px)] p-3 terminal">
        {output.length === 0 ? (
          <div className="text-muted-foreground italic text-sm">Run your code to see output...</div>
        ) : (
          output.map((item, index) => (
            <div key={index} className={cn('mb-1', {
              'text-foreground': item.type === 'log',
              'text-destructive': item.type === 'error',
              'text-green-400': item.type === 'result'
            })}>
              {item.type === 'error' && <span className="font-bold">Error: </span>}
              <span className="output">{item.content}</span>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default Terminal;
