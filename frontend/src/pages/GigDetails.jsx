import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import BidCard from "../components/BidCard";
import { useAuth } from "../context/AuthContext";

export default function GigDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  // Fetch gig details
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const { data: gigs } = await api.get("/gigs");
        const foundGig = gigs.find(g => g._id === id);
        setGig(foundGig);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGig();
  }, [id]);

  // Fetch bids
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const { data } = await api.get(`/bids/${id}`);
        setBids(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBids();
  }, [id]);

  const handleBid = async () => {
    if (!message || !price) return alert("Fill all fields");
    try {
      await api.post("/bids", { gigId: id, message, price });
      alert("Bid placed successfully!");
      setMessage("");
      setPrice("");
      // Refresh bids
      const { data } = await api.get(`/bids/${id}`);
      setBids(data);
    } catch (err) {
      console.error(err);
      alert("Failed to place bid");
    }
  };

  const hireBid = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      alert("Freelancer hired successfully!");
      // Update bids locally
      setBids(bids.map(b => b._id === bidId ? { ...b, status: "hired" } : { ...b, status: "rejected" }));
    } catch (err) {
      alert("Failed to hire freelancer");
    }
  };

  if (!gig) return <div className="p-6">Loading...</div>;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="px-6 pt-32 mx-auto max-w-5xl space-y-8">

        {/* Gig Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{gig.title}</h1>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{gig.description}</p>
          <p className="mt-2 font-bold text-indigo-600 dark:text-indigo-400">Budget: ₹{gig.budget}</p>
        </div>

        {/* Place Bid Form (only for freelancers, not gig owner) */}
        {user && user._id !== gig.ownerId && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Place a Bid</h2>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Your message"
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="Your bid amount"
              className="border p-2 w-full mb-2 rounded"
            />
            <button
              onClick={handleBid}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Place Bid
            </button>
          </div>
        )}

        {/* Bids List (for owner only) */}
        {user && user._id === gig.ownerId && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Bids for this Gig</h2>
            {bids.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                No bids have been placed yet.
              </div>
            )}
            {bids.map((bid) => (
              <div
                key={bid._id}
                className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700"
              >
                <BidCard bid={bid} onHire={hireBid} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
