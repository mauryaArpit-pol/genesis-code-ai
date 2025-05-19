
import { setTimeout } from 'timers';

export interface ExecutionResult {
  output: Array<{ type: 'log' | 'error' | 'result'; content: string }>;
  executionTime: number;
}

// This is a simplified execution service that runs JavaScript code in a sandboxed environment
export const executeCode = async (code: string, language: string): Promise<ExecutionResult> => {
  const output: Array<{ type: 'log' | 'error' | 'result'; content: string }> = [];
  let executionTime = 0;
  
  // Only support JavaScript for now
  if (language !== 'javascript') {
    return {
      output: [{ 
        type: 'error', 
        content: `Language '${language}' execution is not supported in this demo. Only JavaScript is supported.` 
      }],
      executionTime: 0
    };
  }

  const startTime = performance.now();
  
  try {
    // Create a safe console.log replacement that captures output
    const originalConsoleLog = console.log;
    const capturedLogs: string[] = [];
    
    // Override console.log to capture logs
    console.log = (...args) => {
      const logMessage = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      capturedLogs.push(logMessage);
    };
    
    // Execute the code using Function constructor (not safe for production)
    // In a real application, this would be executed in a sandboxed environment on the backend
    const result = new Function(code)();
    
    // Restore original console.log
    console.log = originalConsoleLog;
    
    // Add captured logs to output
    capturedLogs.forEach(log => {
      output.push({ type: 'log', content: log });
    });
    
    // Add result if it exists and isn't undefined
    if (result !== undefined) {
      const resultString = typeof result === 'object' 
        ? JSON.stringify(result, null, 2) 
        : String(result);
      
      output.push({ type: 'result', content: `Result: ${resultString}` });
    }
  } catch (error) {
    output.push({ 
      type: 'error', 
      content: error instanceof Error ? error.message : String(error) 
    });
  } finally {
    executionTime = performance.now() - startTime;
  }
  
  return { output, executionTime };
};
