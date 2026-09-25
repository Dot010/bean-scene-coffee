import { cn } from '@/lib/utils';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'default' | 'kicker' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Text({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: TextProps) {
  const variants = {

    default: 'text-coffee-cream/90 leading-relaxed font-normal',
    

    kicker: 'text-coffee-amber font-semibold tracking-wide',
    

    subtle: 'text-coffee-gray/80 font-normal',
  };

  const sizes = {
    sm: 'text-sm md:text-base',
    md: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
  };

  return (
    <p
      className={cn('font-sans', variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </p>
  );
}