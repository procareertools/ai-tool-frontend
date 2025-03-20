import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton() {
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        priceId: import.meta.env.VITE_STRIPE_PRICE_ID, // Pass correct price ID
      });

      window.location.href = data.url; // Redirect to Stripe checkout
    } catch (error) {
      console.error("❌ Error starting checkout:", error);
      alert("⚠️ Payment could not be processed. Please try again.");
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      style={{ padding: "10px", background: "blue", color: "white", borderRadius: "5px" }}
    >
      🚀 Buy Access – $29.99
    </button>
  );
}
