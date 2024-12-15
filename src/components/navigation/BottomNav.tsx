import React from 'react';
import { Tabs, Tab } from "@nextui-org/react";
import { Calculator, Users, Search } from 'lucide-react';
import { NavigationTab } from '../../types/navigation';

interface BottomNavProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/70 backdrop-blur-md border-t border-divider">
      <Tabs 
        fullWidth
        selectedKey={activeTab}
        radius="none"
        onSelectionChange={(key) => onTabChange(key as NavigationTab)}
        variant="light"
        color="primary"
        classNames={{
          tabList: "gap-4 w-full justify-center p-0",
          tab: "h-16 px-0",
          tabContent: "group-data-[selected=true]:text-white",
        }}
      >
        <Tab
          key="counter"
          title={
            <div className="flex flex-col items-center gap-1">
              <Calculator className="w-5 h-5" />
              <span className="text-xs">Contador</span>
            </div>
          }
        />
        <Tab
          key="memberships"
          title={
            <div className="flex flex-col items-center gap-1">
              <Users className="w-5 h-5" />
              <span className="text-xs">Membresías</span>
            </div>
          }
        />
        <Tab
          key="search"
          title={
            <div className="flex flex-col items-center gap-1">
              <Search className="w-5 h-5" />
              <span className="text-xs">Búsqueda</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};