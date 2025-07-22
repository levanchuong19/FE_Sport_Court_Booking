import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../Config/api";
import LocationCard from "../Components/locationCard";
import type { BusinessLocation } from "../Model/businessLocation";
import { Search, MapPin, Filter } from "lucide-react";

function BusinessLocationPage() {
  const [isLocation, setIsLocation] = useState<BusinessLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<any>(null);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const location = useLocation();

  const fetchLocation = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("location/getAll");
      setIsLocation(response.data.data.content);
      console.log(response.data.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(isLocation.length)

  const handleSearch = async (searchData: any) => {
    setIsLoading(true);
    setIsSearchResult(true);
    setSearchParams(searchData);
    
    try {
      const response = await api.post("/search", searchData);
      console.log("Search response:", response.data.data);
      
      if (response.data) {
        const locations = response.data.data.filter((location: BusinessLocation) => location.status === "ACTIVE");
        console.log(  "location",locations)
        setIsLocation(locations);
      } else {
        setIsLocation([]);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setIsLocation([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if we have search data from navigation
    if (location.state && location.state.searchResults) {
      handleSearch(location.state.searchData);
    } else {
      fetchLocation();
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {isSearchResult ? "Kết quả tìm kiếm" : "Tất cả địa điểm"}
              </h1>
              {isSearchResult && searchParams && (
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Search className="w-4 h-4 mr-2" />
                  <span>
                    {searchParams.location ? (
                      <>
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {searchParams.location}
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Vị trí hiện tại của bạn
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setIsSearchResult(false);
                setSearchParams(null);
                fetchLocation();
              }}
              className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Xem tất cả
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : isLocation.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLocation.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isSearchResult ? "Không tìm thấy kết quả" : "Không có địa điểm nào"}
            </h3>
            <p className="text-gray-500 mb-6">
              {isSearchResult 
                ? "Không có sân thể thao nào phù hợp với tiêu chí tìm kiếm của bạn."
                : "Hiện tại chưa có địa điểm nào được đăng ký."
              }
            </p>
            {isSearchResult && (
              <button
                onClick={() => {
                  setIsSearchResult(false);
                  setSearchParams(null);
                  fetchLocation();
                }}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Xem tất cả địa điểm
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessLocationPage;
