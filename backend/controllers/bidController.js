import mongoose from "mongoose";
import Bid from "../models/bid.js";
import Gig from "../models/gig.js";
import { getIO } from "../socket/socket.js";

export const placeBid = async (req, res) => {
  const bid = await Bid.create({
    ...req.body,
    freelancerId: req.user._id
  });
  res.status(201).json(bid);
};

export const getBidsByGig = async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
};

export const hireBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.status === "assigned") {
      return res.status(400).json({ message: "Gig already assigned" });
    }

    // 1️⃣ Hire selected bid
    await Bid.findByIdAndUpdate(bid._id, { status: "hired" });

    // 2️⃣ Reject ONLY bids of SAME gig
    await Bid.updateMany(
      {
        gigId: bid.gigId,
        _id: { $ne: bid._id }
      },
      { status: "rejected" }
    );

    // 3️⃣ Assign gig
    gig.status = "assigned";
    await gig.save();

    // 4️⃣ Notify freelancer
    getIO()
      .to(bid.freelancerId.toString())
      .emit("hired", { gigTitle: gig.title });

    res.json({ message: "Freelancer hired successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to hire freelancer" });
  }
};
