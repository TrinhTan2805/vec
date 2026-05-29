import React, { useState, useRef, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldAlert, Key, ArrowLeft, CheckCircle, Smartphone } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const TrafficLightIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="10" y="2" width="4" height="20" rx="1" />
    <rect x="6" y="4" width="12" height="4" rx="1" />
    <rect x="6" y="10" width="12" height="4" rx="1" />
    <rect x="6" y="16" width="12" height="4" rx="1" />
  </svg>
);

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  // Security 2FA states & alerts
  const [step, setStep] = useState(1); // 1: Username/Password, 2: 2FA Verification
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Clear messages on input change
  useEffect(() => {
    setErrorMessage("");
  }, [username, password, step]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    
    if (!username || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    if (loginAttempts >= 5) {
      setErrorMessage("Tài khoản đã bị tạm khóa do nhập sai mật khẩu quá 5 lần. Vui lòng liên hệ Quản trị viên.");
      return;
    }

    if (username.toLowerCase() === "admin" && password === "abcd") {
      setSuccessMessage("Thông tin đăng nhập hợp lệ! Đang chuẩn bị xác thực 2 lớp...");
      setTimeout(() => {
        setStep(2);
        setSuccessMessage("");
      }, 1000);
    } else {
      const nextAttempts = loginAttempts + 1;
      setLoginAttempts(nextAttempts);
      if (nextAttempts >= 5) {
        setErrorMessage("Tài khoản của bạn đã bị khóa do nhập sai 5 lần liên tiếp!");
      } else {
        setErrorMessage(`Tên đăng nhập hoặc mật khẩu không đúng. Bạn còn ${5 - nextAttempts} lần thử.`);
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const code = otp.join("");
    
    if (code.length < 6) {
      setErrorMessage("Vui lòng nhập đầy đủ 6 chữ số mã xác thực.");
      return;
    }

    if (code === "123456") {
      setSuccessMessage("Xác thực 2 lớp thành công! Đang chuyển hướng...");
      localStorage.setItem("auth_token", "demo_token");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } else {
      setErrorMessage("Mã xác thực OTP không đúng hoặc đã hết hạn.");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-900 font-sans">
      {/* Left Box - Image & Branding (Hidden on mobile, visible on lg screens) */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-7/12 items-end justify-start overflow-hidden">
        {/* Cinematic Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
          style={{ backgroundImage: "url('/images/login-bg-bridge.png')" }}
        />
        
        {/* Dynamic Overlays for depth and text legibility - adjusted for brightness */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-slate-900" />
        
        {/* Technological Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwIDBMIDAgMCAwIDYwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzZjRmNTYiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-[0.15]" />

        {/* Branding Title positioned thoughtfully */}
        <div className="relative z-10 p-12 lg:p-16 xl:p-24 w-full animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/40 border border-slate-600/30 backdrop-blur-md mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A8CC] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A8CC]"></span>
            </span>
            <span className="text-white/90 text-[13px] font-semibold tracking-wider uppercase">Hệ thống đang hoạt động</span>
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.15] mb-4 drop-shadow-2xl">
            QUẢN LÝ TÀI SẢN VÀ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8CC] to-[#20d8f0]">BẢO TRÌ, BẢO DƯỠNG</span> 
          </h1>
          <p className="max-w-md text-slate-300 text-lg font-medium leading-relaxed drop-shadow-md">
            Phần mềm quản lý tài sản và quản lý bảo trì, bảo dưỡng trên các tuyến đường cao tốc do VEC quản lý.
          </p>
        </div>
      </div>

      {/* Right Box - Login / 2FA Form */}
      <div className="flex w-full lg:w-1/2 xl:w-5/12 items-center justify-center relative p-6 sm:p-12 overflow-hidden bg-slate-900 border-l border-slate-800/50">
        
        {/* Subtle glow behind the form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00A8CC]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-[440px] z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both border border-slate-700/40 bg-slate-800/30 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-3xl">
          
          {step === 1 ? (
            /* ==================== STEP 1: CREDENTIALS ==================== */
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="size-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 shadow-xl flex items-center justify-center mb-6 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-[#00A8CC]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <TrafficLightIcon className="size-8 text-[#00A8CC] drop-shadow-[0_0_10px_rgba(0,168,204,0.7)] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-wide uppercase">Đường Cao Tốc VEC</h2>
                <p className="text-slate-400 text-sm mt-2 font-medium">Bảo mật truy cập hệ thống nghiệp vụ</p>
              </div>

              {/* Styled Notification Banners */}
              {errorMessage && (
                <div className="flex items-start gap-2.5 p-3.5 bg-red-950/40 border border-red-800/50 text-red-200 text-[13px] rounded-xl animate-shake">
                  <ShieldAlert className="size-4 shrink-0 mt-0.5 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="flex items-start gap-2.5 p-3.5 bg-emerald-950/40 border border-emerald-800/50 text-emerald-200 text-[13px] rounded-xl">
                  <CheckCircle className="size-4 shrink-0 mt-0.5 text-emerald-500" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username/Email Input */}
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-[#00A8CC] transition-colors z-10" />
                  <Input 
                    type="text" 
                    placeholder="Tài khoản hoặc Email" 
                    className="pl-12 h-13 w-full bg-slate-800/80 border border-slate-600/50 text-white placeholder:text-slate-400 focus:bg-slate-800 focus:border-[#00A8CC]/50 focus:ring-1 focus:ring-[#00A8CC]/50 transition-all rounded-xl text-[14px]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-[#00A8CC] transition-colors z-10" />
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Mật khẩu bảo mật" 
                    className="pl-12 pr-12 h-13 w-full bg-slate-800/80 border border-slate-600/50 text-white placeholder:text-slate-400 focus:bg-slate-800 focus:border-[#00A8CC]/50 focus:ring-1 focus:ring-[#00A8CC]/50 transition-all rounded-xl text-[14px]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00A8CC] transition-colors z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>

                {/* Remember & Forgot options */}
                <div className="flex items-center justify-between pt-1 mb-4">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-500 bg-slate-800 text-[#00A8CC] focus:ring-[#00A8CC] focus:ring-offset-slate-900" />
                    <span className="text-[13px] text-slate-300 group-hover:text-white transition-colors">Ghi nhớ đăng nhập</span>
                  </label>
                  <a href="#" className="text-[#00A8CC] hover:text-[#2dd4f0] text-[13px] font-semibold transition-colors hover:underline underline-offset-4">
                    Quên mật khẩu?
                  </a>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="relative w-full overflow-hidden bg-[#00A8CC] hover:bg-[#0092b3] active:scale-[0.98] text-white font-bold h-13 shadow-[0px_0px_20px_rgba(0,168,204,0.3)] hover:shadow-[0px_0px_35px_rgba(0,168,204,0.5)] transition-all rounded-xl uppercase tracking-[0.1em] text-[13px] group"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  Xác nhận tài khoản
                </Button>
              </form>
            </div>
          ) : (
            /* ==================== STEP 2: 2FA OTP VERIFICATION ==================== */
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="size-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 shadow-xl flex items-center justify-center mb-6">
                  <Smartphone className="size-8 text-[#16a34a] drop-shadow-[0_0_10px_rgba(22,163,74,0.7)]" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-wide uppercase">Xác thực 2 lớp (2FA)</h2>
                <p className="text-slate-300 text-sm mt-2">
                  Nhập mã OTP 6 chữ số từ ứng dụng Google Authenticator trên điện thoại của bạn.
                </p>
              </div>

              {/* Styled Alert Box */}
              {errorMessage && (
                <div className="flex items-start gap-2.5 p-3.5 bg-red-950/40 border border-red-800/50 text-red-200 text-[13px] rounded-xl animate-shake">
                  <ShieldAlert className="size-4 shrink-0 mt-0.5 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="flex items-start gap-2.5 p-3.5 bg-emerald-950/40 border border-emerald-800/50 text-emerald-200 text-[13px] rounded-xl">
                  <CheckCircle className="size-4 shrink-0 mt-0.5 text-emerald-500" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-between gap-2.5">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => { otpRefs.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(index, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold bg-slate-800 border border-slate-600/50 text-[#00A8CC] rounded-xl focus:border-[#00A8CC] focus:ring-1 focus:ring-[#00A8CC] transition-all outline-none"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Key className="size-3 text-slate-500" /> Mã dùng thử: <strong className="text-white font-mono">123456</strong>
                  </span>
                  <span>Mã có hiệu lực trong 30s</span>
                </div>

                <div className="flex flex-col gap-3">
                  <Button 
                    type="submit" 
                    className="relative w-full overflow-hidden bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold h-13 shadow-[0px_0px_20px_rgba(22,163,74,0.3)] hover:shadow-[0px_0px_35px_rgba(22,163,74,0.5)] transition-all rounded-xl uppercase tracking-[0.1em] text-[13px] group"
                  >
                    Đăng Nhập Hệ Thống
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost"
                    className="h-10 text-slate-400 hover:text-white text-xs gap-1.5 self-center"
                    onClick={() => {
                      setStep(1);
                      setOtp(["", "", "", "", "", ""]);
                    }}
                  >
                    <ArrowLeft className="size-3.5" /> Quay lại đăng nhập tài khoản
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Footer Text */}
          <div className="mt-8 pt-8 border-t border-slate-700/50 text-center">
            <p className="text-[13px] text-slate-400 font-medium">
              Bạn cần cấp quyền truy cập? <br className="sm:hidden" />
              <a href="#" className="text-[#00A8CC] hover:text-[#2dd4f0] hover:underline underline-offset-4 font-bold transition-colors sm:ml-1">Liên hệ Quản trị viên hệ thống</a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Required Animations */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-\\[shimmer_1\\.5s_infinite\\] {
          animation: shimmer 1.5s infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 2;
        }
      `}</style>
    </div>
  );
}
