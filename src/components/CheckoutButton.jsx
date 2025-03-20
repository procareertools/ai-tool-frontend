import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton() {
  const [price, setPrice] = useState("..."); // Default loading state

  useEffect(() => {
    async function fetchPrice() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/stripe-price`);
        setPrice(response.data.amount); // Display correct price
      } catch (error) {
        console.error("❌ Error fetching Stripe price:", error);
        setPrice("Error");
      }
    }
    fetchPrice();
  }, []);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
      });
      window.location.href = data.url;
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
      🚀 Buy Access – ${price}
    </button>
  );
}
