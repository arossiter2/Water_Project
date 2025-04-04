import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalAmount = cart.reduce((sum, item) => sum + item.donationAmount, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "#F8F9FA",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        fontSize: "16px",
      }}
      onClick={() => navigate("/cart")}
    >
      🛒 <strong style={{ marginLeft: "5px" }}>${totalAmount.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;
