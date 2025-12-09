import React from 'react';
import * as LucideIcons from 'lucide-react';

export const getIcon = (iconName: string, className: string = "h-8 w-8"): React.ReactElement => {
  const IconComponent = (LucideIcons as any)[iconName];
  if (!IconComponent) {
    // Default icon if not found
    const Code = LucideIcons.Code;
    return <Code className={className} />;
  }
  return <IconComponent className={className} />;
};

