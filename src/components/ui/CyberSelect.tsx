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
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 10 8"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M1 4L4 7L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Filter({
  value,
  onValueChange,
  options,
  placeholder = 'Select…',
  label,
  id,
}: CyberSelectProps) {
  const hasValue = value !== '';

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium uppercase tracking-wider text-faint mb-2 block"
        >
          {label}
        </label>
      )}
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          id={id}
          className={cn(
            'inline-flex items-center justify-between gap-3',
            'text-sm font-medium',
            'pl-4 pr-3 py-2.5 min-w-[200px] min-h-[40px]',
            'border bg-bg',
            'rounded-full',
            'transition-colors duration-200 outline-none',
            hasValue
              ? 'border-ink text-heading'
              : 'border-border text-body hover:border-border-strong hover:text-heading',
            'focus-visible:ring-2 focus-visible:ring-ink',
          )}
          aria-label={label ?? placeholder}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon asChild>
            <ChevronIcon className="shrink-0 text-faint" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={cn(
              'z-[100] min-w-[var(--radix-select-trigger-width)]',
              'bg-surface border border-border',
              'shadow-[0_8px_24px_rgba(8,15,17,0.08)]',
              'overflow-hidden',
            )}
            position="popper"
            sideOffset={6}
          >
            <Select.Viewport className="p-1">
              <Select.Item
                value="__all__"
                className={cn(
                  'flex items-center gap-2 px-3 py-2 cursor-pointer outline-none',
                  'text-sm font-medium transition-colors duration-150',
                  !hasValue ? 'text-heading' : 'text-body',
                  'data-[highlighted]:bg-bg',
                )}
              >
                <Select.ItemText>{placeholder}</Select.ItemText>
                {!hasValue && (
                  <span className="ml-auto">
                    <CheckIcon className="text-heading" />
                  </span>
                )}
              </Select.Item>

              <div className="mx-2 my-1 h-px bg-border" aria-hidden="true" />

              {options.map(({ value: optValue, label: optLabel }) => (
                <Select.Item
                  key={optValue}
                  value={optValue}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 cursor-pointer outline-none',
                    'text-sm font-medium transition-colors duration-150',
                    value === optValue ? 'text-heading' : 'text-body',
                    'data-[highlighted]:bg-bg',
                  )}
                >
                  <Select.ItemText>{optLabel}</Select.ItemText>
                  <Select.ItemIndicator className="ml-auto">
                    <CheckIcon className="text-heading" />
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
