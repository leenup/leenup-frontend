import * as React from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
    return (
        <label className="relative inline-flex items-center">
            <input
                type="checkbox"
                ref={ref}
                className={cn(
                    'peer sr-only',
                    className
                )}
                {...props}
            />
            <div className="h-5 w-5 shrink-0 rounded border border-input bg-background peer-checked:bg-primary peer-checked:text-primary-foreground flex items-center justify-center transition-colors">
                <Check className="h-4 w-4 text-white peer-checked:visible invisible" />
            </div>
        </label>
    )
})
Checkbox.displayName = 'Checkbox'

export { Checkbox }