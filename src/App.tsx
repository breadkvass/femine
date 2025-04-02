import {
  createRoutesFromElements,
  createBrowserRouter,
  Route
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<></>} />
    </Route>
  )
);

export default router;