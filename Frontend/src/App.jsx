import React from "react";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { routes } from "./routes";

function App() {
  return (
    <>
      {/* <Routes>
      <Route path='/' element={<Layout/>}>
    </Route>
    </Routes> */}
      <Routes>
        {routes.map(({ element, path }, index) => {
         return <Route key={index} path={path} element={element}></Route>;
        })}
      </Routes>
    </>
  );
}

export default App;
