import Home from "./HomePage/Home";
import User from "./UserPage/User";
import ContextProvider from "./Context/ContextProvider";
import ErrorHandler from "./ErrorHandler";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorHandler />,
    },
    {
      path: "/user/:userId",
      element: <User />,
      errorElement: <ErrorHandler />,
    },
  ]);
  return (
    <div>
      <ContextProvider>
        <RouterProvider router={appRouter}></RouterProvider>
      </ContextProvider>
    </div>
  );
}

export default App;
