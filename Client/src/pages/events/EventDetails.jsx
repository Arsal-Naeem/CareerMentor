import { ImageHeader } from "@/components/ImageHeader";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import usePageTitle from "@/hooks/usePageTitle";
import ProseKitRenderer from "@/components/editor/examples/full/ProseKitRenderer";
import { truncateText } from "@/utils/helpers";
import { Link, useParams } from "react-router-dom";
import EventDetailsSkeleton from "@/components/skeletons/events/EventDetailsSkeleton";
import { FetchSingleEventForUsers } from "@/apiService/Events";

const EventDetails = () => {
  usePageTitle("Event Details");

  const { id } = useParams();

  const { data, isLoading } = FetchSingleEventForUsers(id);

  return (
    <MainLayout>
      {isLoading ? (
        <EventDetailsSkeleton />
      ) : (
        <div className="w-full px-4 sm:px-8 md:px-10 lg:px-20 py-10 flex flex-col h-full gap-3 lg:gap-7">
          {/* Header */}
          <ImageHeader
            imagePath={data?.image_url}
            variant="event"
            imageClassName="max-h-[400px]"
            customBodyContainerClassName="lg:gap-2 lg:p-7"
            customBody={
              <>
                <h1 className="text-2xl line-clamp-5 md:text-4xl font-semibold">
                  {truncateText(data?.title, 28)}
                </h1>
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span>📅</span> Date & Time
                  </h3>
                  <p className="mt-1">
                    {new Date(data?.eventDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p>
                    {new Date(
                      `1970-01-01T${data?.startTime}`
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    –{" "}
                    {new Date(`1970-01-01T${data?.endTime}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </p>
                </div>

                {/* Where */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span>📍</span> Venue
                  </h3>
                  <p className="mt-1">{data?.venue}</p>
                </div>

                {data?.registration_type !== "internal" && (
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <span>🔗</span> Registration Link
                    </h3>
                    <Link to={data?.registrationLink}>Register Here</Link>
                  </div>
                )}
              </>
            }
          />
          {/* Event Details */}
          <div className="flex flex-col gap-10 text-black">
            {/* Event Intro Paragraph */}
            <p className="text-base leading-relaxed">{data?.shortDesc}</p>

            {/* <ProseKitRenderer contentString={stringifiedContent} /> */}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default EventDetails;
