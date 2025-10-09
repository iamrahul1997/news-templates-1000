import React from "react";
import Section_1 from "../Section_1/Section_1";
import Section_2 from "../Section_2/Section_2";
import Section_3 from "../Section_3/Section_3";
import Section_4 from "../Section_4/Section_4";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
      <Section_1 />
      <Section_2 />
      <Section_3 />
      <Section_4 />
    </main>
  );
}
