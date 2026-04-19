// Map Tailwind bg classes from API to light pastel hex shades
export const tailwindColorMap: Record<string, string> = {
    'bg-red-500': '#fee2e2',
    'bg-orange-500': '#ffedd5',
    'bg-amber-500': '#fef3c7',
    'bg-yellow-500': '#fef9c3',
    'bg-lime-500': '#ecfccb',
    'bg-green-500': '#dcfce7',
    'bg-emerald-500': '#d1fae5',
    'bg-teal-500': '#ccfbf1',
    'bg-cyan-500': '#cffafe',
    'bg-sky-500': '#e0f2fe',
    'bg-blue-500': '#dbeafe',
    'bg-indigo-500': '#e0e7ff',
    'bg-violet-500': '#ede9fe',
    'bg-purple-500': '#f3e8ff',
    'bg-fuchsia-500': '#fae8ff',
    'bg-pink-500': '#fce7f3',
    'bg-rose-500': '#ffe4e6',
    'bg-slate-100': '#f1f5f9',
};

export const getColorHex = (color: string): string => {
    return tailwindColorMap[color] || '#f1f5f9';
};
