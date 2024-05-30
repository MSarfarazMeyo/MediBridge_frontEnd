import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import HeaderManager from "../components/header/HeaderManager";
import { getUserProfile } from "../../../services/index/users";

const ManagerLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.manager) {
        navigate("/");
        toast.error("Your are not allowed to access admin panel");
      }
    },
    onError: (err) => {
      console.log(err);
      navigate("/");
      toast.error("Your are not allowed to access admin panel");
    },
  });

  if (profileIsLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h3 className="text-2xl text-slate-700">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <HeaderManager />
      <main className="flex-1 bg-[#F9F9F9] p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerLayout;
