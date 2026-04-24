export default function FilterSidebar() {
  return (
    <div className="w-full md:w-64 p-4 border-r">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Category</h4>
        {/* Category filters */}
      </div>
      <div>
        <h4 className="font-semibold mb-2">Price</h4>
        {/* Price filters */}
      </div>
    </div>
  );
}