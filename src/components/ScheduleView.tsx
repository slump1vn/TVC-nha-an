import { WeeklySchedule } from "./ScheduleForm";
import { Button } from "@/components/ui/button";

interface ScheduleViewProps {
  data: WeeklySchedule;
}

export default function ScheduleView({ data }: ScheduleViewProps) {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <div className="w-full bg-white relative flex-1 flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="flex justify-between items-center p-2 md:p-4 border-b shrink-0">
          <div className="hidden md:block w-16 md:w-24 lg:w-32"></div>
          <h1 className="text-lg md:text-2xl lg:text-4xl font-black text-[#ED1C24] uppercase tracking-tight text-center flex-1">
            LỊCH TUẦN ({data.weekRange})
          </h1>
          <div className="flex justify-end w-16 md:w-24 lg:w-32">
            <img 
              src="/vietinbank-school-logo.png" 
              alt="VietinBank School Logo" 
              className="h-8 md:h-12 lg:h-16 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Left Sidebar (Vertical Text) */}
          <div className="bg-[#ED1C24] text-white w-full md:w-10 lg:w-16 flex items-center justify-center py-2 md:py-0 shrink-0">
            <h2 className="text-sm md:text-lg lg:text-2xl font-bold uppercase md:-rotate-90 whitespace-nowrap tracking-widest px-2">
              THÔNG TIN KHU VỰC ĂN
            </h2>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#0054A6] text-white">
                  <th className="p-2 md:p-3 border border-[#0054A6] text-center w-10 md:w-16 lg:w-24 text-sm md:text-lg lg:text-2xl font-black">TT</th>
                  <th className="p-2 md:p-3 border border-[#0054A6] text-center w-24 md:w-40 lg:w-64 text-sm md:text-lg lg:text-2xl font-black">Ngày diễn ra Khóa học</th>
                  <th className="p-2 md:p-3 border border-[#0054A6] text-center text-sm md:text-lg lg:text-2xl font-black">Tên lớp học</th>
                  <th className="p-2 md:p-3 border border-[#0054A6] text-center w-32 md:w-64 lg:w-[400px] text-sm md:text-lg lg:text-2xl font-black">Khu vực ăn</th>
                </tr>
              </thead>
              <tbody>
                {data.entries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#E6F0F9]"}
                  >
                    <td className="p-2 md:p-4 border border-slate-300 text-center font-bold text-[#0054A6] text-base md:text-xl lg:text-3xl">
                      {index + 1}
                    </td>
                    <td className="p-2 md:p-4 border border-slate-300 text-center text-slate-900 font-bold text-sm md:text-lg lg:text-2xl">
                      {entry.date}
                    </td>
                    <td className="p-2 md:p-4 border border-slate-300 text-slate-900 font-extrabold text-sm md:text-lg lg:text-2xl leading-tight">
                      {entry.className}
                    </td>
                    <td className="p-2 md:p-4 border border-slate-300 text-center text-slate-900 font-bold text-sm md:text-lg lg:text-2xl">
                      <div className="whitespace-pre-line">
                        {entry.diningArea}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Accent */}
        <div className="h-1.5 bg-gradient-to-r from-[#0054A6] via-[#ED1C24] to-[#0054A6] shrink-0"></div>
      </div>
    </div>
  );
}
