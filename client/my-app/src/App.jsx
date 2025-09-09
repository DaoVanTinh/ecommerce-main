import { useState } from "react";
import AppRouters from "./routers";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container">
      <AppRouters />
      <Toaster />
    </div>
  );
}

export default App;
