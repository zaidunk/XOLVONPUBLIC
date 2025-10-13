import Navigation from '@/components/navigation';
import React from 'react';

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Navigation />
            {children}
        </section>
    );
}
