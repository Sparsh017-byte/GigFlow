export default function BidCard({ bid, onHire, loading }) {
  return (
    <div className="p-5">
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        {bid.message}
      </p>

      <p className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
        ₹{bid.price}
      </p>

      {bid.status === "pending" && (
        <button
          onClick={() => onHire(bid._id)}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Hiring..." : "Hire"}
        </button>
      )}

      {bid.status !== "pending" && (
        <p className={`mt-2 font-medium ${
          bid.status === "hired" ? "text-green-600" : "text-red-500"
        }`}>
          Status: {bid.status}
        </p>
      )}
    </div>
  );
}

