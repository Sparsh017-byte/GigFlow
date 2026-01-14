import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const GigContext = createContext();

export const GigProvider = ({ children }) => {
  const [gigs, setGigs] = useState([]);

  const fetchGigs = async (search = "") => {
    const { data } = await api.get(`/gigs?search=${search}`);
    setGigs(data);
  };

  const createGig = async (gig) => {
    await api.post("/gigs", gig);
    fetchGigs();
  };

  return (
    <GigContext.Provider value={{ gigs, fetchGigs, createGig }}>
      {children}
    </GigContext.Provider>
  );
};

export const useGigs = () => useContext(GigContext);
