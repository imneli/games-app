import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
    return (
        <div className="max-w-screen-xl mx-auto px-3 pb-10">
            {children}
        </div>
    );
}
