import React from "react";
import MainLayout from "../../components/MainLayout";

export const AboutUsPage = () => {
  return (
    <MainLayout>
      <div class="max-w-screen-xl items-center sm:flex">
        <div class="p-10 sm:w-1/2">
          <div class="image object-center text-center">
            <img src="https://static-www.elastic.co/v3/assets/bltefdd0b53724fa2ce/blta401f2e7dad39503/620d844d9d54947c7f131b0a/illustration-industry-health.png" />
          </div>
        </div>
        <div class="p-5 sm:w-1/2">
          <div class="text">
            <h2 class="my-4 text-3xl font-bold sm:text-4xl ">
              About <span class="text-indigo-600">Medi Bridge</span>
            </h2>
            <p class="text-gray-700">
              <strong>Our Mission</strong>
              <br />
              At MediBridge, our mission is to bridge the gap between medical
              knowledge and the community. We strive to provide reliable and
              comprehensive medical information to empower individuals in their
              health journey. At MediBridge, our mission is to bridge the gap
              between medical knowledge and the community. We strive to provide
              reliable and comprehensive medical information to empower
              individuals in their health journey.
            </p>
            <p class="mt-4 text-gray-700">
              <strong>Empowering Health Decisions</strong>
              <br />
              We believe that access to accurate and up-to-date medical
              information is essential for making informed health decisions.
              Through curated articles, we aim to educate, inform, and inspire
              individuals to take control of their health and well-being.
            </p>
            <p class="mt-4 text-gray-700">
              <strong>Our Approach</strong>
              <br />
              Our approach is grounded in evidence-based practices and a
              commitment to integrity and transparency. We carefully select and
              review content to ensure its accuracy and relevance, providing
              users with trustworthy information they can rely on.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
