import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  //   console.log(req.body);
  //   const { id } = req.body;
  await pusher.trigger("order", "new-order", req.body);

  res.json({ message: "completed" });
}
