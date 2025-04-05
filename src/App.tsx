import {
  createRoutesFromElements,
  createBrowserRouter,
  Route
} from "react-router-dom";
import EventsPage from "./pages/events/EventsPage";
import HomePage from "./pages/home/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<></>} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/contacts" element={<></>} />
      <Route path="/superwomen" element={<></>} />
    </Route>
  )
);

export default router;