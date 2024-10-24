interface LabelProps {
    name: string;
    className?: string;
}

export function Label({ name, className }: LabelProps) {
    return (
        <div 
            className={`
                inline-flex items-center justify-center 
                px-3 py-1.5
                bg-gradient-to-r from-slate-100 to-slate-200
                hover:from-slate-200 hover:to-slate-300
                text-slate-700 
                rounded-full 
                font-medium text-sm 
                transition-all duration-200
                shadow-sm hover:shadow
                cursor-default
                border border-slate-200
                select-none
                ${className}
            `}
        >
            {name}
        </div>
    );
}