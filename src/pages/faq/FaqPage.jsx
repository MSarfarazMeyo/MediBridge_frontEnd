import React from "react";
import MainLayout from "../../components/MainLayout";

export const FaqPage = () => {
  return (
    <MainLayout>
      <section id="faq" class="container relative mx-auto py-12 px-2">
        <h3 class="mb-14 text-center text-3xl font-semibold text-teal-900 underline decoration-teal-200/80 lg:text-left xl:text-4xl">
          Frequently Asked Questions
        </h3>

        <div class="my-6">
          <div class="w-full cursor-pointer select-none rounded-t-2xl border-2 border-teal-600/30 bg-teal-600/80 px-4 py-4 text-gray-100 transition duration-300 hover:border-teal-600/80 hover:text-white">
            <h4 class="text-lg font-medium">
              How do I create an account on the website?
            </h4>
          </div>
          <div class="inline-flex w-full rounded-b-2xl border-x-2 border-b-2 border-dashed border-teal-600/30 bg-teal-100/50 px-4 py-4 text-teal-800">
            <h5>
              To create an account, click on the "Sign Up" button located at the
              top right corner of the homepage.
              <br />
              Fill out the required information, including your name, email
              address, and password.
              <br />
              Click "Create Account" to complete the registration process.
            </h5>
          </div>
        </div>

        <div class="my-6">
          <div class="w-full cursor-pointer select-none rounded-t-2xl border-2 border-teal-600/30 bg-teal-600/80 px-4 py-4 text-gray-100 transition duration-300 hover:border-teal-600/80 hover:text-white">
            <h4 class="text-lg font-medium">
              What types of medical articles can I find on MediBridge?
            </h4>
          </div>
          <div class="inline-flex w-full rounded-b-2xl border-x-2 border-b-2 border-dashed border-teal-600/30 bg-teal-100/50 px-4 py-4 text-teal-800">
            <h5>
              At MediBridge, we strive to provide a comprehensive collection of
              articles covering a wide range of medical topics. Whether you're
              interested in common ailments, rare diseases, treatment options,
              or the latest medical research, you'll find valuable insights
              here.
            </h5>
          </div>
        </div>

        <div class="my-6">
          <div class="w-full cursor-pointer select-none rounded-t-2xl border-2 border-teal-600/30 bg-teal-600/80 px-4 py-4 text-gray-100 transition duration-300 hover:border-teal-600/80 hover:text-white">
            <h4 class="text-lg font-medium">
              Are the articles on MediBridge written by medical professionals?
            </h4>
          </div>
          <div class="inline-flex w-full rounded-b-2xl border-x-2 border-b-2 border-dashed border-teal-600/30 bg-teal-100/50 px-4 py-4 text-teal-800">
            <h5>
              Yes, our articles are curated from reputable sources and written
              by qualified medical professionals, ensuring accuracy and
              reliability. We prioritize content that is evidence-based and
              up-to-date to empower our users with trustworthy information.
            </h5>
          </div>
        </div>

        <div class="my-6">
          <div class="w-full cursor-pointer select-none rounded-t-2xl border-2 border-teal-600/30 bg-teal-600/80 px-4 py-4 text-gray-100 transition duration-300 hover:border-teal-600/80 hover:text-white">
            <h4 class="text-lg font-medium">
              Can I contribute my own articles to MediBridge?
            </h4>
          </div>
          <div class="inline-flex w-full rounded-b-2xl border-x-2 border-b-2 border-dashed border-teal-600/30 bg-teal-100/50 px-4 py-4 text-teal-800">
            <h5>
              Currently, we do not accept user-contributed articles. However, if
              you have suggestions for topics you'd like to see covered or
              feedback on existing content, we'd love to hear from you! Feel
              free to reach out to our team through our contact page.
            </h5>
          </div>
        </div>

        <div class="my-6">
          <div class="w-full cursor-pointer select-none rounded-t-2xl border-2 border-teal-600/30 bg-teal-600/80 px-4 py-4 text-gray-100 transition duration-300 hover:border-teal-600/80 hover:text-white">
            <h4 class="text-lg font-medium">
              What payment methods do you accept?
            </h4>
          </div>
          <div class="inline-flex w-full rounded-b-2xl border-x-2 border-b-2 border-dashed border-teal-600/30 bg-teal-100/50 px-4 py-4 text-teal-800">
            <h5>
              Currently we accept only JazzCash/EasyPaisa for your convenience
            </h5>
          </div>
        </div>

        <div class="my-6">
          <div class="w-full cursor-pointer select-none rounded-t-2xl border-2 border-teal-600/30 bg-teal-600/80 px-4 py-4 text-gray-100 transition duration-300 hover:border-teal-600/80 hover:text-white">
            <h4 class="text-lg font-medium">Do you have Management support?</h4>
          </div>
          <div class="inline-flex w-full rounded-b-2xl border-x-2 border-b-2 border-dashed border-teal-600/30 bg-teal-100/50 px-4 py-4 text-teal-800">
            <h5>Yes we have 24/7 management support of our valuable users</h5>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
