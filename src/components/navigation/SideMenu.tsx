import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '../../types/navigation';
import { Home, BarChart2, Users, Package, Settings, Info } from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (key: string) => void;
}

const menuItems: MenuItem[] = [
  { key: 'home', label: 'Inicio', icon: <Home className="w-5 h-5" /> },
  { key: 'sales', label: 'Ventas', icon: <BarChart2 className="w-5 h-5" /> },
  { key: 'horario', label: 'Horario', icon: <Users className="w-5 h-5" /> },
  { key: 'inventory', label: 'Registro de caja', icon: <Package className="w-5 h-5" /> },
  { key: 'about', label: 'Acerca de', icon: <Info className="w-5 h-5" /> },
  { key: 'settings', label: 'Configuración', icon: <Settings className="w-5 h-5" /> },
];

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onItemClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50"
          />
          
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-[280px] bg-background z-50 border-r border-divider"
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-divider">
                <h2 className="text-lg font-semibold">Menú</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="py-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-default-100 transition-colors"
                      onClick={() => onItemClick(item.key)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};