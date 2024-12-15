import React from 'react';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import {
  Menu,
  Bell,
  LogOut,
  Settings,
  User,
  HelpCircle,
} from 'lucide-react';
import { MenuItem } from '../../types/navigation';

interface TopNavProps {
  onMenuClick: () => void;
}

const notifications = [
  { id: 1, title: 'Nueva venta realizada', time: 'Hace 5 minutos' },
  { id: 2, title: 'Membresía renovada', time: 'Hace 1 hora' },
  { id: 3, title: 'Actualización del sistema', time: 'Hace 2 horas' },
];

const userMenuItems: MenuItem[] = [
  { key: 'profile', label: 'Perfil', icon: <User className="w-4 h-4" /> },
  { key: 'settings', label: 'Configuración', icon: <Settings className="w-4 h-4" /> },
  { key: 'help', label: 'Ayuda', icon: <HelpCircle className="w-4 h-4" /> },
  { key: 'logout', label: 'Cerrar Sesión', icon: <LogOut className="w-4 h-4" /> },
];

export const TopNav: React.FC<TopNavProps> = ({ onMenuClick }) => {
  return (
    <Navbar isBordered maxWidth="full">
      <NavbarContent justify="start">
        <Button
          isIconOnly
          variant="light"
          onPress={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem>
          <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
              <Button
                isIconOnly
                variant="light"
                radius="none"
              >
                <Badge content="3" color="danger">
                  <Bell className="w-6 h-6" />
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="px-1 py-2">
                <p className="text-small font-bold text-foreground pb-2">
                  Notificaciones
                </p>
                <div className="divide-y divide-default-300">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="py-2 cursor-pointer hover:bg-default-100 transition-colors"
                    >
                      <p className="text-small font-semibold">
                        {notification.title}
                      </p>
                      <p className="text-tiny text-default-500">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>

        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name="JD"
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" items={userMenuItems}>
              {(item) => (
                <DropdownItem
                  key={item.key}
                  startContent={item.icon}
                  color={item.key === 'logout' ? 'danger' : 'default'}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};