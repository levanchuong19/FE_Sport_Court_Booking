import { Button, Card, Tag, Tooltip } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import type { Court } from "../Model/court";
import Meta from "antd/es/card/Meta";
import { Clock, MapPin, Users } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import formatVND from "../Utils/currency";

// import "./styles.css";

function CourtCard({ court }: { court: Court }) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "success";
      case "BOOKED":
        return "error";
      default:
        return "default";
    }
  };

  const amenities = [
    {
      icon: <MapPin className="h-4 w-4" />,
      label: court.businessLocation?.name || court.address,
      tooltip: "Địa điểm",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: `${court.maxPlayers} người`,
      tooltip: "Sức chứa",
    },
    {
      icon: <Clock className="h-4 w-4" />,
      label: "24/7",
      tooltip: "Thời gian hoạt động",
    },
  ];

  const handleBooking = () => {
    navigate(`/booking/${court.id}`);
  };

  return (
    <Card
      hoverable
      className="w-full max-w-sm mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-lg"
      cover={
        <div className="relative h-48">
          <Swiper
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
            {court?.images?.map((image) => (
              <SwiperSlide key={image?.id}>
                <img
                  src={image?.imageUrl}
                  alt={court?.courtName}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-0 left-0 right-0 p-2 flex justify-between z-20">
            <Tag color={getStatusColor(court.courtType)} className="m-0">
              {court.courtType}
            </Tag>
            <Tag color={getStatusColor(court.status)} className="m-0">
              {court.status === "AVAILABLE" ? "Có sẵn" : "Đã đặt"}
            </Tag>
          </div>
        </div>
      }
      actions={[
        <Button
          type="primary"
          className="w-11/12 mx-auto"
          disabled={court.status !== "AVAILABLE"}
          onClick={handleBooking}
        >
          {court.status === "AVAILABLE" ? "Đặt sân ngay" : "Đã được đặt"}
        </Button>,
      ]}
    >
      <Meta
        title={
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold">{court.courtName}</h3>
              <p className="text-sm text-gray-500">
                {court.businessLocation?.address}
              </p>
            </div>
            <div className="text-lg font-bold text-emerald-600">
              {formatVND(court.prices?.[0].price)}
              <span className="text-sm text-gray-500">/giờ</span>
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
            </div>
            {court.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {court.description}
              </p>
            )}
          </div>
        }
      />
    </Card>
  );
}

export default CourtCard;
