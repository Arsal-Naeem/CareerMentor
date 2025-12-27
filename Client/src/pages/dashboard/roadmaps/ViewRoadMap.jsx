import { GetRoadmaps } from "@/apiService/Roadmaps";
import { EnrollInCareerDomain } from "@/apiService/SkillTracking";
import { BreadCrumb } from "@/components/careerAssessment/BreadCrumb";
import { FullPageError } from "@/components/fullPageError/FullPageError";
import ModuleCard from "@/components/roadmap/ModuleCard";
import {
  RoadMapDetailsHeaderSkeleton,
  RoadmapEnrollButtonSkeleton,
  RoadmapSkeleton,
} from "@/components/skeletons/roadmaps/RoadmapsSkeletons";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import usePageTitle from "@/hooks/usePageTitle";
import { useScreenSize } from "@/hooks/useScreenSize";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// NOTE: There's no api for this
// TODO: Fix the ui later
const ViewRoadMap = () => {
  const { id } = useParams();
  usePageTitle("Roadmap Tracking");
  const { setBreadcrumbText } = useGlobalContext();
  const [expandedModuleId, setExpandedModuleId] = useState(null);
  const { isSmallScreen } = useScreenSize();

  const { data: roadmapData, isLoading, isError } = GetRoadmaps(id);

  const { mutate: enrollDomain, isPending: enrolling } = EnrollInCareerDomain();

  const roadmapTitle = roadmapData?.domain?.title ?? "";

  useEffect(() => {
    setBreadcrumbText(`Roadmaps/${roadmapTitle}`);
  }, [roadmapTitle]);

  const toggleModule = (moduleId) => {
    setExpandedModuleId((prev) => (prev === moduleId ? null : moduleId));
  };

  const handleEnroll = () => {
    if (!id) return;
    enrollDomain(id);
  };

  const shouldShowAlreadyEnrolledButton =
    !isLoading && Array.isArray(roadmapData) && roadmapData.length > 0;

  const shouldShowEnrollNowButton =
    !isLoading && Array.isArray(roadmapData) && roadmapData.length === 0;

  if (isError || !isLoading || !Array.isArray(roadmapData)) {
    return (
      <FullPageError
        title="Roadmap coming soon"
        subtitle="This career roadmap hasn’t been published yet. Please check back later or explore other available roadmaps."
      />
    );
  }

  return (
    <DashboardLayout>
      <div className="px-4 md:px-8 lg:px-12 pt-5 pb-10 flex flex-col gap-8">
        {/* Breadcrumb & Heading */}
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <>
              <BreadCrumb />
              <h2 className="text-xl md:text-2xl font-bold">
                Roadmap Details of {roadmapData?.domain?.title}
              </h2>
            </>
          ) : (
            <RoadMapDetailsHeaderSkeleton />
          )}

          {/* Enroll button */}
          {isLoading ? (
            <RoadmapEnrollButtonSkeleton />
          ) : shouldShowAlreadyEnrolledButton && roadmapData?.isEnrolled ? (
            <Button disabled variant="secondary" className="w-full md:w-auto">
              Already Enrolled
            </Button>
          ) : shouldShowEnrollNowButton ? (
            <Button
              onClick={handleEnroll}
              disabled={enrolling}
              className="w-full md:w-auto"
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </Button>
          ) : null}
        </div>

        {/* Roadmap Content */}
        {isLoading ? (
          <RoadmapSkeleton />
        ) : (
          roadmapData?.roadmap?.length && (
            <div className="relative">
              {!isSmallScreen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-[#59a4c0]" />
              )}

              <div className="flex flex-col gap-12 relative">
                {roadmapData.roadmap
                  .sort((a, b) => a.sequence - b.sequence)
                  .map((module, index) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      expandedModuleId={expandedModuleId}
                      toggleModule={toggleModule}
                      isSmallScreen={isSmallScreen}
                      index={index}
                    />
                  ))}
              </div>
            </div>
          )
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewRoadMap;
