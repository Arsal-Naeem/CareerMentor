import BlogImage from "@/assets/images/blog.png";
import { BlogCard } from "@/components/blogs/BlogCard";
import ProseKitRenderer from "@/components/editor/examples/full/ProseKitRenderer";
import { ImageHeader } from "@/components/ImageHeader";
import { BlogDetailsSkeleton } from "@/components/skeletons/blogs/BlogDetailsSkeleton";
import { blogData } from "@/constants";
import MainLayout from "@/layouts/MainLayout";

const BlogDetail = () => {
  // const { id } = useParams();

  // coming from api
  const stringifiedContent =
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"The editor that thinks like you"}]},{"type":"paragraph","content":[{"type":"text","text":"Every keystroke flows naturally. Every feature appears exactly when you need it. This is "},{"type":"text","marks":[{"type":"bold"}],"text":"writing without barriers"},{"type":"text","text":"."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Text that shines."}]},{"type":"paragraph","content":[{"type":"text","text":"Make your words "},{"type":"text","marks":[{"type":"bold"}],"text":"bold"},{"type":"text","text":", "},{"type":"text","marks":[{"type":"italic"}],"text":"italic"},{"type":"text","text":", "},{"type":"text","marks":[{"type":"underline"}],"text":"underlined"},{"type":"text","text":", or "},{"type":"text","marks":[{"type":"strike"}],"text":"crossed out"},{"type":"text","text":". Add "},{"type":"text","marks":[{"type":"code"}],"text":"inline code"},{"type":"text","text":" that stands out. Create "},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://prosekit.dev"}}],"text":"links"},{"type":"text","text":" that connect."}]},{"type":"paragraph","content":[{"type":"text","text":"Select any text to format it. Type "},{"type":"text","marks":[{"type":"code"}],"text":"@"},{"type":"text","text":" to mention "},{"type":"mention","attrs":{"id":"39","value":"@someone","kind":"user"}},{"type":"text","text":" or "},{"type":"text","marks":[{"type":"code"}],"text":"#"},{"type":"text","text":" for "},{"type":"mention","attrs":{"id":"1","value":"#topics","kind":"tag"}},{"type":"text","text":". Press "},{"type":"text","marks":[{"type":"code"}],"text":"/"},{"type":"text","text":" and discover what\'s possible."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Lists that organize."}]},{"type":"list","attrs":{"kind":"bullet","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Bullet points that guide thoughts"}]}]},{"type":"list","attrs":{"kind":"bullet","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Nested lists for complex ideas"}]},{"type":"list","attrs":{"kind":"bullet","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Sub-points flow naturally"}]}]}]},{"type":"list","attrs":{"kind":"bullet","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Tasks that focus"}]},{"type":"list","attrs":{"kind":"task","order":null,"checked":true,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Done feels good"}]}]},{"type":"list","attrs":{"kind":"task","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Todo drives action"}]}]}]},{"type":"list","attrs":{"kind":"ordered","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Numbered steps"}]}]},{"type":"list","attrs":{"kind":"ordered","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Sequential thinking"}]}]},{"type":"list","attrs":{"kind":"ordered","order":null,"checked":false,"collapsed":false},"content":[{"type":"paragraph","content":[{"type":"text","text":"Clear progress"}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Code that inspires."}]},{"type":"codeBlock","attrs":{"language":"javascript"},"content":[{"type":"text","text":"// Code that reads like poetry\\nconst magic = createEditor()\\nmagic.transform(thoughts)\\n"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Images that captivate."}]},{"type":"image","attrs":{"src":"https://static.photos/season/320x240/107"}},{"type":"paragraph","content":[{"type":"text","text":"Drag the handle in the bottom right corner to resize."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Tables that structure."}]},{"type":"table","content":[{"type":"tableRow","content":[{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Feature"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"How to use"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Result"}]}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Format text"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Select and choose"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Perfect styling"}]}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Add mentions"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Type @ and name"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Connected ideas"}]}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Insert anything"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Press / for menu"}]}]},{"type":"tableCell","attrs":{},"content":[{"type":"paragraph","content":[{"type":"text","text":"Endless possibilities"}]}]}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quotes that inspire."}]},{"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"\\"This is not just an editor. This is how writing should feel.\\""}]}]},{"type":"horizontalRule"},{"type":"paragraph","content":[{"type":"text","text":"Start typing. Everything else just flows."}]}]}';

  const recommendedBlogs = blogData
    .slice(0, 4)
    .map(({ span, ...rest }) => rest);

  const isLoading = false;

  return (
    <MainLayout>
      {isLoading ? (
        <BlogDetailsSkeleton />
      ) : (
        <div className="w-full px-4 sm:px-8 md:px-10 py-10 flex flex-col h-full gap-3 lg:gap-7">
          {/* Blog Header */}
          <ImageHeader
            imagePath={BlogImage}
            customBody={
              <>
                <span className="text-sm md:text-base text-black bg-white rounded-full w-fit px-4 py-1 font-medium">
                  Back-end Development
                </span>
                <h1 className="text-2xl md:text-4xl font-semibold">
                  What is Backend Development? A Beginner’s Guide
                </h1>
              </>
            }
          />

          {/* Blog Content */}
          <ProseKitRenderer contentString={stringifiedContent} />

          <div className="pt-4">
            <hr className="border-t-2 border-gray-200" />
          </div>

          {/* Recommended Blogs Section */}
          <div className="flex flex-col gap-5">
            <h2 className="text-xl md:text-4xl font-semibold">
              Recommended articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedBlogs.map((post) => (
                <BlogCard
                  post={post}
                  key={post.id}
                  className="w-full h-[250px] lg:h-[300px]"
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default BlogDetail;
