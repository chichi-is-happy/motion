import React, { useState } from "react";
import Header from "../components/Header";
import Document from "../components/Document";
import Footer from "../components/Footer";
function Main() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <Header />
        <Document />
        <Footer />
      </div>
    </>
  );
}

export default Main;
