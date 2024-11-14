'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: 'group toast group-[.toaster]:bg-base-100 group-[.toaster]:text-white group-[.toaster]:text-lg group-[.toaster]:border-base-300 group-[.toaster]:shadow-lg',
                    description: 'group-[.toast]:text-white text-lg',
                    actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-white',
                    cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-white',
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
