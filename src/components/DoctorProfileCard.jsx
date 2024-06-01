import React, { useContext } from "react";
import MainLayout from "./MainLayout";
import { images, stables } from "../constants";
import { useSelector } from "react-redux";
import ChatContext from "../services/chat-service";
import { useNavigate } from "react-router-dom";

export const DoctorProfileCard = ({ doctor }) => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const status =
    userState?.userInfo?.subscription?.status ||
    userState?.subscription?.status;

  console.log("status", status);
  console.log("userState");

  const chat = useContext(ChatContext);

  const { startChat, close } = chat;
  const startChatting = () => {
    doctor?.chatId && startChat(doctor?.chatId);
    navigate("/chat");
  };

  return (
    <div class="mx-4 mt-16 max-w-2xl rounded-lg bg-white text-gray-900 shadow-xl sm:mx-auto sm:max-w-sm md:mx-auto md:max-w-sm lg:mx-auto lg:max-w-sm xl:mx-auto xl:max-w-sm">
      <div
        class="h-32 overflow-hidden rounded-t-lg"
        style={{ position: "relative" }}
      >
        <div style={{ position: "absolute", top: 10, right: 20 }}>
          {doctor?.online ? (
            <div class="flex items-center space-x-5 rtl:space-x-reverse">
              <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                <span class="me-1 h-2 w-2 rounded-full bg-green-500 pl-1"></span>
                Available
              </span>
            </div>
          ) : (
            <div class="flex items-center space-x-3 rtl:space-x-reverse">
              <span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                <span class="me-1 h-2 w-2 rounded-full bg-red-500"></span>
                Unavailable
              </span>
            </div>
          )}
        </div>
        <img
          class="w-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQv_mqRNzO93qMCOdUwjpXDoPZ8oJ0mFr0KYWLnUkGytSKtKgCO5LV62KK-gI9xNaBx8&usqp=CAU"
          alt="Mountain"
        />
      </div>
      <div class="relative mx-auto -mt-16 h-32 w-32 overflow-hidden rounded-full border-4 border-white">
        <img
          class="h-32 object-cover "
          alt="Woman looking front"
          src={
            doctor?.avatar
              ? stables.UPLOAD_FOLDER_BASE_URL + doctor?.avatar
              : images.userImage
          }
        />
      </div>
      <div class="mt-2 text-center">
        <h2 class="font-semibold">{doctor?.name}</h2>
        <p class="text-gray-500">{doctor?.caption}</p>
      </div>

      <div class="h-20 overflow-hidden px-2 py-1 text-gray-700">
        <div class="mt-1 flex flex-wrap items-center gap-2">
          <span class="text-black-800 px-2.5 py-0.5 text-xs font-medium dark:bg-blue-900 dark:text-blue-300">
            {doctor?.about}
          </span>
        </div>
      </div>

      <div class="mt-1 flex flex-wrap items-center gap-2 py-1 px-2 text-gray-700">
        <span class="me-2 py-0.5 text-xs font-medium text-blue-900 dark:bg-blue-900 dark:text-blue-300">
          Categories :
        </span>
        {doctor?.categories?.map((category, index) => {
          return (
            <span
              key={index}
              class="me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            >
              {category?.title}
            </span>
          );
        })}
      </div>
      <div class="mt-1 flex flex-wrap items-center gap-2 py-1 px-2 text-gray-700">
        <span class="me-2 py-0.5 text-xs font-medium text-blue-900 dark:bg-blue-900 dark:text-blue-300">
          Tags :
        </span>
        {doctor?.tags?.map((tag, index) => {
          return (
            <span
              key={index}
              class="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
            >
              #{tag}
            </span>
          );
        })}
      </div>

      <div class="mx-8 mt-2 border-t p-4">
        <div class="mt-1 flex flex-nowrap items-center justify-center gap-2 py-1 px-2 text-gray-700">
          <button
            onClick={startChatting}
            disabled={!status}
            class="mx-auto block w-[45%] rounded-full bg-gray-900 px-6 py-2 font-semibold text-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
          >
            Message
          </button>
          <button
            disabled={!status}
            class="mx-auto block w-[45%] rounded-full bg-gray-900 px-6 py-2 font-semibold text-white hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};
