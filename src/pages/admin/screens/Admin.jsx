import React, { useContext, useEffect, useState } from "react";
import Sun from "../../../assets/sun.png";
import { LuUsers2 } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { FaArrowTrendDown } from "react-icons/fa6";

import { BiBookAdd } from "react-icons/bi";
import { BiBookContent } from "react-icons/bi";
import { getDashboardData } from "../../../services/index/users";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  const userState = useSelector((state) => state.user);

  const { data: data, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getDashboardData({ token: userState.userInfo.token });
    },
  });

  const [time, setTime] = useState(new Date());
  const now = new Date();

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    let formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();
    let suffix = "th";
    if (day < 11 || day > 20) {
      switch (day % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
        default:
          break;
      }
    }

    return formattedDate.replace(/(\d+)(th)?/, `$1${suffix}`);
  };
  useEffect(() => {
    const timerID = setInterval(
      () => tick(),
      1000 // Update time every second
    );

    return () => {
      clearInterval(timerID); // Clear interval on component unmount
    };
  }, []);

  const tick = () => {
    setTime(new Date());
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  if (profileIsLoading) {
    // Render loading indicator
    return <div>loading...</div>;
  }

  if (!data) {
    // Render error message or fallback UI
    return <div>error...</div>;
  }

  console.log("data", data);

  const { users, doctors, managers, posts, registerUser, subscribedUsed } =
    data.data;

  return (
    <div className="dashboard bg-[#F1F2F6]">
      <div className="mb-10 grid grid-cols-4 gap-6 max-md:grid-cols-1 max-sm:grid-cols-1">
        <div className="grid gap-10 rounded-2xl bg-white p-5 px-10">
          <div className="flex items-center gap-3 pt-5">
            <img src={Sun} alt=".." />
            <div>
              <p className="text-1xl text-[#C8CAD5]">{formatTime(time)}</p>
              <p className="text-xs text-[#C8CAD5]">Realtime Insight</p>
            </div>
          </div>
          <div>
            <p className="text-lg">Today:</p>
            <p className="text-lg">{formatDate(now)}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {}}
              className="mb-4 flex w-10/12 items-center justify-center rounded-lg bg-gradient-to-b from-[#8103CE] to-[#9F90FA] py-2 text-white"
            >
              View Posts
            </button>
          </div>
        </div>
        <div className="grid gap-5 ">
          <div
            className="h-full rounded-2xl bg-[#902dc8] p-5 text-white"
            onClick={() => {}}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-[38px] font-extralight">{posts}</h1>
              <div className="h-fit cursor-pointer rounded-full bg-white bg-opacity-40 p-2">
                <LuUsers2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2"> Posts</p>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white bg-opacity-20 text-white">
                <span>
                  <FaArrowTrendDown className="h-3 w-3 text-lg font-thin" />
                </span>
              </div>
              <span>10% Increase than Last month</span>
            </div>
          </div>
          <div className="h-full rounded-2xl bg-[#899E2B] p-5 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-[38px] font-extralight">{users}</h1>
              <div className="h-fit cursor-pointer rounded-full bg-white bg-opacity-40 p-2">
                <BiBookContent className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2">Users</p>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white bg-opacity-20 text-white">
                <span>
                  <IoMdAdd className="h-4 w-4 text-lg font-thin" />
                </span>
              </div>
              <span>{users} new Users added!</span>
            </div>
          </div>
        </div>
        <div className="grid gap-5 ">
          <div
            className="h-full rounded-2xl bg-[#675bd8] p-5 text-white"
            onClick={() => {}}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-[38px] font-extralight">{doctors}</h1>
              <div className="h-fit cursor-pointer rounded-full bg-white bg-opacity-40 p-2">
                <LuUsers2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2">Doctors</p>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white bg-opacity-20 text-white">
                <span>
                  <IoMdAdd className="h-4 w-4 text-lg font-thin" />
                </span>
              </div>
              <span> {doctors} new Doctors added!</span>
            </div>
          </div>
          <div
            className="h-full rounded-2xl bg-[#AA0000] p-5 text-white"
            onClick={() => {}}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-[38px] font-extralight">{subscribedUsed}</h1>
              <div className="h-fit cursor-pointer rounded-full bg-white bg-opacity-40 p-2">
                <BiBookAdd className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2">Subscribed Users</p>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white bg-opacity-20 text-white">
                <span>
                  <IoMdAdd className="h-4 w-4 text-lg font-thin" />
                </span>
              </div>
              <span> {subscribedUsed} new added!</span>
            </div>
          </div>
        </div>
        <div className="grid gap-5 ">
          <div
            className="h-full rounded-2xl bg-[#a8497b] p-5 text-white"
            onClick={() => {}}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-[38px] font-extralight">{registerUser}</h1>
              <div className="h-fit cursor-pointer rounded-full bg-white bg-opacity-40 p-2">
                <LuUsers2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2">Requested Users</p>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white bg-opacity-20 text-white">
                <span>
                  <IoMdAdd className="h-4 w-4 text-lg font-thin" />
                </span>
              </div>
              <span>{registerUser} new added!</span>
            </div>
          </div>
          <div className="h-full rounded-2xl bg-[#FA8F1E] p-5 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-[38px] font-extralight">{managers}</h1>
              <div className="h-fit cursor-pointer rounded-full bg-white bg-opacity-40 p-2">
                <BiBookContent className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="mb-2"> Managers</p>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white bg-opacity-20 text-white">
                <span>
                  <IoMdAdd className="h-4 w-4 text-lg font-thin" />
                </span>
              </div>
              <span> {managers} new added!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
