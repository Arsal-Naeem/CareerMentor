import { GetAllCareers } from "@/apiService/Careers";
import {
  AdminCareerCard,
  AdminCareersSkeleton,
} from "@/components/admin/careers/AdminCareersComponents";
import { EventsHeader } from "@/components/admin/events/EventsComponents";
import { CustomPagination } from "@/components/CustomPagination";
import { SelectInput } from "@/components/inputs/SelectInput/SelectInput";
import { SearchBar } from "@/components/search/SearchBar";
import useDebounce from "@/hooks/debouncing";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Compass } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCareers = () => {
  usePageTitle("Admin Careers");

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("DESC");
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = GetAllCareers({
    page: page,
    limit: limit,
    search: debouncedSearch,
    status: status === "all" ? "" : status,
    sortBy: sortBy,
    order: order,
  });

  const careers = data?.careers || [];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-4">
          <EventsHeader
            icon={<Compass className="h-7 w-7 text-white" />}
            iconContainerClassName="!bg-custom-orange-light"
            title="Career Explorer Management"
            buttonTitle="Add Career"
            onAddButtonClick={() => navigate("/admin/dashboard/careers/add")}
            buttonClassName="bg-custom-orange-light"
            subtitle="Create, update, or manage career paths and guidance"
          />

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <SearchBar
              value={search}
              wrapperClassName="flex-1 max-w-md"
              variant="compact"
              placeholder="Search careers here..."
              onSearch={handleSearchChange}
            />

            <SelectInput
              value={status}
              onChange={(value) => {
                setStatus(value);
                setPage(1);
              }}
              placeholder="All Status"
              wrapperClassName="w-auto"
              labelClassName="hidden"
              inputWrapperClassName="gap-0"
              options={[
                { value: "all", label: "All Status" },
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
              ]}
            />

            <SelectInput
              value={order}
              onChange={(value) => {
                setOrder(value);
                setPage(1);
              }}
              placeholder="Newest First"
              wrapperClassName="w-auto"
              labelClassName="hidden"
              inputWrapperClassName="gap-0"
              options={[
                { value: "DESC", label: "Newest First" },
                { value: "ASC", label: "Oldest First" },
              ]}
            />
          </div>

          {isLoading ? (
            <AdminCareersSkeleton />
          ) : careers.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-500 text-lg">No Careers Found</p>
            </div>
          ) : (
            careers.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {careers.map((career) => (
                  <AdminCareerCard key={career.id} career={career} />
                ))}
              </div>
            )
          )}
        </div>
        {Boolean(data?.pagination) && careers.length > 0 && (
          <CustomPagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={data.pagination.totalPages}
          />
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminCareers;
