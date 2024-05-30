import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import MainLayout from "../../components/MainLayout";
import { getUserProfile, updateProfile } from "../../services/index/users";
import ProfilePicture from "../../components/ProfilePicture";
import { userActions } from "../../store/reducers/userReducers";
import { toast } from "react-hot-toast";
import { useMemo } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [status, setStatus] = useState(
    userState?.userInfo?.online ? true : false
  );

  console.log("userState", userState);

  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password, online: status },
        userId: userState.userInfo._id,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setStatus(data?.online);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile is updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: useMemo(() => {
      return {
        name: profileIsLoading ? "" : profileData.name,
        email: profileIsLoading ? "" : profileData.email,
      };
    }, [profileData?.email, profileData?.name, profileIsLoading]),
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  console.log("profileData", profileData);

  return (
    <MainLayout>
      <section className="container mx-auto rounded-lg py-10  pb-4 ">
        <div
          style={{ position: "relative" }}
          className="align-center flex flex-col justify-center shadow-xl"
        >
          {userState.userInfo?.doctor && (
            <div style={{ position: "absolute", top: 10, right: 30 }}>
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  id="online"
                  name="status"
                  value={true}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="online">Online</label>
                <input
                  type="radio"
                  id="offline"
                  name="status"
                  value={false}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="offline">Offline</label>
              </div>
            </div>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ProfilePicture avatar={profileData?.avatar} />
          </div>
          <div className="mx-auto">
            <form onSubmit={handleSubmit(submitHandler)}>
              <div
                style={{
                  width: "70vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                <div className="mb-6 flex w-full flex-col">
                  <label
                    htmlFor="name"
                    className="block font-semibold text-[#5a7184]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", {
                      minLength: {
                        value: 1,
                        message: "Name length must be at least 1 character",
                      },
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    })}
                    placeholder="Enter name"
                    className={`width-full mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                      errors.name ? "border-red-500" : "border-[#c3cad9]"
                    }`}
                  />
                  {errors.name?.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name?.message}
                    </p>
                  )}
                </div>
                <div className="mb-6 flex w-full flex-col">
                  <label
                    htmlFor="email"
                    className="block font-semibold text-[#5a7184]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Enter a valid email",
                      },
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                    })}
                    placeholder="Enter email"
                    className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                      errors.email ? "border-red-500" : "border-[#c3cad9]"
                    }`}
                  />
                  {errors.email?.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
              </div>

              <div
                style={{
                  width: "70vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                <div className="mb-6 flex w-full flex-col">
                  <label
                    htmlFor="password"
                    className="block font-semibold text-[#5a7184]"
                  >
                    New Password (optional)
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    placeholder="Enter new password"
                    className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                      errors.password ? "border-red-500" : "border-[#c3cad9]"
                    }`}
                  />
                  {errors.password?.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password?.message}
                    </p>
                  )}
                </div>{" "}
                <div className="mb-6 flex w-full flex-col">
                  <label
                    htmlFor="password"
                    className="block font-semibold text-[#5a7184]"
                  >
                    Role
                  </label>
                  <input
                    id="nn"
                    className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead]`}
                    placeholder={
                      profileData?.admin
                        ? "admin"
                        : profileData?.manager
                        ? "manager"
                        : profileData?.doctor
                        ? "doctor"
                        : "user"
                    }
                    disabled
                    value={null}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  !isValid || profileIsLoading || updateProfileIsLoading
                }
                className="mb-6 w-full rounded-lg bg-primary py-4 px-8 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
