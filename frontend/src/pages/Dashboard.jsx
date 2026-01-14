import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import BidCard from "../components/BidCard";
import { socket } from "../socket/socket";

export default function Dashboard() {
  const { user } = useAuth();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hiringBidId, setHiringBidId] = useState(null);

  const fetchBids = async () => {
    try {
      setLoading(true);

      // 1️⃣ Get gigs owned by this user
      const { data: gigs } = await api.get("/gigs");
      const userGigs = gigs.filter(g => g.ownerId === user._id);

      // 2️⃣ Fetch bids for each gig
      let allBids = [];
      for (let gig of userGigs) {
        const { data: gigBids } = await api.get(`/bids/${gig._id}`);
        allBids = [...allBids, ...gigBids];
      }

      setBids(allBids);
    } catch (err) {
      console.error("Failed to fetch bids", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();

    socket.on("hired", (data) => {
      alert(`You have been hired for ${data.gigTitle}`);
    });

    return () => socket.off("hired");
  }, [user._id]);

  const handleHire = async (bidId) => {
    try {
      setHiringBidId(bidId);
      await api.patch(`/bids/${bidId}/hire`);
      alert("Freelancer hired successfully!");
      await fetchBids(); // 🔄 REFRESH FROM DB
    } catch (err) {
      console.error(err);
      alert("Failed to hire freelancer");
    } finally {
      setHiringBidId(null);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="px-6 pt-32 mx-auto max-w-5xl">

        
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        
        {loading && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Loading bids...
          </div>
        )}

        
        {!loading && bids.length === 0 && (
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-gray-500 dark:text-gray-400">
            No bids yet
          </div>
        )}

        
        <div className="space-y-6">
          {bids.map(bid => (
            <div
              key={bid._id}
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow"
            >
              <BidCard
                bid={bid}
                onHire={handleHire}
                loading={hiringBidId === bid._id}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

