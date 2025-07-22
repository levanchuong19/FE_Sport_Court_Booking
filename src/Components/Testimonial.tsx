import { useEffect, useState } from "react";
import axios from "axios";

interface Feedback {
  id: string;
  overallRating: number;
  comment: string;
  account: {
    fullName: string;
  } | null;
}

export default function Testimonial() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/feedback/random")
      .then((res) => {
        if (res.data.status) {
          setFeedbacks(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Lỗi lấy feedback:", err);
      });
  }, []);

  return (
    <section className="py-16 bg-emerald-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-10">
          Người dùng nói gì về sân bóng?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow flex flex-col items-center"
            >
              <div className="flex mb-2">
                {Array(Math.round(feedback.overallRating))
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">★</span>
                  ))}
              </div>
              <p className="italic mb-4 text-center">"{feedback.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                  {feedback.account?.fullName?.charAt(0) ?? "?"}
                </div>
                <div>
                  <div className="font-medium">{feedback.account?.fullName ?? "Ẩn danh"}</div>
                  <div className="text-sm text-gray-500">Người dùng</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
