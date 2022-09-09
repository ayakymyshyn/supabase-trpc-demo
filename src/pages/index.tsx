import { useState } from "react";
import type { NextPage } from "next";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const utils = trpc.useContext();
  const { data, isLoading: isGettingData } = trpc.useQuery(["countries.all"]);
  const { mutate: createCountry, isLoading: isAdding } = trpc.useMutation(
    ["countries.add"],
    { onSuccess: () => utils.invalidateQueries(["countries.all"]) }
  );

  const isLoading = isGettingData || isAdding;

  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div>
      <h2>Hello</h2>
      <ul>
        {data?.map((country) => {
          return (
            <li key={country.id}>
              Name: {country.name}, code: {country.code}
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        onChange={(e) => setCode(e.target.value)}
        placeholder="Code"
      />
      <button
        onClick={() => createCountry({ name, code })}
        disabled={name === "" || code === ""}
      >
        Add country
      </button>
    </div>
  );
};

export default Home;
