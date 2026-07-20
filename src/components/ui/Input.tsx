import { forwardRef, type InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, icon, hint, className = '', id, ...rest }, ref) => {
    const inputId = id || rest.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-rose-800">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-300">{icon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`meell-input ${icon ? 'pl-11' : ''} ${className}`}
            {...rest}
          />
        </div>
        {hint && <p className="text-xs text-rose-400">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';
export default Input;
