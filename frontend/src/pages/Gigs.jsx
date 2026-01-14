import { useEffect } from "react";
import { useGigs } from "../context/GigContext";
import GigCard from "../components/GigCard";

export default function Gigs() {
  const { gigs, fetchGigs } = useGigs();

  useEffect(() => {
    fetchGigs();
  }, [fetchGigs]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="px-6 pt-32 mx-auto max-w-7xl">

        {/* Page Title */}
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Available Gigs
        </h1>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {gigs.map((gig) => (
            <div
              key={gig._id}
              className="bg-white rounded-lg shadow dark:bg-gray-800 h-full"
            >
              {/* Force equal height */}
              <div className="h-full flex flex-col">
                <GigCard gig={gig} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

