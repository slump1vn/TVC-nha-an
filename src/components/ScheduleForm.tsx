import React, { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "motion/react";

export interface ScheduleEntry {
  id: string;
  date: string;
  className: string;
  diningArea: string;
}

export interface WeeklySchedule {
  weekRange: string;
  entries: ScheduleEntry[];
}

interface ScheduleFormProps {
  initialData?: WeeklySchedule;
  onSubmit: (data: WeeklySchedule) => void;
  isSubmitting?: boolean;
}

const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15);
};

export default function ScheduleForm({ initialData, onSubmit, isSubmitting }: ScheduleFormProps) {
  const [weekRange, setWeekRange] = useState(initialData?.weekRange || "");
  const [entries, setEntries] = useState<ScheduleEntry[]>(
    (initialData && Array.isArray(initialData.entries)) 
      ? initialData.entries 
      : [{ id: generateId(), date: "", className: "", diningArea: "" }]
  );

  React.useEffect(() => {
    if (initialData && Array.isArray(initialData.entries)) {
      setWeekRange(initialData.weekRange || "");
      setEntries(initialData.entries);
    }
  }, [initialData]);

  const addEntry = () => {
    setEntries([
      ...entries,
      { id: generateId(), date: "", className: "", diningArea: "" },
    ]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  const updateEntry = (id: string, field: keyof ScheduleEntry, value: string) => {
    setEntries(
      entries.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ weekRange, entries });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="border-t-4 border-t-[#0054A6]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#0054A6]">
            Tạo Lịch Tuần VietinBank
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="weekRange">Khoảng thời gian tuần (Ví dụ: 08– 14.9.2025)</Label>
              <Input
                id="weekRange"
                placeholder="08– 14.9.2025"
                value={weekRange}
                onChange={(e) => setWeekRange(e.target.value)}
                required
                className="border-[#0054A6]/20 focus-visible:ring-[#0054A6]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Danh sách lớp học</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addEntry}
                  className="flex items-center gap-2 border-[#0054A6] text-[#0054A6] hover:bg-[#0054A6] hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                  Thêm lớp
                </Button>
              </div>

              <AnimatePresence mode="popLayout">
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 border rounded-lg bg-slate-50 relative group"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Ngày diễn ra</Label>
                        <Input
                          placeholder="08 - 12/9"
                          value={entry.date}
                          onChange={(e) => updateEntry(entry.id, "date", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Tên lớp học</Label>
                        <Input
                          placeholder="CBL14S-2506 - Đào tạo tập trung..."
                          value={entry.className}
                          onChange={(e) => updateEntry(entry.id, "className", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-span-3">
                        <Label>Khu vực ăn</Label>
                        <Input
                          placeholder="Tầng 1, Bàn 1 - 5"
                          value={entry.diningArea}
                          onChange={(e) => updateEntry(entry.id, "diningArea", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    {entries.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEntry(entry.id)}
                        className="absolute -top-2 -right-2 bg-white border shadow-sm text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    <div className="absolute top-2 left-2 text-xs font-bold text-slate-400">
                      #{index + 1}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0054A6] hover:bg-[#004488] text-white py-6 text-lg font-bold shadow-lg"
            >
              {isSubmitting ? (
                "Đang lưu..."
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Cập nhật lịch tuần
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
