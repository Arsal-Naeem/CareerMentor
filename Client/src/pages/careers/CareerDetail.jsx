import usePageTitle from "@/hooks/usePageTitle";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { ImageHeader } from "./components/ImageHeader";
import CareerBg from "@/assets/images/career-bg.png";
import { CareerDetailSkeleton } from "@/components/skeletons/careers/CareerDetailsSkeleton";
import ProseKitRenderer from "@/components/editor/examples/full/ProseKitRenderer";

const CareerDetail = () => {
  usePageTitle("Career Details");
  const isLoading = false;
  return (
    <MainLayout>
      {isLoading ? <CareerDetailSkeleton /> : <CareerDetails />}
    </MainLayout>
  );
};

const CareerDetails = () => {
  const stringifiedContent =
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This is a sample career description."}]}]}';

  return (
    <div className="flex flex-col gap-4 md:gap-5 lg:gap-8 px-6 py-10 md:px-12 lg:px-24">
      <ImageHeader bgImage={CareerBg} heading="Frontend Developer" />
      <ProseKitRenderer contentString={stringifiedContent} />
    </div>
  );
};

export default CareerDetail;
