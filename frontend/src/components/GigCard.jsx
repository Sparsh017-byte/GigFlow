import { Link } from "react-router-dom";

export default function GigCard({ gig }) {
  return (
    <div className="p-5 h-full flex flex-col">
      
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
        {gig.title}
      </h2>

      {/* Description (clamped) */}
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {gig.description}
      </p>

      {/* Budget */}
      <div className="mt-4 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
        ₹{gig.budget}
      </div>

      {/* CTA */}
      <div className="mt-auto pt-4">
        <Link
          to={`/gigs/${gig._id}`}
          className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
