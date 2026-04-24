export default function SuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-green-500">Payment Successful! 🎉</h1>
            <p className="mt-4">Thank you for your purchase. Your order is being processed.</p>
            <a href="/" className="mt-8 bg-black text-white px-6 py-2 rounded">Return Home</a>
        </div>
    )
}