
import React, { useState, useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';
import CodeToolbar from '@/components/CodeToolbar';
import Terminal from '@/components/Terminal';
import AIResponsePanel from '@/components/AIResponsePanel';
import { executeCode } from '@/services/executionService';
import { getAIResponse } from '@/services/aiService';
import { ActionType } from '@/components/ActionButton';
import { useToast } from '@/components/ui/use-toast';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const DEFAULT_CODE = `// Welcome to the AI Code Editor!
// Try out the features by clicking the buttons above

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
const result = fibonacci(10);
console.log(\`The 10th Fibonacci number is: \${result}\`);

// Try running this code, then use the AI features to:
// - Explain what the fibonacci sequence is
// - Improve this implementation
// - Refactor to use memoization for better performance
`;

const Index = () => {
  const { toast } = useToast();
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState('javascript');
  const [terminalOutput, setTerminalOutput] = useState<Array<{ type: 'log' | 'error' | 'result'; content: string }>>([]);
  const [executionTime, setExecutionTime] = useState<number | undefined>(undefined);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [actionLoading, setActionLoading] = useState<ActionType | null>(null);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    toast({
      title: `Language Changed`,
      description: `Editor language set to ${newLanguage}`,
      duration: 2000,
    });
  };

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== undefined) {
      setCode(newCode);
    }
  };

  const handleActionClick = async (action: ActionType) => {
    if (action === 'run') {
      await handleRunCode();
      return;
    }

    setActionLoading(action);
    setActiveAction(action);
    
    try {
      const response = await getAIResponse(code, action, language);
      setAiResponse(response);
    } catch (error) {
      console.error(`Error during ${action}:`, error);
      toast({
        title: "Error",
        description: `Failed to ${action} code. Please try again.`,
        variant: "destructive",
      });
      setAiResponse(`Error: Failed to ${action} code. Please try again later.`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRunCode = async () => {
    setActionLoading('run');
    
    try {
      const result = await executeCode(code, language);
      setTerminalOutput(result.output);
      setExecutionTime(result.executionTime);
    } catch (error) {
      console.error('Error executing code:', error);
      setTerminalOutput([{ 
        type: 'error', 
        content: error instanceof Error ? error.message : 'Unknown execution error' 
      }]);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <header className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">AI Code Editor</h1>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="h-full flex flex-col">
              <CodeToolbar
                selectedLanguage={language}
                onLanguageChange={handleLanguageChange}
                onActionClick={handleActionClick}
                actionLoading={actionLoading}
              />
              <div className="flex-1">
                <CodeEditor
                  defaultValue={code}
                  defaultLanguage={language}
                  onChange={handleCodeChange}
                />
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={40}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50} minSize={30}>
                <Terminal output={terminalOutput} executionTime={executionTime} />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={50} minSize={30}>
                <AIResponsePanel 
                  actionType={activeAction} 
                  content={aiResponse} 
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
};

export default Index;
