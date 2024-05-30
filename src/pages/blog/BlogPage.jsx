import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getAllPosts } from "../../services/index/posts";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import ArticleCard from "../../components/ArticleCard";
import MainLayout from "../../components/MainLayout";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import Search from "../../components/Search";

let isFirstRun = true;

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsValue = Object.fromEntries([...searchParams]);

  const currentPage = parseInt(searchParamsValue?.page) || 1;
  const searchKeyword = searchParamsValue?.search || "";

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage, 12),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  console.log(data);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [currentPage, searchKeyword, refetch]);

  const handlePageChange = (page) => {
    // change the page's query string in the URL
    setSearchParams({ page, search: searchKeyword });
  };

  const handleSearch = ({ searchKeyword }) => {
    setSearchParams({ page: 1, search: searchKeyword });
  };

  return (
    <MainLayout>
      <section className="container mx-auto flex flex-col px-5 py-10">
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center">
          <Search
            className="mb-10 w-full max-w-xl"
            onSearchKeyword={handleSearch}
          />

          <div className=" mb-10 flex w-full  max-w-xl flex-col  lg:flex-row lg:flex-nowrap lg:items-start lg:gap-x-4">
            <span className="mt-2 font-semibold italic text-dark-light lg:mt-4 lg:text-sm xl:text-base">
              Popular Categories:
            </span>
            <ul className="mt-3 flex flex-wrap gap-x-2.5 gap-y-2.5 lg:text-sm xl:text-base">
              <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
                General Health
              </li>
              <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
                Cardiology
              </li>
              <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
                Neurology
              </li>
            </ul>
          </div>
        </div>

        {/* <div className=" flex flex-col  lg:flex-row lg:flex-nowrap lg:items-start lg:gap-x-4">
          <span className="mt-2 font-semibold italic text-dark-light lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="mt-3 flex flex-wrap gap-x-2.5 gap-y-2.5 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
              #Diabetes
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
              #ChildDevelopment
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
              #BoneFractures
            </li>
          </ul>
        </div> */}

        <div className=" flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
          {isLoading || isFetching ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't fetch the posts data" />
          ) : data?.data.length === 0 ? (
            <p className="text-orange-500">No Posts Found!</p>
          ) : (
            data?.data.map((post) => (
              <ArticleCard
                key={post._id}
                post={post}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          )}
        </div>
        {!isLoading && (
          <Pagination
            onPageChange={(page) => handlePageChange(page)}
            currentPage={currentPage}
            totalPageCount={JSON.parse(data?.headers?.["x-totalpagecount"])}
          />
        )}
      </section>
    </MainLayout>
  );
};

export default BlogPage;
