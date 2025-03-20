import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton() {
  const handlePayment = async () => {
    const stripe = await stripePromise;
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`);
    window.location.href = data.url;
  };

  return (
    <button onClick={handlePayment} style={{ padding: "10px", background: "blue", color: "white" }}>
      🚀 Buy Access – $XX
    </button>
  );
}
