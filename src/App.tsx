import React, { useState } from "react";
import { getRepos } from "./api";
import RepoItem from "./components/RepoItem";

const App = () => {
  const [itemsData, setItemsData] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username !== "") {
      setLoading(true);
      setError("");
      try {
        const data = await getRepos(username);
        if (data.message === "Not Found") {
          setError("User not found.");
          return;
        }
        if (Array.isArray(data) && data.length === 0) {
          setError("User does not have public repos.");
          return;
        }
        // console.log(data);
        setItemsData(data);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter an username.");
    }
  };

  return (
    <div className="container px-8 py-16 mx-auto md:px-24 lg:px-32 xl:px-64">
      <form action="submit" onSubmit={(e) => handleSearch(e)}>
        <div className="relative">
          <label htmlFor="username" className="sr-only">
            username
          </label>
          <input
            id="username"
            type="text"
            className="w-full py-2 pl-3 pr-10 transition-colors border-2 border-gray-200 rounded hover:border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="Input Github user.."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {error && <p className="mt-1 text-red-600">{error}</p>}

        <div className="flex flex-row items-center justify-between mt-6">
          <button className="px-8 py-2 font-bold text-center text-indigo-500 border-2 border-indigo-500 rounded cursor-pointer justify-self-end hover:bg-indigo-500 hover:text-gray-100 focus:outline-none">
            View
          </button>

          {loading && (
            <div
              style={{
                borderTopColor: "transparent",
              }}
              className="w-10 h-10 border-4 border-indigo-500 border-solid rounded-full animate-spin"
            />
          )}
        </div>
      </form>

      <div className="mt-12 space-y-8">
        {itemsData.map((item) => (
          <RepoItem
            key={item.id}
            name={item.name}
            link={item.html_url}
            description={item.description}
            language={item.language}
            stars={item.stargazers_count}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
