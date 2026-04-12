import { WeeklySchedule } from "./ScheduleForm";
import { Button } from "@/components/ui/button";

interface ScheduleViewProps {
  data: WeeklySchedule;
}

export default function ScheduleView({ data }: ScheduleViewProps) {
  return (
    <div className="min-h-screen bg-white p-0 md:p-4 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-[1920px] bg-white shadow-2xl overflow-hidden relative border border-slate-200 min-h-screen md:min-h-0">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-8 border-b gap-4">
          <div className="flex items-center gap-4">
            <img 
              src="https://www.vietinbank.vn/sites/vietinbank/img/logo.png" 
              alt="VietinBank Logo" 
              className="h-10 md:h-16 lg:h-20 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-[#ED1C24] uppercase tracking-tight text-center flex-1">
            LỊCH TUẦN ({data.weekRange})
          </h1>
          <div className="hidden md:block w-10 md:w-16 lg:w-20"></div> {/* Spacer for symmetry */}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row flex-1">
          {/* Left Sidebar (Vertical Text) */}
          <div className="bg-[#ED1C24] text-white w-full md:w-12 lg:w-20 flex items-center justify-center py-3 md:py-0 shrink-0">
            <h2 className="text-lg md:text-xl lg:text-3xl font-bold uppercase md:-rotate-90 whitespace-nowrap tracking-widest px-4">
              THÔNG TIN KHU VỰC ĂN
            </h2>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse table-fixed md:table-auto">
              <thead>
                <tr className="bg-[#0054A6] text-white">
                  <th className="p-2 md:p-4 border border-[#0054A6] text-center w-10 md:w-16 lg:w-24 text-sm md:text-base lg:text-xl">TT</th>
                  <th className="p-2 md:p-4 border border-[#0054A6] text-center w-24 md:w-40 lg:w-64 text-sm md:text-base lg:text-xl">Ngày diễn ra Khóa học</th>
                  <th className="p-2 md:p-4 border border-[#0054A6] text-center text-sm md:text-base lg:text-xl">Tên lớp học</th>
                  <th className="p-2 md:p-4 border border-[#0054A6] text-center w-32 md:w-64 lg:w-96 text-sm md:text-base lg:text-xl">Khu vực ăn</th>
                </tr>
              </thead>
              <tbody>
                {data.entries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#E6F0F9]"}
                  >
                    <td className="p-2 md:p-4 border border-slate-200 text-center font-medium text-[#0054A6] text-sm md:text-lg lg:text-2xl">
                      {index + 1}
                    </td>
                    <td className="p-2 md:p-4 border border-slate-200 text-center text-slate-700 text-sm md:text-base lg:text-xl">
                      {entry.date}
                    </td>
                    <td className="p-2 md:p-4 border border-slate-200 text-slate-800 font-medium text-sm md:text-base lg:text-xl">
                      {entry.className}
                    </td>
                    <td className="p-2 md:p-4 border border-slate-200 text-center text-slate-700 text-sm md:text-base lg:text-xl">
                      <div className="whitespace-pre-line">
                        {entry.diningArea}
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Fill empty rows if needed to maintain layout height */}
                {Array.from({ length: Math.max(0, 10 - data.entries.length) }).map((_, i) => (
                  <tr key={`empty-${i}`} className={(data.entries.length + i) % 2 === 0 ? "bg-white" : "bg-[#E6F0F9]"}>
                    <td className="p-2 md:p-4 border border-slate-200 h-12 md:h-16 lg:h-24"></td>
                    <td className="p-2 md:p-4 border border-slate-200"></td>
                    <td className="p-2 md:p-4 border border-slate-200"></td>
                    <td className="p-2 md:p-4 border border-slate-200"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Accent */}
        <div className="h-4 bg-gradient-to-r from-[#0054A6] via-[#ED1C24] to-[#0054A6]"></div>
      </div>

      {/* Print/Share Button (Removed as requested) */}
    </div>
  );
}
