import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { getSinglePost, updatePost } from "../../../../services/index/posts";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { images, stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Editor from "../../../../components/editor/Editor";
import MultiSelectTagDropdown from "../../components/select-dropdown/MultiSelectTagDropdown";
import { getAllCategories } from "../../../../services/index/postCategories";
import {
  filterCategories,
  categoryToOption,
} from "../../../../utils/multiSelectTagUtils";
import {
  getSingleUser,
  updateProfile,
  updateUser,
} from "../../../../services/index/users";
import Auth from "../../../../services/auth-service";

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const EditDoctor = () => {
  const { slug } = useParams();

  const location = useLocation();
  const userId = location.state?.id;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState("");
  const [categories, setCategories] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(null);
  const [postSlug, setPostSlug] = useState();
  const [caption, setCaption] = useState("");

  const [dataExist, setDataExist] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSingleUser({ userId }),
    onSuccess: (data) => {
      setInitialPhoto(data?.avatar);
      setCategories(data?.categories);
      setTitle(data.name);
      setDataExist(data?.chatId);
      setTags(data.tags);
    },
    refetchOnWindowFocus: false,
  });

  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, userId, token }) => {
      return updateUser({
        updatedData,
        userId,
        token,
      });
    },
    onSuccess: (data) => {
      toast.success("Doctor is updated");
      navigate(`/admin/doctors/manage`);
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
    try {
      let chatId = "";
      if (!title || !postSlug) {
        alert("Name Email Required");
        return;
      }
      let updatedData = new FormData();
      if (!initialPhoto && photo) {
        updatedData.append("postPicture", photo);
      } else if (initialPhoto && !photo) {
        const urlToObject = async (url) => {
          let reponse = await fetch(url);
          let blob = await reponse.blob();
          const file = new File([blob], initialPhoto, { type: blob.type });
          return file;
        };
        const picture = await urlToObject(
          stables.UPLOAD_FOLDER_BASE_URL + data?.photo
        );

        updatedData.append("postPicture", picture);
      }

      // if (dataExist) {
      //   updatedData.append(
      //     "document",
      //     JSON.stringify({
      //       body,
      //       categories,
      //       title,
      //       tags,
      //       slug: postSlug,
      //       caption,
      //       doctor: true,
      //     })
      //   );
      // } else {
      //   Auth.signup(title, postSlug, "txend1122")
      //     .then((user) => {
      //       chatId = user?.user?.id;
      //       updatedData.append(
      //         "document",
      //         JSON.stringify({
      //           body,
      //           categories,
      //           title,
      //           tags,
      //           slug: postSlug,
      //           caption,
      //           doctor: true,
      //           chatId,
      //         })
      //       );
      //     })
      //     .catch((er) => {
      //       console.log("error", er);

      //       updatedData.append(
      //         "document",
      //         JSON.stringify({
      //           body,
      //           categories,
      //           title,
      //           tags,
      //           slug: postSlug,
      //           caption,
      //           doctor: true,
      //         })
      //       );
      //     });
      // }

      updatedData.append(
        "document",
        JSON.stringify({
          body,
          categories,
          title,
          tags,
          slug: postSlug,
          caption,
          doctor: true,
        })
      );

      mutateUpdatePostDetail({
        updatedData,
        userId,
        token: userState.userInfo.token,
      });
    } catch (error) {
      toast.error("somthing went wrong");
    }
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your Post picture?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  let isPostDataLoaded = !isLoading && !isError;

  return (
    <div className="bg-gray-100">
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container mx-auto flex flex-col px-5 py-5">
          <article className="border-b border-gray-200 bg-white px-5 py-5 text-base md:text-lg">
            <label htmlFor="postPicture" className="w-full cursor-pointer">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="aspect-rounded w-h-[200px] [200px] mx-auto h-[200px] rounded object-cover"
                />
              ) : (
                <img
                  src={
                    initialPhoto
                      ? stables.UPLOAD_FOLDER_BASE_URL + initialPhoto
                      : images.userImage
                  }
                  alt={data.name}
                  className="aspect-rounded w-h-[200px] [200px] mx-auto h-[200px] rounded object-cover"
                />
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="mt-5 w-fit rounded-lg bg-red-500 px-2 py-1 text-sm font-semibold text-white"
            >
              Delete Image
            </button>
            <div className="mt-4 flex gap-2">
              {data?.categories?.map((category) => (
                <Link
                  to={`/blog?category=${category?.name}`}
                  className="inline-block font-roboto text-sm text-primary md:text-base"
                >
                  {category?.name}
                </Link>
              ))}
            </div>
            <div className="d-form-control w-full">
              <label className="d-label" htmlFor="title">
                <span className="d-label-text">Name</span>
              </label>
              <input
                id="title"
                value={title}
                className="d-input-bordered d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="d-form-control w-full">
              <label className="d-label" htmlFor="caption">
                <span className="d-label-text">Tag Line</span>
              </label>
              <input
                id="caption"
                value={caption}
                className="d-input-bordered d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300"
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Tag Line"
              />
            </div>
            <div className="d-form-control w-full">
              <label className="d-label" htmlFor="slug">
                <span className="d-label-text">Email</span>
              </label>
              <input
                id="slug"
                value={postSlug}
                className="d-input-bordered d-input border-slate-300 font-roboto text-xl font-medium text-dark-hard !outline-slate-300"
                onChange={(e) =>
                  setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
                }
                placeholder="Email"
              />
            </div>
            <div className="mb-5 mt-2">
              <label className="d-label">
                <span className="d-label-text">categories</span>
              </label>
              {isPostDataLoaded && (
                <MultiSelectTagDropdown
                  loadOptions={promiseOptions}
                  defaultValue={data?.categories?.map(categoryToOption)}
                  onChange={(newValue) =>
                    setCategories(newValue?.map((item) => item?.value))
                  }
                />
              )}
            </div>
            <div className="mb-5 mt-2">
              <label className="d-label">
                <span className="d-label-text">tags</span>
              </label>
              {isPostDataLoaded && (
                <CreatableSelect
                  defaultValue={data?.tags?.map((tag) => ({
                    value: tag,
                    label: tag,
                  }))}
                  isMulti
                  onChange={(newValue) =>
                    setTags(newValue?.map((item) => item?.value))
                  }
                  className="relative z-20"
                />
              )}
            </div>
            <div className="w-full">
              <label className="d-label">
                <span className="d-label-text">About</span>
              </label>
              {isPostDataLoaded && (
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="min-h-24 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
                  minRows={3}
                  placeholder="about text..."
                />
              )}
            </div>
            <button
              disabled={isLoadingUpdatePostDetail}
              type="button"
              onClick={handleUpdatePost}
              className="w-full rounded-lg bg-green-500 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              Save
            </button>
          </article>
        </section>
      )}
    </div>
  );
};

export default EditDoctor;
