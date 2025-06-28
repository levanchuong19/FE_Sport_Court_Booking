import { Button, Card, Tag, Tooltip } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import Meta from "antd/es/card/Meta";
import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  Share2,
  Star,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { BusinessLocation } from "../Model/businessLocation";
import formatDate from "../Utils/date";

// import "./styles.css";

function LocationCard({ location }: { location: BusinessLocation }) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "AVAILABLE":
        return "success";
      case "BOOKED":
        return "error";
      default:
        return "default";
    }
  };

  // const getPriceRangeColor = (range: string) => {
  //   switch (range) {
  //     case "$":
  //       return "text-green-600";
  //     case "$$":
  //       return "text-yellow-600";
  //     case "$$$":
  //       return "text-red-600";
  //     default:
  //       return "text-gray-600";
  //   }
  // };

  const amenities = [
    {
      icon: <MapPin className="h-4 w-4" />,
      label: location.address,
      tooltip: "Địa điểm",
    },
    {
      icon: <Clock className="h-4 w-4" />,
      label: location.openTime + " - " + location.closeTime,
      tooltip: "Thời gian hoạt động",
    },
  ];

  const handleBooking = () => {
    navigate(`/location/${location.id}`);
  };

  return (
    <Card
      hoverable
      className="w-full max-w-sm mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-lg"
      cover={
        <div className="relative h-48">
          {/* <Swiper
            className="h-full"
            pagination={{
              clickable: true,
            }}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {location.images?.map((image) => (
              <SwiperSlide key={image.id}>
                <img 
                  src={image.imageUrl} 
                  alt={court.courtName}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper> */}
          <img
            src={location.images}
            alt={location.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 p-2 flex justify-between z-20">
            <Tag color={getStatusColor(location.status)} className="m-0">
              {location.status}
            </Tag>
          </div>
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="small"
              variant="outlined"
              className="h-8 w-8 p-0 bg-red-500 text-white"
            >
              <Heart className="h-4 w-4 text-white" />
            </Button>
            <Button
              size="small"
              variant="outlined"
              className="h-8 w-8 p-0 bg-red-500 text-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      }
      actions={[
        <Button
          //   type="primary"
          className="w-11/12 mx-auto font-bold"
          disabled={location.status !== "ACTIVE"}
          onClick={handleBooking}
        >
          {location.status === "ACTIVE" ? "Xem chi tiết" : "Đã được đặt"}
        </Button>,
      ]}
    >
      <Meta
        title={
          <div className="flex justify-between items-start mb-2">
            {/* <h3 className="text-lg font-semibold text-black">{location.name}</h3> */}
            <div className="flex items-center justify-between w-full">
              <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                {location.name}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {/* <span className="text-sm font-medium">{location.rating}</span>
                        <span className="text-sm text-gray-500">({location.reviews})</span> */}
                  <span className="text-sm font-medium">4.8</span>
                  <span className="text-sm text-gray-500">(189 đánh giá)</span>
                </div>
              </div>
            </div>
          </div>
        }
        description={
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              {amenities.map((item, index) => (
                <Tooltip key={index} title={item.tooltip}>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </div>
                </Tooltip>
              ))}
              <div className="flex items-center space-x-2">
                <img
                  src={
                    location.owner.image ||
                    "https://thanhtra.com.vn/images/avatar-default.png?id=420048c5169f5847774bafb5e8b641b4"
                  }
                  alt={location.owner.fullName}
                  className="h-6 w-6 rounded-full"
                />
                {/* <AvatarFallback className="text-xs">{location.owner.name.charAt(0)}</AvatarFallback> */}

                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-1" />
                  <span className="truncate">{location.owner.fullName}</span>
                </div>
              </div>
            </div>
            {location.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {location.description}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Tạo: {formatDate(location.createdAt)}</span>
              </div>
              <span>Cập nhật: {formatDate(location.updatedAt)}</span>
            </div>
          </div>
        }
      />
    </Card>
  );
}

export default LocationCard;
