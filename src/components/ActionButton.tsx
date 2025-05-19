
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LightbulbIcon, SparklesIcon, BrainIcon, WrenchIcon, PlayIcon } from 'lucide-react';

export type ActionType = 'suggest' | 'improve' | 'explain' | 'refactor' | 'run';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  action: ActionType;
  tooltip?: string;
  loading?: boolean;
}

const iconMap = {
  suggest: LightbulbIcon,
  improve: SparklesIcon,
  explain: BrainIcon,
  refactor: WrenchIcon,
  run: PlayIcon,
};

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ action, tooltip, loading = false, className, ...props }, ref) => {
    const Icon = iconMap[action];
    
    const colorClasses = {
      suggest: 'bg-ai-suggest text-white hover:bg-ai-suggest/90',
      improve: 'bg-ai-improve text-white hover:bg-ai-improve/90',
      explain: 'bg-ai-explain text-white hover:bg-ai-explain/90',
      refactor: 'bg-ai-refactor text-white hover:bg-ai-refactor/90',
      run: 'bg-ai-run text-white hover:bg-ai-run/90',
    };

    const buttonContent = (
      <Button
        variant="outline"
        size="icon"
        ref={ref}
        className={cn(
          'w-9 h-9 p-0 relative',
          colorClasses[action],
          className,
          loading && 'opacity-70 cursor-not-allowed'
        )}
        disabled={loading}
        {...props}
      >
        <Icon className="h-5 w-5" />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-md">
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </Button>
    );

    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
            <TooltipContent side="bottom">{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return buttonContent;
  }
);

ActionButton.displayName = 'ActionButton';

export default ActionButton;
