export default function SearchInput() {
  return (
    <div className="relative">
      <input 
        type="text" 
        placeholder="Search products..." 
        className="border rounded-full py-2 px-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="absolute right-3 top-2.5 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>
    </div>
  );
}