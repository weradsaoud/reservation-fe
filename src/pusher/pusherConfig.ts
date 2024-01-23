import Pusher from "pusher-js";
import { events } from "./pusherEvents";

const pusher = new Pusher("39eebe5a77c510fba350", {
  cluster: "eu",
});

export const subscribeToPusher = (uId: string) => {
  const channel = pusher.subscribe(uId);
  events.forEach((event) => {
    channel.bind(event, function (data: any) {
      alert(data.message);
    });
  });
};

export const unSubscribeFromChannel = (uId: string) => {
    pusher.unsubscribe(uId);
}
