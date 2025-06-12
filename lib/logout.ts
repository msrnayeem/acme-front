import axios from "axios";
import { toast } from "sonner";

export const handleLogout = () => {
  try {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        // console.log("Logout successful:", response.data);
        toast.success(response.data.message);
        window.location.href = "/sign-in";
      });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
