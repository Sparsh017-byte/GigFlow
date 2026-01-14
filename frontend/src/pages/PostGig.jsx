import { useState } from "react";
import { useGigs } from "../context/GigContext";

export default function PostGig() {
  const { createGig } = useGigs();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: ""
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createGig(form);
      alert("Gig posted successfully");
    } catch (err) {
      alert("Failed to post gig");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 pt-22 mx-auto md:h-screen">
        
        

        
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Post a New Gig
            </h1>

            <form onSubmit={submitHandler} className="space-y-4">
              
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Gig Title
                </label>
                <input
                  type="text"
                  placeholder="Build a MERN application"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  required
                />
              </div>

              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe the gig requirements..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                />
              </div>

              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Budget (₹)
                </label>
                <input
                  type="number"
                  placeholder="5000"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={form.budget}
                  onChange={(e) =>
                    setForm({ ...form, budget: e.target.value })
                  }
                  required
                />
              </div>

              
              <button
                type="submit"
                className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Post Gig
              </button>

            </form>

          </div>
        </div>
      </div>
    </section>
  );
}

