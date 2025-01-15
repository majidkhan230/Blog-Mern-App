import React from "react";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { routes } from "./routes";

const renderRoutes = (routes) =>
  routes.map(({ element, path, children }, index) => (
    <Route key={index} path={path} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ));

function App() {
  return (
    <>
    <Routes>{renderRoutes(routes)}</Routes>
    
      {/* <Routes>
        {routes.map(({ element, path, children }, index) => (
          <Route key={index} path={path} element={element}>
          {children &&
          children.map((child, childIndex) => (
            <Route
            key={childIndex}
            path={child.path}
            element={child.element}
            />
            ))}
            </Route>
            ))}
            </Routes> */}
            </>
  );
}

export default App;
