export default function CartItem() {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded"></div>
        <div>
          <h4 className="font-semibold">Product Name</h4>
          <p className="text-gray-600">$99.99</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input type="number" min="1" defaultValue="1" className="w-16 border rounded p-1 text-center" />
        <button className="text-red-500 hover:text-red-700">Remove</button>
      </div>
    </div>
  );
}