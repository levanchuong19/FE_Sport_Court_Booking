import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Tag, Typography, Divider, Empty } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  HomeOutlined,
  ExpandOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import type { Court } from "../Model/court";
import api from "../Config/api";

const { Title, Text } = Typography;

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

const CourtBooking: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await api.get("/api/court/getAll");
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

  const groupCourtsByType = (list: Court[]) => {
    return list.reduce((acc, court) => {
      const key = court.courtType;
      if (!acc[key]) acc[key] = [];
      acc[key].push(court);
      return acc;
    }, {} as Record<string, Court[]>);
  };

  const groupedCourts = groupCourtsByType(courts);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgba(0,208,132,1) 0%, rgba(0,208,132,0) 100%)",
        padding: "24px 0",
      }}
    >
      {/* Header hero animated */}
      <div
        className="animate__animated animate__fadeInUp"
        style={{
          maxWidth: "1100px",
          margin: "0 auto 48px",
          borderRadius: 24,
          overflow: "hidden",
          background: "linear-gradient(135deg, #e0f7f4, #ccf0e9)",
          display: "flex",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "40px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Title
            style={{ fontSize: "2.4rem", color: "#006e51", marginBottom: 12 }}
          >
            🏟️ Tìm Sân Thể Thao
          </Title>
          <Text style={{ fontSize: 16, color: "#333" }}>
            Đặt sân thể thao tiện lợi, nhanh chóng và hiện đại tại TP.HCM với
            SportZone.
          </Text>
        </div>
        <div
          style={{
            flex: 1.2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "24px",
          }}
        >
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvZyHRhnoFpPhEYu5EZBgUOCcwoHU8bz5wJtZpvShtATAY6f8tqPm0cvnZXR0CmnJVjwN2Xwsdp4XNHVgUeQuISupRB_URCkCjWiUsKhBGX1nXmgQ_KxZxahRHsRa0_3dcvcxw7JYQiw2bIVYjhuFJfpbvyP6T7rVQDkhDf07eXI9HoCYknl5M_KkLO9Q/s1600/(%20Anhpng.com%20)%20B%C3%93NG%20%C4%90%C3%81%20(89).png"
            alt="sports illustration"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
            }}
          />
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
                    <Card
                      hoverable
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: "16px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        width: "100%",
                      }}
                      cover={
                        <div style={{ position: "relative", height: "200px" }}>
                          <img
                            alt={court.courtName}
                            src={
                              court.images?.[0]?.imageUrl?.startsWith("http")
                                ? court.images[0].imageUrl
                                : "https://dungcutheduc.vn/images/San-bong-da-Futsal.jpg"
                            }
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                            }}
                          />
                          <Tag
                            color={getSportColor(sportMap[court.courtType])}
                            style={{ position: "absolute", top: 12, right: 12 }}
                          >
                            {sportMap[court.courtType]}
                          </Tag>
                        </div>
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                        }}
                      >
                        <Title level={4} style={{ margin: 0 }}>
                          {court.courtName}
                        </Title>
                        <div>
                          <InfoCircleOutlined />{" "}
                          <Text type="secondary">{court.description}</Text>
                        </div>
                        <div>
                          <UserOutlined />{" "}
                          <Text type="secondary">{court.maxPlayers} người</Text>
                        </div>
                        <div>
                          <ExpandOutlined />{" "}
                          <Text type="secondary">
                            {court.length}m x {court.width}m
                          </Text>
                        </div>
                        <div>
                          <DollarOutlined />{" "}
                          <Text strong style={{ color: "#f5222d" }}>
                            {court.prices?.[0]?.price?.toLocaleString("vi-VN")}
                            đ/giờ
                          </Text>
                        </div>
                        <div>
                          <HomeOutlined />{" "}
                          <Text type="secondary">
                            Xây dựng năm {court.yearBuild}
                          </Text>
                        </div>
                        <Divider style={{ margin: "16px 0" }} />
                        <Button
                          type="primary"
                          block
                          style={{
                            marginTop: "auto",
                            background:
                              "linear-gradient(135deg, #00b09b, #006E51)",
                            border: "none",
                            fontWeight: "bold",
                          }}
                        >
                          Đặt sân ngay
                        </Button>
                      </div>
                    </Card>
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
