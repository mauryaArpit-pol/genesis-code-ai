
// This is a mock AI service for the demo
// In a real application, this would connect to a backend service with OpenAI integration

export interface AIResponse {
  content: string;
}

export const getAIResponse = async (code: string, action: string, language: string): Promise<string> => {
  // In a real implementation, this would call an API endpoint
  // For the demo, we'll simulate responses
  
  console.log(`AI Service called with action: ${action}, language: ${language}`);
  console.log('Code sample:', code.substring(0, 100) + '...');
  
  // Add a small delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock responses based on the action
  switch (action) {
    case 'suggest':
      return generateSuggestResponse(code, language);
    case 'improve':
      return generateImproveResponse(code, language);
    case 'explain':
      return generateExplainResponse(code, language);
    case 'refactor':
      return generateRefactorResponse(code, language);
    default:
      return "I'm not sure how to help with that specific request. Try running your code or selecting a different action.";
  }
};

const generateSuggestResponse = (code: string, language: string): string => {
  if (code.includes('error') || code.includes('Error')) {
    return "I noticed a potential error in your code. Consider checking:\n\n" +
      "- Variable declarations before usage\n" +
      "- Proper closing of brackets and parentheses\n" +
      "- Missing semicolons where required\n\n" +
      "```js\n" +
      "// Example fix\n" +
      "// Change: let result = calculate(x\n" +
      "// To: let result = calculate(x);\n" +
      "```";
  }
  
  return "Your code looks good! I don't see any obvious errors to fix at this time.";
};

const generateImproveResponse = (code: string, language: string): string => {
  return "Here are some suggestions to improve your code:\n\n" +
    "1. Consider using more descriptive variable names\n" +
    "2. Add comments to explain complex logic\n" +
    "3. For better performance with the Fibonacci function, consider using memoization:\n\n" +
    "```js\n" +
    "function fibonacciWithMemo(n, memo = {}) {\n" +
    "  if (n in memo) return memo[n];\n" +
    "  if (n <= 1) return n;\n" +
    "  memo[n] = fibonacciWithMemo(n - 1, memo) + fibonacciWithMemo(n - 2, memo);\n" +
    "  return memo[n];\n" +
    "}\n" +
    "```\n\n" +
    "This implementation caches previously calculated values, avoiding redundant calculations.";
};

const generateExplainResponse = (code: string, language: string): string => {
  if (code.includes('fibonacci')) {
    return "This code calculates Fibonacci numbers.\n\n" +
      "The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.\n\n" +
      "For example: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...\n\n" +
      "The function works by using recursion:\n" +
      "1. If the input number (n) is 0 or 1, it returns n directly\n" +
      "2. Otherwise, it calls itself with (n-1) and (n-2), then adds the results\n\n" +
      "While this implementation is elegant and easy to understand, it's not efficient for large values of n because it recalculates the same values many times.";
  }
  
  return "This code appears to be a JavaScript program. I'd need more context about specific parts you'd like explained. You can select a specific section and try the explain option again.";
};

const generateRefactorResponse = (code: string, language: string): string => {
  if (code.includes('fibonacci')) {
    return "Here's a refactored version of your Fibonacci function using an iterative approach instead of recursion:\n\n" +
      "```js\n" +
      "function fibonacci(n) {\n" +
      "  // Handle base cases\n" +
      "  if (n <= 1) return n;\n" +
      "  \n" +
      "  // Use iteration instead of recursion\n" +
      "  let prev = 0;\n" +
      "  let current = 1;\n" +
      "  \n" +
      "  for (let i = 2; i <= n; i++) {\n" +
      "    const next = prev + current;\n" +
      "    prev = current;\n" +
      "    current = next;\n" +
      "  }\n" +
      "  \n" +
      "  return current;\n" +
      "}\n" +
      "```\n\n" +
      "This implementation:\n" +
      "- Has O(n) time complexity instead of O(2^n)\n" +
      "- Uses constant space O(1) instead of O(n) stack space\n" +
      "- Is much more efficient for large inputs\n" +
      "- Avoids stack overflow errors for large values";
  }
  
  return "I'd need to analyze your specific code to offer meaningful refactoring suggestions. Please make sure your code has clear functionality that can be refactored.";
};
