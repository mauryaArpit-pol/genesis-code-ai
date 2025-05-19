
import { ActionType } from '@/components/ActionButton';

// This is a placeholder service for AI responses
// In a real implementation, this would connect to your backend API
export const getAIResponse = async (code: string, action: ActionType, language: string): Promise<string> => {
  // In a real application, this would be an API call to your backend
  console.log(`Processing ${action} request for ${language} code`);
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Return mock responses based on the action type
  switch (action) {
    case 'suggest':
      return getMockSuggestResponse(code);
    case 'improve':
      return getMockImproveResponse(code);
    case 'explain':
      return getMockExplainResponse(code);
    case 'refactor':
      return getMockRefactorResponse(code);
    default:
      return "I couldn't process your request. Please try again.";
  }
};

// Mock responses for each action type
const getMockSuggestResponse = (code: string): string => {
  if (code.includes('console.log(')) {
    return "I noticed you're using `console.log()`. This seems correct, but in production code, you might want to consider using a proper logging library that can be configured for different environments.\n\n```javascript\n// Instead of\nconsole.log('Debug info');\n\n// Consider using a logger\nlogger.debug('Debug info');\n```";
  }
  
  return "Your code looks good! I didn't detect any obvious issues to fix.";
};

const getMockImproveResponse = (code: string): string => {
  return `Here are some improvements for your code:

1. **Code Quality Score: 82%**

2. **Suggestions:**
   - Consider adding more descriptive variable names
   - Add comments for complex logic
   - Use ES6+ features like destructuring and arrow functions

\`\`\`javascript
// Example of improved code:
const calculateTotal = (items) => {
  // Use reduce for cleaner array operations
  return items.reduce((total, item) => total + item.price, 0);
}
\`\`\`

3. **Best Practice:**
   - Split complex functions into smaller ones
   - Add proper error handling for robust code
   - Use constants for magic numbers and strings`;
};

const getMockExplainResponse = (code: string): string => {
  if (code.includes('console.log(')) {
    return "This code uses `console.log()` to print output to the JavaScript console. \n\n`console.log()` is a debugging tool that displays information in the browser's developer tools console or in the terminal if you're running Node.js. \n\nIt's commonly used during development to check values of variables, trace execution flow, or verify that specific parts of the code are running.";
  }

  return `This code contains JavaScript functionality. Let me explain what it does:

The code defines a function that processes some data. Functions are reusable blocks of code that perform specific tasks when called.

When this code runs, it will execute the instructions inside the function body, potentially manipulating data and returning a result.

This is a fundamental concept in programming - defining procedures that can be invoked whenever needed.`;
};

const getMockRefactorResponse = (code: string): string => {
  return `Here's a refactored version of your code:

\`\`\`javascript
// Refactored for better readability and maintainability
const processData = (inputArray) => {
  // Early return for edge cases
  if (!inputArray || inputArray.length === 0) {
    return [];
  }
  
  // Extract the transformation logic
  const transformItem = (item) => ({
    id: item.id,
    value: item.value * 2,
    label: \`Item \${item.id}\`
  });
  
  // Apply transformation to all items
  return inputArray.map(transformItem);
};
\`\`\`

Changes made:
1. Converted to arrow function syntax
2. Added input validation
3. Extracted transformation logic into a separate function
4. Improved variable naming
5. Used template literals for string formatting`;
};
