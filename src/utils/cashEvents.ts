export const getEventDescription = (type: string): string => {
  switch (type) {
    case 'initial':
      return 'Fondo Inicial';
    case 'withdrawal':
      return 'Retiro';
    case 'withdrawal-fund':
      return 'Retiro de Fondo';
    case 'shortage':
      return 'Faltante';
    case 'surplus':
      return 'Sobrante';
    case 'deposit':
      return 'Dotación';
    default:
      return 'Evento';
  }
};

export const getEventColor = (type: string) => {
  switch (type) {
    case 'initial':
      return 'success';
    case 'withdrawal':
    case 'withdrawal-fund':
    case 'shortage':
      return 'danger';
    case 'surplus':
      return 'primary';
    case 'deposit':
      return 'warning';
    default:
      return 'default';
  }
};