import {
  createRoutesFromElements,
  createBrowserRouter,
  Route
} from "react-router-dom";
import EventsPage from "./pages/events/EventsPage";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import AdminPage from "./pages/adminPage/AdminPage";
import ProfilePage from "./pages/profilePage/ProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/contacts" element={<HomePage />} />
      <Route path="/superwomen" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      {/* <Route path="/community" element={< />} /> */}
      <Route path="/community/profile" element={<ProfilePage />} />
      <Route path="/community/admin" element={<AdminPage />} />
    </Route>
  )
);

export default router;