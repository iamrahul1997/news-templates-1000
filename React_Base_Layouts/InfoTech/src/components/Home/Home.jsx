import React from "react";
import Section_1 from "../Section_1/Section_1";
import Section_2 from "../Section_2/Section_2";
import Section_3 from "../Section_3/Section_3";

import "../css/home.css";
import "../css/common.css";

export default function Home() {
  return (
    <>
      <Section_1 />
      <div class="container">
        <Section_2 />
        <Section_3 />
      </div>
    </>
  );
}
