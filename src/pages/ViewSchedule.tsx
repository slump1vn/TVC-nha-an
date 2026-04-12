import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Share2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScheduleView from "@/components/ScheduleView";
import { WeeklySchedule } from "@/components/ScheduleForm";
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { toast } from "sonner";

export default function ViewSchedule() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<WeeklySchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    const docRef = doc(db, "schedules", id);
    
    // Use onSnapshot for real-time updates. 
    // This is superior to a 5s reload as it updates instantly when data changes.
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as WeeklySchedule);
        setLastUpdated(new Date());
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching schedule:", error);
      toast.error("Không thể tải dữ liệu lịch tuần.");
      setLoading(false);
    });

    return () => unsubscribe();
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
