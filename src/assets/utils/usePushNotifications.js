 import { useState, useEffect } from "react";

const PUBLIC_VAPID_KEY = "<YOUR_PUBLIC_VAPID_KEY>";

export const usePushNotifications = () => {
  const [subscription, setSubscription] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);


  const subscribeUser = async () => {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
      });
      setSubscription(sub);
      setIsSubscribed(true);

      // Send subscription to your server
      await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify(sub),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Subscription failed:", err);
    }
  };

  const unsubscribeUser = async () => {
    try {
      if (!subscription) return;
      const reg = await navigator.serviceWorker.ready;
      const existingSub = await reg.pushManager.getSubscription();
      if (existingSub) {
        await existingSub.unsubscribe();
        setIsSubscribed(false);

        // Remove subscription from server
        await fetch("/api/unsubscribe", {
          method: "POST",
          body: JSON.stringify({ endpoint: existingSub.endpoint }),
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (err) {
      console.error("Unsubscription failed:", err);
    }
  };

  return { subscribeUser, unsubscribeUser, isSubscribed };
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}
