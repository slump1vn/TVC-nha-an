import { WeeklySchedule } from "./ScheduleForm";
import { Button } from "@/components/ui/button";

interface ScheduleViewProps {
  data: WeeklySchedule;
}

export default function ScheduleView({ data }: ScheduleViewProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-white overflow-hidden relative flex-1 flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b shrink-0">
          <div className="hidden md:block w-20 md:w-32 lg:w-48"></div> {/* Left spacer for symmetry */}
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-[#ED1C24] uppercase tracking-tight text-center flex-1">
            LỊCH TUẦN ({data.weekRange})
          </h1>
          <div className="flex justify-end w-20 md:w-32 lg:w-48">
            <img 
              src="/vietinbank-school-logo.png" 
              alt="VietinBank School Logo" 
              className="h-10 md:h-16 lg:h-20 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
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
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#0054A6] text-white">
                  <th className="p-3 md:p-6 border border-[#0054A6] text-center w-12 md:w-20 lg:w-32 text-base md:text-xl lg:text-3xl font-black">TT</th>
                  <th className="p-3 md:p-6 border border-[#0054A6] text-center w-28 md:w-48 lg:w-80 text-base md:text-xl lg:text-3xl font-black">Ngày diễn ra Khóa học</th>
                  <th className="p-3 md:p-6 border border-[#0054A6] text-center text-base md:text-xl lg:text-3xl font-black">Tên lớp học</th>
                  <th className="p-3 md:p-6 border border-[#0054A6] text-center w-36 md:w-72 lg:w-[500px] text-base md:text-xl lg:text-3xl font-black">Khu vực ăn</th>
                </tr>
              </thead>
              <tbody>
                {data.entries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#E6F0F9]"}
                  >
                    <td className="p-3 md:p-6 border border-slate-300 text-center font-bold text-[#0054A6] text-lg md:text-2xl lg:text-4xl">
                      {index + 1}
                    </td>
                    <td className="p-3 md:p-6 border border-slate-300 text-center text-slate-900 font-bold text-base md:text-xl lg:text-3xl">
                      {entry.date}
                    </td>
                    <td className="p-3 md:p-6 border border-slate-300 text-slate-900 font-extrabold text-base md:text-xl lg:text-3xl leading-tight">
                      {entry.className}
                    </td>
                    <td className="p-3 md:p-6 border border-slate-300 text-center text-slate-900 font-bold text-base md:text-xl lg:text-3xl">
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
        <div className="h-2 bg-gradient-to-r from-[#0054A6] via-[#ED1C24] to-[#0054A6] shrink-0"></div>
      </div>

      {/* Print/Share Button (Removed as requested) */}
    </div>
  );
}
