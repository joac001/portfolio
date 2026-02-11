type ContainerElement = 'main' | 'section' | 'div';

interface ContainerProps {
  as?: ContainerElement;
  children: React.ReactNode;
  className?: string;
  id: string;
}

export default function Container({ as: Tag = 'main', children, className, id }: ContainerProps) {
    return (
      <Tag id={id} className={`flex w-dvw h-dvh gap-4 px-8 py-4 bg-background transition-colors ${className}`}>
        {children}
      </Tag>
    );
}
