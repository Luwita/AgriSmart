// This service would integrate with a real notification system in production
// For now, we'll use mock functionality

// Store notifications in memory
const notifications = [];

export const createNotification = (userId, notification) => {
  const newNotification = {
    id: Date.now().toString(),
    userId,
    ...notification,
    read: false,
    createdAt: new Date()
  };
  
  notifications.push(newNotification);
  return newNotification;
};

export const getUserNotifications = (userId) => {
  return notifications.filter(n => n.userId === userId);
};

export const markNotificationAsRead = (notificationId) => {
  const index = notifications.findIndex(n => n.id === notificationId);
  if (index !== -1) {
    notifications[index].read = true;
    return notifications[index];
  }
  return null;
};

export const deleteNotification = (notificationId) => {
  const index = notifications.findIndex(n => n.id === notificationId);
  if (index !== -1) {
    notifications.splice(index, 1);
    return true;
  }
  return false;
};

export const sendWeatherAlert = (userId, alert) => {
  return createNotification(userId, {
    type: 'weather',
    title: alert.title,
    message: alert.message,
    severity: alert.severity,
    link: '/weather'
  });
};

export const sendMarketAlert = (userId, alert) => {
  return createNotification(userId, {
    type: 'market',
    title: alert.title,
    message: alert.message,
    severity: alert.severity,
    link: '/market'
  });
};

export const sendCropAlert = (userId, alert) => {
  return createNotification(userId, {
    type: 'crop',
    title: alert.title,
    message: alert.message,
    severity: alert.severity,
    link: `/crops/${alert.cropId}`
  });
};

export const sendSystemNotification = (userId, notification) => {
  return createNotification(userId, {
    type: 'system',
    title: notification.title,
    message: notification.message,
    severity: notification.severity,
    link: notification.link
  });
};