import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import api from "../Config/api";
import MiniLocationCard from "../Components/MiniLocationCard";
import type { BusinessLocation } from "../Model/businessLocation";
import { Search, MapPin, Filter } from "lucide-react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import PopupLocationCard from "../Components/popupLocationCard";

function SearchPage() {
  const [isLocation, setIsLocation] = useState<BusinessLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<any>(null);
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(
    null
  );
  const mapRef = useRef<google.maps.Map | null>(null);
  const location = useLocation();

  const initialCenter = location.state?.center || {
    lat: 10.816632639921957,
    lng: 106.73380658226068,
  };
  const [center, setCenter] = useState(initialCenter);

  const containerStyle = {
    width: "100%",
    height: "550px",
  };
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  const onUnmount = useCallback((map: google.maps.Map) => {
    mapRef.current = null;
  }, []);

  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: "AIzaSyD_iw1deyH_-hWDmE7PJK1RWKPle6uT97Q"
    googleMapsApiKey: "AIzaSyBRt3wAQATMzjz8MiJQQfCfAOOkFrtg6AY",
  });

  const fetchLocation = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("location/getAll");
      const locations = response.data.data.content.filter(
        (location: BusinessLocation) => location.status === "ACTIVE"
      );
      setIsLocation(locations);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (searchData: any) => {
    setIsLoading(true);
    setIsSearchResult(true);
    setSearchParams(searchData);

    try {
      const response = await api.post("/search", searchData);
      console.log("Search response:", response.data.data);

      if (
        response.data &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        const locations = response.data.data.filter(
          (location: BusinessLocation) => location.status === "ACTIVE"
        );
        setIsLocation(locations);
      } else {
        // Nếu không có kết quả, hiển thị tất cả sân
        fetchLocation();
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

  // Khi searchParams thay đổi (tức là có search mới), nếu có center mới thì setCenter
  useEffect(() => {
    if (location.state?.center) {
      setCenter(location.state.center);
    }
  }, [location.state]);

  const filteredLocations = isLocation.filter(
    (location) =>
      location.latitude &&
      location.longitude &&
      mapBounds &&
      mapBounds.contains(
        new window.google.maps.LatLng(location.latitude, location.longitude)
      )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="">
        <div className="container mx-auto px-4 pt-6">
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Map bên trái */}
          <div className="md:col-span-3">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onIdle={() => {
                  if (mapRef.current && mapRef.current.getBounds()) {
                    setMapBounds(mapRef.current.getBounds()!);
                  }
                }}
              >
                {/* Marker cho vị trí hiện tại hoặc địa điểm người dùng chọn */}
                {center && (
                  <Marker
                    position={center}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    title="Vị trí của bạn"
                  />
                )}
                {isLocation.map((location) =>
                  location.latitude && location.longitude ? (
                    <Marker
                      key={location.id}
                      position={{
                        lat: location.latitude,
                        lng: location.longitude,
                      }}
                      title={location.name}
                      onClick={() => setSelectedId(location.id)}
                    >
                      {selectedId === location.id && (
                        <InfoWindow
                          position={{
                            lat: location.latitude,
                            lng: location.longitude,
                          }}
                          onCloseClick={() => setSelectedId(null)}
                        >
                          <div style={{ minWidth: 180, maxWidth: 220 }}>
                            <PopupLocationCard location={location} />
                            {/* <button
                              className="mt-2 px-3 py-1 bg-emerald-600 cursor-pointer text-white rounded text-xs"
                              onClick={() => navigate(`/businessLocation/${location.id}`)}
                            >
                              Xem chi tiết
                            </button> */}
                          </div>
                        </InfoWindow>
                      )}
                    </Marker>
                  ) : null
                )}
              </GoogleMap>
            ) : (
              <div className="h-[500px] flex items-center justify-center text-gray-400">
                Đang tải bản đồ...
              </div>
            )}
          </div>
          {/* Card bên phải */}
          <div className="md:col-span-2 flex flex-col gap-4 h-[550px]">
            <div className="h-full overflow-y-auto pr-2">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                </div>
              ) : filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                  <MiniLocationCard key={location.id} location={location} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {isSearchResult
                      ? "Không tìm thấy kết quả"
                      : "Không có địa điểm nào"}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {isSearchResult
                      ? "Không có sân thể thao nào phù hợp với tiêu chí tìm kiếm của bạn."
                      : "Hiện tại chưa có địa điểm nào được đăng ký."}
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
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
