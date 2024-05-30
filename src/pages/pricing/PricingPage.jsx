import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNew,
  getSingle,
  updatePicture,
  updateStatus,
} from "../../services/index/subscription";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { HiOutlineCamera } from "react-icons/hi";

export const PricingPage = () => {
  const [submitPlan, setSubmitPlane] = useState(false);
  const userState = useSelector((state) => state.user);
  const [photo, setPhoto] = useState(null);

  const { data: data, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getSingle({ userId: userState.userInfo._id });
    },
  });

  const { mutate: mutateUpdate, isLoadingUpdate } = useMutation({
    mutationFn: ({ updatedData, id, token }) => {
      return updateStatus({
        updatedData,
        id,
        token,
      });
    },
    onSuccess: (data) => {
      toast.success("Photo is Updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();
    if (photo) {
      updatedData.append("postPicture", photo);
    }
    mutateUpdate({
      updatedData,
      id: data._id,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    setPhoto(null);
  };

  return (
    <MainLayout>
      {submitPlan ? (
        <div
          id="contact-us"
          class="overflow-hidden bg-white py-16 px-4 dark:bg-slate-900 sm:px-6 lg:px-8 lg:py-24"
        >
          <div class="relative mx-auto max-w-xl">
            <svg
              class="absolute left-full translate-x-1/2 transform"
              width="404"
              height="404"
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200 dark:text-slate-600"
                    fill="currentColor"
                  ></rect>
                </pattern>
              </defs>
              <rect
                width="404"
                height="404"
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              ></rect>
            </svg>
            <svg
              class="absolute right-full bottom-0 -translate-x-1/2 transform"
              width="404"
              height="404"
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200 dark:text-slate-800"
                    fill="currentColor"
                  ></rect>
                </pattern>
              </defs>
              <rect
                width="404"
                height="404"
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              ></rect>
            </svg>
            <div class="text-center">
              <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200 sm:text-4xl">
                Request for Approval
              </h2>
              <p class="mt-4 text-lg leading-6 text-gray-500 dark:text-slate-400">
                Upload a screenShot of payment you sent to 03099789757 (Zubair).
                Thank you!
              </p>
            </div>
            <div class="mt-12">
              <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div class="sm:col-span-2">
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 dark:text-slate-400"
                  >
                    Payment Reciept/ScreenShot
                  </label>
                  <div class="mt-1">
                    <div className="flex w-full items-center gap-x-4">
                      <div className="lutline-primary relative h-20 w-full overflow-hidden rounded-full outline outline-1 outline-offset-2">
                        <label
                          htmlFor="profilePicture"
                          className="absolute inset-0 cursor-pointer rounded-full bg-transparent"
                        >
                          {photo ? (
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={"reciept image"}
                              className="aspect-rounded mx-auto  h-[200px] w-full rounded object-cover"
                            />
                          ) : (
                            <div className="flex h-[200px] w-full items-center justify-center bg-blue-50/50">
                              <HiOutlineCamera className="h-auto w-7 text-primary" />
                            </div>
                          )}
                        </label>
                        <input
                          type="file"
                          className="sr-only"
                          id="profilePicture"
                          onChange={handleFileChange}
                        />
                      </div>
                      <button
                        onClick={handleDeleteImage}
                        type="button"
                        className="rounded-lg border border-red-500 px-4 py-2 text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label
                    for="message"
                    class="block text-sm font-medium text-gray-700 dark:text-slate-400"
                  >
                    Note (optional)
                  </label>
                  <div class="mt-1">
                    <textarea
                      required=""
                      name="message"
                      id="message"
                      rows="4"
                      class="block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"
                    ></textarea>
                  </div>
                </div>
                <div class="gap:2 flex justify-end sm:col-span-2">
                  <button
                    onClick={() => setSubmitPlane(false)}
                    class="inline-flex items-center rounded-md border border-sky-500 px-4 py-2 font-medium text-sky-500 shadow-sm transition-colors duration-75 hover:bg-sky-50 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 active:bg-sky-100 disabled:cursor-not-allowed disabled:bg-sky-100 dark:hover:bg-gray-900 dark:active:bg-gray-800 dark:disabled:bg-gray-800 sm:text-sm"
                  >
                    <span>Back</span>
                  </button>

                  <button
                    class="inline-flex items-center rounded-md border border-sky-500 px-4 py-2 font-medium text-sky-500 shadow-sm transition-colors duration-75 hover:bg-sky-50 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 active:bg-sky-100 disabled:cursor-not-allowed disabled:bg-sky-100 dark:hover:bg-gray-900 dark:active:bg-gray-800 dark:disabled:bg-gray-800 sm:text-sm"
                    onClick={() => {
                      handleUpdatePost();
                    }}
                  >
                    <span>Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="mb-10 flex min-h-screen items-center justify-center p-5">
          <div class="">
            <div
              class="text-center font-semibold"
              style={{ cursor: "pointer" }}
            >
              <h1 class="text-5xl">
                <span class="tracking-wide text-blue-700">Flexible </span>
                <span>Plans</span>
              </h1>
              <p class="w-full px-8 pt-6 text-xl font-normal text-gray-400 md:w-full">
                Choose a plan that works best for you and
                <br /> your family.
              </p>
            </div>
            <div class="flex flex-row pt-24">
              <div class="w-96 rounded-3xl bg-white p-8 pr-16 text-center shadow-xl">
                <h1 class="text-2xl font-semibold text-black">Monthly</h1>
                <p class="pt-2 tracking-wide">
                  <span class="align-top text-gray-400">RS </span>
                  <span class="text-3xl font-semibold">1000</span>
                </p>
                <hr class="border-1 mt-4" />
                <div class="pt-8">
                  <p class="text-left font-semibold text-gray-400">
                    <span class="pl-2">
                      Messaging with <span class="text-black">Doctors</span>
                    </span>
                  </p>
                  <p class="pt-5 text-left font-semibold text-gray-400">
                    <span class="pl-2">
                      24/7 <span class="text-black">Management Support</span>
                    </span>
                  </p>
                  <p class="pt-5 text-left font-semibold text-gray-400">
                    <span class="pl-2">
                      <span class="text-black">Unlimited</span> Articales Access
                    </span>
                  </p>

                  <div
                    onClick={() => setSubmitPlane(true)}
                    class="cursor-pointer"
                  >
                    <p class="mt-8 w-full rounded-xl bg-blue-600 py-4 text-white">
                      <span class="font-medium">Startup Plan</span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="w-96 rounded-3xl bg-white p-8 pl-16 text-center shadow-xl">
                <h1 class="text-2xl font-semibold text-black">Annual</h1>
                <p class="pt-2 tracking-wide">
                  <span class="align-top text-gray-400">RS </span>
                  <span class="text-3xl font-semibold">10000</span>
                  <span class="font-medium text-gray-400">save 20%</span>
                </p>
                <hr class="border-1 mt-4" />
                <div class="pt-8">
                  <p class="text-left font-semibold text-gray-400">
                    <span class="pl-2">
                      All features in <span class="text-black">Startup</span>
                    </span>
                  </p>
                  <p class="pt-5 text-left font-semibold text-gray-400">
                    <span class="pl-2">
                      cancel plan <span class="text-black">any time</span>
                    </span>
                  </p>
                  <p class="pt-5 text-left font-semibold text-gray-400">
                    <span class="pl-2">
                      save <span class="text-black"> 20%</span>
                    </span>
                  </p>

                  <div
                    onClick={() => setSubmitPlane(true)}
                    class="cursor-pointer"
                  >
                    <p class="mt-8 w-full rounded-xl bg-blue-600 py-4 text-white">
                      <span class="font-medium">Premium Plan</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
