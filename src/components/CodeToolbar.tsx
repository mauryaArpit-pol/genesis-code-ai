
import { useState } from 'react';
import ActionButton from './ActionButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ActionType } from './ActionButton';

interface CodeToolbarProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onActionClick: (action: ActionType) => void;
  actionLoading?: ActionType | null;
}

const availableLanguages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
];

const CodeToolbar = ({ 
  selectedLanguage, 
  onLanguageChange, 
  onActionClick,
  actionLoading 
}: CodeToolbarProps) => {
  const handleActionClick = (action: ActionType) => {
    onActionClick(action);
  };

  return (
    <div className="flex items-center justify-between gap-2 p-2 bg-card rounded-t-md border-b border-border">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-2">Language:</span>
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <ActionButton
          action="suggest"
          tooltip="Suggest Fix"
          onClick={() => handleActionClick('suggest')}
          loading={actionLoading === 'suggest'}
        />
        <ActionButton
          action="improve"
          tooltip="Improve Code"
          onClick={() => handleActionClick('improve')}
          loading={actionLoading === 'improve'}
        />
        <ActionButton
          action="explain"
          tooltip="Explain Code"
          onClick={() => handleActionClick('explain')}
          loading={actionLoading === 'explain'}
        />
        <ActionButton
          action="refactor"
          tooltip="Refactor Code"
          onClick={() => handleActionClick('refactor')}
          loading={actionLoading === 'refactor'}
        />
        <ActionButton
          action="run"
          tooltip="Run Code"
          onClick={() => handleActionClick('run')}
          loading={actionLoading === 'run'}
        />
      </div>
    </div>
  );
};

export default CodeToolbar;
