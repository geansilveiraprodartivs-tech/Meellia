import type { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 animate-fade-up">
      {icon && <div className="mb-4 text-rose-300">{icon}</div>}
      <h3 className="font-display text-lg font-semibold text-rose-700">{title}</h3>
      {description && <p className="mt-1.5 max-w-md text-sm text-rose-400">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
