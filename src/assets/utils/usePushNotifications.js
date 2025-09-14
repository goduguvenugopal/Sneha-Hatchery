import { useState, useEffect, useContext, useCallback } from "react";
import { EmployeeContext, EnvContext } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

export const usePushNotifications = () => {
  const [subscription, setSubscription] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { base_api_url, public_vapid_key } = useContext(EnvContext);
  const { token, employeeData } = useContext(EmployeeContext);

  const subscribeUser = useCallback(async () => {
    try {
      // 1. Check if notifications are supported
      if (
        !("Notification" in window) ||
        !("serviceWorker" in navigator) ||
        !("PushManager" in window)
      ) {
        toast.error("Push notifications are not supported in this browser");
        return;
      }

      // 2. Check notification permission
      if (Notification.permission === "denied") {
        toast.error(
          "You have blocked notifications. Please enable them in browser settings."
        );
        return;
      }

      if (Notification.permission === "default") {
        // Ask for permission
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          toast.error("Notifications permission not granted");
          return;
        }
      }

      // 3. Check if already subscribed
      const reg = await navigator.serviceWorker.ready;
      const existingSub = await reg.pushManager.getSubscription();

      if (existingSub) {
        // ✅ Already subscribed → just update state, no API call
        setSubscription(existingSub);
        setIsSubscribed(true);
        return;
      }

      // 4. If not subscribed, create new subscription
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(public_vapid_key),
      });
      setSubscription(sub);

      // 5. Send subscription to server
      const res = await axios.post(
        `${base_api_url}/api/subscribe`,
        { employeeCode: employeeData?.employeeCode, subscription: sub },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        setIsSubscribed(true);
        toast.success("Notification Enabled");
      }
    } catch (err) {
      console.error("Subscription failed:", err);
      toast.error("Subscription failed");
    }
  }, [employeeData?.employeeCode, token]);

  // turn off notification
  const unsubscribeUser = useCallback(async () => {
    try {
    
      const reg = await navigator.serviceWorker.ready;
      const existingSub = await reg.pushManager.getSubscription();

      if (existingSub) {
        // Unsubscribe from push
        const isUnsubscribed = await existingSub.unsubscribe();

        if (isUnsubscribed) {
          // Remove subscription from server
          const res = await axios.delete(
            `${base_api_url}/api/unsubscribe`,
            {
              employeeCode: employeeData?.employeeCode,
              endpoint: existingSub.endpoint,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res) {
            setIsSubscribed(false);
            setSubscription(null); // ✅ clear local state too
            toast.success("Notifications disabled");
          }
        }
      } else {
        toast.info("You were not on notification");
      }
    } catch (err) {
      console.error("Unsubscription failed:", err);
      toast.error("Please try again");
    }
  },[employeeData?.employeeCode, token])

  return { subscribeUser, unsubscribeUser, isSubscribed , subscription };
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}
