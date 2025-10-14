import React from 'react';

export default function HelpLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            {children}
        </section>
    );
}
