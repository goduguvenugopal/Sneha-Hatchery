// Listen for push events
self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json(); // Extract payload sent from server
  const options = {
    body: data.body,                  // Notification body text
    icon: data.icon || "/favicon.jpeg", // Optional icon
    badge: data.badge || "/favicon.jpeg", // Optional badge
    data: data.url || "/",            // URL to open on click
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  // Open the URL in a new tab or focus if already open
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === event.notification.data && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data);
      }
    })
  );
});
