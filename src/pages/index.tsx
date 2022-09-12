import { lazy, Suspense } from "react";

import dynamic from "next/dynamic";
import type { NextPage } from "next";

const Countries = lazy(() => import("../components/countires"));

const Home: NextPage = () => {
  return (
    <>
      <div>here</div>
      <Suspense fallback={<div>loading</div>}>
        <Countries />;
      </Suspense>
    </>
  );
};

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
