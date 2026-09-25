import Link from 'next/link';
import { cn } from '@/lib/util';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export function Button({
  href,
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'rounded-full px-6 py-2 text-sm font-bold font-serif transition-transform hover:scale-105 inline-flex items-center justify-center';

    const variants = {
        primary: "bg-coffee-amber text-coffee-brown hover:bg-coffee-amber/90",
        secondary: "bg-coffee-brown text-coffee-cream hover:bg-coffee-brown/90",
        ghost: "text-coffee-cream hover:underline px-0 py-0 font-sans font-semibold"
    }
    
    const combinedClasses = cn(baseStyles, variants[variant], className)
    
    if (href) {
        return (
            <Link href={href} className={combinedClasses}> {children}</Link>
        )
    }
    return (
        <button className={combinedClasses} {...props}>
            {children}
    </button>
)
}
