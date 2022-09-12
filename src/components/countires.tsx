import React from "react";

import { trpc } from "../utils/trpc";

function Countries() {
  const { data } = trpc.useQuery(["countries.all"], { suspense: true });

  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");

  if (!data) {
    return null;
  }

  return (
    <div>
      <h2>Hello</h2>
      <ul>
        {data.map((country: any) => {
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
    </div>
  );
}

export default Countries;
