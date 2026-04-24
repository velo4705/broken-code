export default function CancelPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-red-500">Payment Cancelled</h1>
            <p className="mt-4">No worries! Your cart is still waiting for you.</p>
            <a href="/" className="mt-8 bg-black text-white px-6 py-2 rounded">Back to Shop</a>
        </div>
    )
}