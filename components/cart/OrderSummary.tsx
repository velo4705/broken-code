export default function OrderSummary() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <h3 className="font-bold text-lg mb-4">Order Summary</h3>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between"><span>Subtotal</span><span>$99.99</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>$5.00</span></div>
        <div className="flex justify-between"><span>Tax</span><span>$8.00</span></div>
      </div>
      <div className="border-t pt-4 font-bold text-xl flex justify-between">
        <span>Total</span><span>$112.99</span>
      </div>
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  );
}