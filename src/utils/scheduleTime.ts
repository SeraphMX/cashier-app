export const adjustEndTime = (startTime: string): string => {
  const [hours, minutes] = startTime.split(':').map(Number);
  
  // Add 9 hours to start time
  let endHours = hours + 9;
  
  // If end time is after 23:00, set it to 23:00
  if (endHours >= 23) {
    return '23:00';
  }
  
  return `${String(endHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  return `${hours}:${minutes}`;
};