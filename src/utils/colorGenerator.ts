// Avtomatik rang tanlash funksiyasi
export const generateColor = (index: number = 0): string => {
  const colors = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-red-400 to-red-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-cyan-400 to-cyan-600',
    'from-teal-400 to-teal-600',
    'from-orange-400 to-orange-600',
  ];
  
  return colors[index % colors.length];
};

// Icon nomiga asoslangan rang tanlash
export const getColorByIcon = (iconName: string): string => {
  const iconColorMap: { [key: string]: string } = {
    'Code': 'from-blue-400 to-blue-600',
    'Globe': 'from-green-400 to-green-600',
    'Database': 'from-purple-400 to-purple-600',
    'Smartphone': 'from-pink-400 to-pink-600',
    'Monitor': 'from-cyan-400 to-cyan-600',
    'Server': 'from-indigo-400 to-indigo-600',
    'Cloud': 'from-teal-400 to-teal-600',
    'Shield': 'from-red-400 to-red-600',
    'Zap': 'from-yellow-400 to-yellow-600',
    'Rocket': 'from-orange-400 to-orange-600',
  };
  
  return iconColorMap[iconName] || generateColor(Math.floor(Math.random() * 10));
};

