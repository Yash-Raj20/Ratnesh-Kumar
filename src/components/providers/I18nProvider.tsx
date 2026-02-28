'use client';

import { ReactNode, useEffect, useState } from 'react';
import '@/i18n/i18n';
import { useTranslation } from 'react-i18next';

export function I18nProvider({ children }: { children: ReactNode }) {
    const { i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Force sync the html lang attribute
        if (i18n.language) {
            document.documentElement.lang = i18n.language;
        }
    }, [i18n.language]);

    // Prevent hydration mismatch if needed, though i18next handles it fairly well
    if (!mounted) {
        return <>{children}</>;
    }

    return <>{children}</>;
}
