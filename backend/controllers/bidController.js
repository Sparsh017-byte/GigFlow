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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    const gig = await Gig.findById(bid.gigId).session(session);

    if (gig.status === "assigned")
      throw new Error("Gig already assigned");

    await Bid.updateMany(
      { gigId: gig._id },
      { status: "rejected" },
      { session }
    );

    bid.status = "hired";
    await bid.save({ session });

    gig.status = "assigned";
    await gig.save({ session });

    await session.commitTransaction();

    getIO().to(bid.freelancerId.toString())
      .emit("hired", { gigTitle: gig.title });

    res.json({ message: "Freelancer hired successfully" });

  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};
