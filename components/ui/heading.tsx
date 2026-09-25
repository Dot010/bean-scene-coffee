import { cn } from '@/lib/utils';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
}

export function Heading({
  as: Component = 'h2',
  className,
  children,
  ...props
}: HeadingProps) {
  const sizes = {
    h1: 'text-4xl md:text-6xl lg:text-7xl font-bold text-coffee-brown',
    h2: 'text-3xl md:text-5xl font-bold text-coffee-dark',
    h3: 'text-xl md:text-2xl font-semibold text-coffee-dark',
  };

  return (
    <Component
      className={cn('font-serif leading-tight', sizes[Component], className)}
      {...props}
    >
      {children}
    </Component>
  );
}