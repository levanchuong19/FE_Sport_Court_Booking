import { useEffect, useState } from "react";
import { Button, Card, Row, Col, Tag, Typography, Divider, Empty, Input, Select } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  HomeOutlined,
  ExpandOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { Court } from "../Model/court";
import api from "../Config/api";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Filter, ListFilter } from "lucide-react";
import CourtCard from "../Components/courtCard";

const { Title, Text } = Typography;
const { Option } = Select;

const sportMap: Record<string, string> = {
  FOOTBALL: "Bóng đá",
  TENNIS: "Tennis",
  BADMINTON: "Cầu lông",
  BASKETBALL: "Bóng rổ",
};

const getSportColor = (sport: string) => {
  const colors: Record<string, string> = {
    "Cầu lông": "blue",
    "Bóng rổ": "orange",
    Tennis: "green",
    "Bóng đá": "red",
  };
  return colors[sport] || "default";
};

const sortOptions = [
  { value: "featured", label: "Nổi bật" },
  { value: "name_asc", label: "Tên từ A-Z" },
  { value: "name_desc", label: "Tên từ Z-A" },
  { value: "price_asc", label: "Giá tăng dần" },
  { value: "price_desc", label: "Giá giảm dần" },
];

const CourtBooking: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [sortType, setSortType] = useState<string>("featured");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await api.get("court/getAll");
      setCourts(res.data?.data?.content || []);
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      setCourts([]);
    } finally {
      setHasSearched(true);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  // Lọc theo loại sân
  const filteredCourts = selectedType
    ? courts.filter((court) => court.courtType === selectedType)
    : courts;

  // Sắp xếp
  const sortedCourts = [...filteredCourts].sort((a, b) => {
    const getPrice = (court: Court) => court.prices?.find(p => p.priceType === "HOURLY")?.price || 0;
    const getRating = (court: Court) => court.businessLocation?.rating || 0;
    if (sortType === "price_asc") return getPrice(a) - getPrice(b);
    if (sortType === "price_desc") return getPrice(b) - getPrice(a);
    if (sortType === "rating_desc") return getRating(b) - getRating(a);
    if (sortType === "rating_asc") return getRating(a) - getRating(b);
    if (sortType === "name_asc") return a.courtName.localeCompare(b.courtName);
    if (sortType === "name_desc") return b.courtName.localeCompare(a.courtName);
    // 'featured' giữ nguyên thứ tự gốc
    return 0;
  });

  // Gom nhóm lại theo loại sân (sau khi đã lọc/sắp xếp)
  const groupCourtsByType = (list: Court[]) => {
    return list.reduce((acc, court) => {
      const key = court.courtType;
      if (!acc[key]) acc[key] = [];
      acc[key].push(court);
      return acc;
    }, {} as Record<string, Court[]>);
  };

  // Nếu đã chọn loại sân thì chỉ hiển thị 1 nhóm, còn không thì hiển thị tất cả nhóm
  const groupedCourts = selectedType
    ? { [selectedType]: sortedCourts }
    : groupCourtsByType(sortedCourts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <section className="py-12 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tất cả loại sân thể thao</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Khám phá và đặt sân thể thao yêu thích của bạn với giá tốt nhất
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input placeholder="Tìm kiếm sân theo tên, địa điểm..." className="pl-10 h-10 border-gray-300" />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input placeholder="Khu vực" className="pl-10 h-10 border-gray-300" />
                  </div>
                </div>
                <button className="bg-green-600 h-10 pl-10 pr-10 py-4 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-green-700">
                  <Search className="w-4 h-4 mr-2 text-white"/>
                  <span className="text-white text-xs">Tìm kiếm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Sort row - BELOW section */}
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 border-b border-gray-300 pb-2 mb-8">
      <div className="flex flex-wrap gap-4 mt-8 mb-6 items-center justify-center">
        {/* Filter button */}
        <Button className="flex items-center gap-2 border rounded-lg px-4 py-2 bg-white hover:bg-gray-50 shadow-none">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Bộ lọc</span>
        </Button>
        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-gray-700" />
          <span className="font-medium text-gray-700">Xếp theo:</span>
          <Select
            value={sortType}
            style={{ minWidth: 140 }}
            onChange={v => setSortType(v)}
            dropdownMatchSelectWidth={false}
          >
            {sortOptions.map(opt => (
              <Option value={opt.value} key={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        </div>
        {/* Court type filter (optional, can be moved into filter modal if needed) */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Loại sân:</span>
          <Select
            allowClear
            placeholder="Tất cả"
            style={{ minWidth: 120 }}
            value={selectedType}
            onChange={v => setSelectedType(v)}
          >
            {Object.entries(sportMap).map(([key, label]) => (
              <Option value={key} key={key}>{label}</Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2 mr-8 align-middle">
          <span className="font-medium text-gray-700">Tìm thấy {courts.length} sân thể thao</span>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {hasSearched && courts.length === 0 ? (
          <Card
            style={{
              textAlign: "center",
              padding: "48px",
              borderRadius: "16px",
            }}
          >
            <Empty description="Không tìm thấy sân thể thao phù hợp" />
          </Card>
        ) : (
          Object.entries(groupedCourts).map(([type, list]) => (
            <div key={type} style={{ marginBottom: 48 }}>
              <Title level={2} style={{ fontWeight: "bold", marginBottom: 24 }}>
                Sân {sportMap[type]} ({list.length} sân)
              </Title>
              <Row gutter={[24, 24]}>
                {list.slice(0, 3).map((court, index) => (
                  <Col
                    xs={24}
                    md={12}
                    lg={8}
                    key={index}
                    style={{ display: "flex" }}
                  >
                    <CourtCard court={court} />
                  </Col>
                ))}
              </Row>
              {list.length > 3 && (
                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <Button type="link">Xem tất cả sân {sportMap[type]}</Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourtBooking;
