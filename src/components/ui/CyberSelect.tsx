'use client';

import * as Select from '@radix-ui/react-select';
import { cn } from '@/lib/utils';

export interface CyberSelectOption {
  value: string;
  label: string;
}

interface CyberSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: CyberSelectOption[];
  placeholder?: string;
  label?: string;
  id?: string;
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 4L4 7L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function CyberSelect({
  value,
  onValueChange,
  options,
  placeholder = 'Select...',
  label,
  id,
}: CyberSelectProps) {
  const hasValue = value !== '';

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="font-mono text-[10px] uppercase tracking-widest text-cyber-faint mb-2 block"
        >
          {label}
        </label>
      )}
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          id={id}
          className={cn(
            'inline-flex items-center justify-between gap-2',
            'font-mono text-[11px] uppercase tracking-wider',
            'pl-3 pr-2 py-2.5 min-w-[180px] min-h-[44px]',
            'border bg-cyber-surface',
            'transition-all duration-300 outline-none',
            'rounded-none',
            hasValue
              ? 'border-cyber-cyan text-cyber-cyan shadow-[0_0_8px_rgba(0,255,255,0.15)]'
              : 'border-cyber-border text-cyber-muted hover:border-cyber-muted/50 hover:text-cyber-heading',
            'focus-visible:border-cyber-cyan focus-visible:text-cyber-cyan',
            'data-[state=open]:border-cyber-cyan data-[state=open]:text-cyber-cyan',
          )}
          aria-label={label ?? placeholder}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon asChild>
            <ChevronIcon
              className={cn(
                'transition-colors duration-300 shrink-0',
                hasValue ? 'text-cyber-cyan' : 'text-cyber-muted',
              )}
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={cn(
              'z-[100] min-w-[var(--radix-select-trigger-width)]',
              'border border-cyber-border bg-cyber-surface',
              'shadow-[0_0_10px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.08)]',
              'rounded-none',
              'overflow-hidden',
            )}
            position="popper"
            sideOffset={4}
          >
            <Select.Viewport className="p-1">
              {/* Reset / "All" option */}
              <Select.Item
                value="__all__"
                className={cn(
                  'flex items-center gap-2 px-3 py-2.5 cursor-pointer outline-none',
                  'font-mono text-xs uppercase tracking-wider',
                  'transition-colors duration-150',
                  'rounded-none',
                  !hasValue ? 'text-cyber-heading' : 'text-cyber-muted',
                  'data-[highlighted]:bg-cyber-heading/10 data-[highlighted]:text-cyber-heading',
                )}
              >
                <Select.ItemText>{placeholder}</Select.ItemText>
                {!hasValue && (
                  <span className="ml-auto">
                    <CheckIcon className="text-cyber-cyan" />
                  </span>
                )}
              </Select.Item>

              <div
                className="mx-2 my-1 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"
                aria-hidden="true"
              />

              {options.map(({ value: optValue, label: optLabel }) => (
                <Select.Item
                  key={optValue}
                  value={optValue}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2.5 cursor-pointer outline-none',
                    'font-mono text-xs uppercase tracking-wider',
                    'transition-colors duration-150',
                    'rounded-none',
                    value === optValue ? 'text-cyber-heading' : 'text-cyber-muted',
                    'data-[highlighted]:bg-cyber-heading/10 data-[highlighted]:text-cyber-heading',
                  )}
                >
                  <Select.ItemText>{optLabel}</Select.ItemText>
                  <Select.ItemIndicator className="ml-auto">
                    <CheckIcon className="text-cyber-cyan" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
