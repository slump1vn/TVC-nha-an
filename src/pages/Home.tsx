import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScheduleForm, { WeeklySchedule } from "@/components/ScheduleForm";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, LogOut, Loader2 } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [initialData, setInitialData] = useState<WeeklySchedule | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Check session on mount
  useEffect(() => {
    try {
      const session = sessionStorage.getItem("vb_session");
      if (session === "true") {
        setIsLoggedIn(true);
        fetchLatestData();
      }
    } catch (e) {
      console.error("Session storage access failed:", e);
    }
  }, []);

  const fetchLatestData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/schedule/latest");
      if (response.ok) {
        const data = await response.json();
        if (data && typeof data === 'object') {
          setInitialData(data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        try {
          sessionStorage.setItem("vb_session", "true");
        } catch (e) {
          console.error("Failed to set session storage:", e);
        }
        fetchLatestData();
        toast.success("Đăng nhập thành công!");
      } else {
        toast.error("Sai tên đăng nhập hoặc mật khẩu!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Lỗi kết nối máy chủ!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    try {
      sessionStorage.removeItem("vb_session");
    } catch (e) {
      console.error("Failed to remove session storage:", e);
    }
    toast.info("Đã đăng xuất");
  };

  const handleSubmit = async (data: WeeklySchedule) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/schedule/latest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Đã cập nhật lịch tuần thành công!");
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
      toast.error("Có lỗi xảy ra khi cập nhật lịch tuần.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-t-4 border-t-[#0054A6]">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-[#0054A6]/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-[#0054A6]" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#0054A6]">
              Đăng nhập hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="nu.ttb"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#0054A6] hover:bg-[#004488]">
                Đăng nhập
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container px-4">
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="outline" 
            onClick={() => window.open('/view/latest', '_blank')}
            className="border-[#0054A6] text-[#0054A6] hover:bg-[#0054A6] hover:text-white"
          >
            Xem lịch tuần hiện tại
          </Button>
          <Button variant="ghost" onClick={handleLogout} className="text-slate-500 hover:text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#0054A6] mb-4">
            Cập nhật sơ đồ bàn ăn
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Chào mừng bạn. Bạn có thể cập nhật sơ đồ bàn ăn tại đây.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#0054A6]" />
          </div>
        ) : (
          <ScheduleForm initialData={initialData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        )}
      </div>
    </div>
  );
}
