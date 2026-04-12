import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Share2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScheduleView from "@/components/ScheduleView";
import { WeeklySchedule } from "@/components/ScheduleForm";
import { toast } from "sonner";

export default function ViewSchedule() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<WeeklySchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (!id) return;
    
    const fetchSchedule = async () => {
      try {
        const response = await fetch("/api/schedule/latest");
        if (response.ok) {
          const newData = await response.json();
          setData(newData);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();

    // Poll every 5 seconds for updates
    const interval = setInterval(fetchSchedule, 5000);

    return () => clearInterval(interval);
  }, [id]);

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0054A6]" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Không tìm thấy lịch tuần</h2>
        <Link to="/">
          <Button className="bg-[#0054A6]">Quay lại trang chủ</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {lastUpdated && (
        <div className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] text-slate-400 shadow-sm border flex items-center gap-1.5 print:hidden">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          Cập nhật lúc: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
      <ScheduleView data={data} />
    </div>
  );
}
