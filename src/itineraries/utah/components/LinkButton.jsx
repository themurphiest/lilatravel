import React from 'react';
import { ExternalLink } from 'lucide-react';

const LinkButton = ({ href, children, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-sky-blue hover:bg-[#5595EE] text-white',
    secondary: 'bg-ocean-teal hover:bg-[#339E98] text-white',
    success: 'bg-sea-glass hover:bg-[#97CFC0] text-gray-800',
    super: 'bg-sun-salmon hover:bg-[#EE6D5A] text-white',
    outline: 'bg-white hover:bg-coral-blush text-sky-blue border-2 border-sky-blue'
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md ${variants[variant]}`}
    >
      {children}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
};

export default LinkButton;
