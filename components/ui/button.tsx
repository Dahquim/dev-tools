import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'btn',
    {
        variants: {
            variant: {
                default: '',
                neutral: 'btn-neutral',
                accent: 'btn-accent',
                outline: 'btn-outline',
                primary: 'btn-primary',
                secondary: 'btn-secondary',
                ghost: 'btn-ghost',
                link: 'btn-link',
            },
            state: {
                default: '',
                info: 'btn-info',
                success: 'btn-success',
                warning: 'btn-warning',
                error: 'btn-error',
            },
            size: {
                default: '',
                sm: 'btn-sm',
                lg: 'btn-lg',
                icon: 'btn-xs',
                wide: 'btn-wide'
            },
        },
        defaultVariants: {
            variant: 'default',
            state: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, state, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, state, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
