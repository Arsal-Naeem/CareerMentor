import {
  EventsGrid,
  EventsHeader,
} from "@/components/admin/events/EventsComponents";
import { SearchBar } from "@/components/search/SearchBar";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllEvents, DeleteEvent } from "@/apiService/Events";
import { CustomPagination } from "@/components/CustomPagination";
import useDebounce from "@/hooks/debouncing";

const AdminEvents = () => {
  usePageTitle("Admin Events");

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [registrationType, setRegistrationType] = useState("all");

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = GetAllEvents({
    page,
    limit: 9,
    search: debouncedSearch,
    status,
    registration_type: registrationType,
  });

  const deleteEvent = DeleteEvent();

  const events = data?.events || [];

  const handleEventDelete = (eventId) => {
    deleteEvent.mutate(eventId);
  };

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
            onAddButtonClick={() => navigate("/admin/dashboard/events/add")}
          />

          <SearchBar
            value={search}
            wrapperClassName="flex-1 max-w-md"
            variant="compact"
            onSearch={handleSearchChange}
          />

          <EventsGrid
            events={events}
            isLoading={isLoading}
            onDelete={handleEventDelete}
          />
        </div>
        {Boolean(data?.pagination) && events.length > 0 && (
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

export default AdminEvents;
