import { ImageHeader } from "@/components/ImageHeader";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import EventImage from "@/assets/images/blog.png";
import usePageTitle from "@/hooks/usePageTitle";
import ProseKitRenderer from "@/components/editor/examples/full/ProseKitRenderer";
import { truncateText } from "@/utils/helpers";
import { Link } from "react-router-dom";
import EventDetailsSkeleton from "@/components/skeletons/events/EventDetailsSkeleton";

const EventDetails = () => {
  usePageTitle("Event Details");
  const stringifiedContent =
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"The editor that thinks like you"}]},{"type":"paragraph","content":[{"type":"text","text":"Every keystroke flows naturally. Every feature appears exactly when you need it. This is "},{"type":"text","marks":[{"type":"bold"}],"text":"writing without barriers"},{"type":"text","text":"."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Text that shines."}]},{"type":"paragraph","content":[{"type":"text","text":"Make your words "},{"type":"text","marks":[{"type":"bold"}],"text":"bold"},{"type":"text","text":", "},{"type":"text","marks":[{"type":"italic"}],"text":"italic"},{"type":"text","text":", "},{"type":"text","marks":[{"type":"underline"}],"text":"underlined"},{"type":"text","text":", or "},{"type":"text","marks":[{"type":"strike"}],"text":"crossed out"},{"type":"text","text":". Add "},{"type":"text","marks":[{"type":"code"}],"text":"inline code"},{"type":"text","text":" that stands out. Create "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://prosekit.dev"}}],"text":"links"},{"type":"text","text":" that connect."}]},{"type":"paragraph","content":[{"type":"text","text":"Select any text to format it. Type "},{"type":"text","marks":[{"type":"code"}],"text":"@"},{"type":"text","text":" to mention "},{"type":"mention","attrs":{"id":"39","value":"@someone","kind":"user"}},{"type":"text","text":" or "},{"type":"text","marks":[{"type":"code"}],"text":"#"},{"type":"text","text":" for "},{"type":"mention","attrs":{"id":"1","value":"#topics","kind":"tag"}},{"type":"text","text":". Press "},{"type":"text","marks":[{"type":"code"}],"text":"/"},{"type":"text","text":" and discover what\'s possible."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Lists that organize."}]},{"type":"list","attrs":{"kind":"bullet","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Bullet points that guide thoughts"}]}]},{"type":"list","attrs":{"kind":"bullet","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Nested lists for complex ideas"}]},{"type":"list","attrs":{"kind":"bullet","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Sub-points flow naturally"}]}]}]},{"type":"list","attrs":{"kind":"bullet","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Tasks that focus"}]},{"type":"list","attrs":{"kind":"task","order":null,"checked":true,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Done feels good"}]}]},{"type":"list","attrs":{"kind":"task","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Todo drives action"}]}]}]},{"type":"list","attrs":{"kind":"ordered","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Numbered steps"}]}]},{"type":"list","attrs":{"kind":"ordered","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Sequential thinking"}]}]},{"type":"list","attrs":{"kind":"ordered","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Clear progress"}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Code that inspires."}]},{"type":"codeBlock","attrs":{"language":"javascript"},"content":[{"type":"text","text":"// Code that reads like poetry\\nconst magic = createEditor()\\nmagic.transform(thoughts)\\n"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Images that captivate."}]},{"type":"image","attrs":{"src":"https://static.photos/season/320x240/107"}},{"type":"paragraph","content":[{"type":"text","text":"Drag the handle in the bottom right corner to resize."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Tables that structure."}]},{"type":"table","content":[{"type":"tableRow","content":[{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Feature"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"How to use"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Result"}]}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Format text"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Select and choose"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Perfect styling"}]}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Add mentions"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Type @ and name"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Connected ideas"}]}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Insert anything"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Press / for menu"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Endless possibilities"}]}]}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quotes that inspire."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"\\"This is not just an editor. This is how writing should feel.\\""}]}]},{"type":"horizontalRule"},{"type":"paragraph","content":[{"type":"text","text":"Start typing. Everything else just flows."}]}]}';
  const isLoading = false;
  return (
    <MainLayout>
      {isLoading ? (
        <EventDetailsSkeleton />
      ) : (
        <div className="w-full px-4 sm:px-8 md:px-10 lg:px-20 py-10 flex flex-col h-full gap-3 lg:gap-7">
          {/* Header */}
          <ImageHeader
            imagePath={EventImage}
            variant="event"
            customBodyContainerClassName="lg:gap-2 lg:p-7"
            customBody={
              <>
                <h1 className="text-2xl line-clamp-5 md:text-4xl font-semibold">
                  {truncateText("Name of the Event", 28)}
                </h1>
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span>📅</span> Date & Time
                  </h3>
                  <p className="mt-1">Saturday, July 19, 2025</p>
                  <p>9:30 AM – 3:00 PM (GMT+5)</p>
                </div>

                {/* Where */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span>📍</span> Venue
                  </h3>
                  <p className="mt-1">
                    Arfa Software Technology Park, 346b Lahore –<br />
                    Kasur Road Lahore, 54000
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span>🔗</span> Registration Link
                  </h3>
                  <Link to="https://example.com/register">Register Here</Link>
                </div>
              </>
            }
          />
          {/* Event Details */}
          <div className="flex flex-col gap-10 text-black">
            {/* Event Intro Paragraph */}
            <p className="text-base leading-relaxed">
              Google I/O Extended is a community-led series of tech meetups that
              brings the excitement of Google I/O, an annual conference
              showcasing Google's latest developer solutions. It welcomes Google
              Developer Groups, Google Developer Student Clubs, Women
              Techmakers, and features appearances by Google Developer Experts
              and professionals.
            </p>

            <ProseKitRenderer contentString={stringifiedContent} />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default EventDetails;
