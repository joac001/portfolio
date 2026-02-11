import { useId } from "react";
import Typography from "./Typography";
import type Button from "./Button";

interface CardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    actions?: React.ReactElement<typeof Button>[];
}

export default function Card({ title, subtitle, children, className = "", actions }: CardProps) {
    const titleId = useId();

    return (
        <article aria-labelledby={titleId} className={`flex flex-col bg-surface border border-border rounded-xl p-6 md:p-8 transition-colors ${className}`}>
            <header className="mb-4">
                <Typography variant="h3" id={titleId}>{title}</Typography>
                {subtitle && <Typography variant="caption" className="mt-1">{subtitle}</Typography>}
            </header>
            <div className="flex-1">{children}</div>
            {actions && actions.length > 0 && (
                <footer className="mt-4 flex justify-end gap-2" role="group" aria-label="Card actions">
                    {actions}
                </footer>
            )}
        </article>
    );
}
