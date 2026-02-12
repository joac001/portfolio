import { TextStyle, styleClasses } from './types';

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';

interface TypographyProps {
  as?: TypographyElement;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  style?: TextStyle;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const variantClasses: Record<NonNullable<TypographyProps['variant']>, string> = {
  h1: 'text-xl md:text-3xl lg:text-4xl font-bold leading-tight text-surface-contrast text-balance',
  h2: 'text-lg md:text-2xl lg:text-3xl font-semibold leading-snug text-surface-contrast text-balance',
  h3: 'text-base md:text-xl lg:text-2xl font-medium leading-snug text-surface-contrast text-balance',
  body: 'text-sm md:text-base font-normal leading-relaxed text-surface-contrast text-pretty',
  caption: 'text-xs md:text-sm font-normal leading-normal text-muted-contrast text-pretty',
};

const defaultElementMap: Record<NonNullable<TypographyProps['variant']>, TypographyElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  caption: 'span',
};

export default function Typography({
  as,
  variant = 'body',
  style = 'formal',
  children,
  className = '',
  id,
}: TypographyProps) {
  const Tag = as ?? defaultElementMap[variant];
  return (
    <Tag id={id} className={`${variantClasses[variant]} ${styleClasses[style]} ${className}`}>
      {children}
    </Tag>
  );
}
