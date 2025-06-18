import type { Court } from "../Model/court";

function CourtCard({ court }: { court: Court }) {
  return (
    <div className="w-full">
        <div className="bg-white rounded-xl shadow hover:shadow-md flex flex-col">
            <img src={court.images[0]} alt={court.courtName} className="object-cover w-full h-48 rounded-t-xl" />
            <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg">{court.courtName}</h3>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-auto">
                <span className="font-medium text-emerald-600">
                    {court.price}
                </span>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-semibold">
                    Đặt ngay
                </button>
            </div>
        </div>
    </div>
  );
}

export default CourtCard;