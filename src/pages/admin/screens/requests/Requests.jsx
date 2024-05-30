import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../../../services/index/comments";
import DataTable from "../../components/DataTable";
import { images, stables } from "../../../../constants";
import { Link } from "react-router-dom";
import {
  getAllSubscriptions,
  updateStatus,
} from "../../../../services/index/subscription";

const Requests = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: commentsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getAllSubscriptions(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "comments",
  });

  const {
    mutate: mutateUpdateCommentCheck,
    isLoading: isLoadingUpdateCommentCheck,
  } = useMutation({
    mutationFn: ({ updatedData, id, token }) => {
      return updateStatus({ updatedData, id, token });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
      toast.success(
        data?.status == "approved"
          ? "Request is approved"
          : "Request is not approved"
      );
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handlestatuschange = (sts, id) => {
    const status = sts == "requested" ? "approved" : "requested";
    let updatedData = new FormData();
    updatedData.append(
      "document",
      JSON.stringify({
        status: status,
      })
    );

    mutateUpdateCommentCheck({
      updatedData,
      id,
      token: userState.userInfo.token,
    });
  };

  return (
    <DataTable
      pageTitle="Subscription Requests"
      dataListName="Requests"
      searchInputPlaceHolder="Search request..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["User", "Requested At", "Status"]}
      isFetching={isFetching}
      isLoading={isLoading}
      data={commentsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={commentsData?.headers}
    >
      {commentsData?.data.map((comment) => (
        <tr>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      comment?.photo
                        ? stables.UPLOAD_FOLDER_BASE_URL + comment?.photo
                        : images.userImage
                    }
                    alt={"image"}
                    className="mx-auto aspect-square w-10 rounded-lg object-cover"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="whitespace-no-wrap text-gray-900">
                  {comment?.user?.name}
                </p>
              </div>
            </div>
          </td>

          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap text-gray-900">
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </td>
          <td className="space-x-5 border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className={`${
                comment?.check
                  ? "text-yellow-600 hover:text-yellow-900"
                  : "text-green-600 hover:text-green-900"
              } disabled:cursor-not-allowed disabled:opacity-70`}
              onClick={() => {
                handlestatuschange(comment?.status, comment._id);
              }}
            >
              {comment?.status == "requested" ? "Requested" : "Approved"}
            </button>
          </td>
          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {post.categories.length > 0
                ? post.categories
                    .slice(0, 3)
                    .map(
                      (category, index) =>
                        `${category.title}${
                          post.categories.slice(0, 3).length === index + 1
                            ? ""
                            : ", "
                        }`
                    )
                : "Uncategorized"}
            </p>
          </td> */}

          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex gap-x-2">
              {post.tags.length > 0
                ? post.tags.map((tag, index) => (
                    <p>
                      {tag}
                      {post.tags.length - 1 !== index && ","}
                    </p>
                  ))
                : "No tags"}
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: post?.slug,
                  token: userState.userInfo.token,
                });
              }}
            >
              Delete
            </button>
            <Link
              to={`/admin/posts/manage/edit/${post?.slug}`}
              className="text-green-600 hover:text-green-900"
            >
              Edit
            </Link>
          </td> */}
        </tr>
      ))}
    </DataTable>
  );
};

export default Requests;
