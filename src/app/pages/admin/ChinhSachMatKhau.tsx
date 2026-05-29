import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  RefreshCw,
  Save,
  CheckCircle,
  AlertTriangle,
  Lock,
  Type,
  KeyRound,
  Check,
  X,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const DEFAULT_RULES = {
  minLength: 8,
  maxLength: 32,
  requireUpper: true,
  minUpper: 1,
  requireLower: true,
  minLower: 1,
  requireDigits: true,
  minDigits: 1,
  requireSpecial: true,
  minSpecial: 1,
  allowedSpecial: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

interface ToastProps {
  message: string;
  type: "success" | "error";
}

export default function ChinhSachMatKhau() {
  // ─── Rules State ────────────────────────────────────────────────────────────
  const [minLength, setMinLength] = useState(DEFAULT_RULES.minLength);
  const [maxLength, setMaxLength] = useState(DEFAULT_RULES.maxLength);
  
  const [requireUpper, setRequireUpper] = useState(DEFAULT_RULES.requireUpper);
  const [minUpper, setMinUpper] = useState(DEFAULT_RULES.minUpper);
  
  const [requireLower, setRequireLower] = useState(DEFAULT_RULES.requireLower);
  const [minLower, setMinLower] = useState(DEFAULT_RULES.minLower);
  
  const [requireDigits, setRequireDigits] = useState(DEFAULT_RULES.requireDigits);
  const [minDigits, setMinDigits] = useState(DEFAULT_RULES.minDigits);
  
  const [requireSpecial, setRequireSpecial] = useState(DEFAULT_RULES.requireSpecial);
  const [minSpecial, setMinSpecial] = useState(DEFAULT_RULES.minSpecial);
  const [allowedSpecial, setAllowedSpecial] = useState(DEFAULT_RULES.allowedSpecial);

  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // ─── Test Password State ─────────────────────────────────────────────────────
  const [testPassword, setTestPassword] = useState("");
  const [validationResults, setValidationResults] = useState({
    lengthValid: false,
    upperValid: false,
    lowerValid: false,
    digitsValid: false,
    specialValid: false,
    allAllowedValid: true,
    score: 0,
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    setIsDirty(false);
    showToast("Lưu quy tắc đặt mật khẩu thành công!", "success");
  };

  const handleReset = () => {
    setMinLength(DEFAULT_RULES.minLength);
    setMaxLength(DEFAULT_RULES.maxLength);
    setRequireUpper(DEFAULT_RULES.requireUpper);
    setMinUpper(DEFAULT_RULES.minUpper);
    setRequireLower(DEFAULT_RULES.requireLower);
    setMinLower(DEFAULT_RULES.minLower);
    setRequireDigits(DEFAULT_RULES.requireDigits);
    setMinDigits(DEFAULT_RULES.minDigits);
    setRequireSpecial(DEFAULT_RULES.requireSpecial);
    setMinSpecial(DEFAULT_RULES.minSpecial);
    setAllowedSpecial(DEFAULT_RULES.allowedSpecial);
    setIsDirty(true);
    showToast("Đã khôi phục quy tắc đặt mật khẩu mặc định!", "success");
  };

  const handleFieldChange = (setter: Function, value: any) => {
    setter(value);
    setIsDirty(true);
  };

  // ─── Real-time Password Validator Logic ────────────────────────────────────
  useEffect(() => {
    if (!testPassword) {
      setValidationResults({
        lengthValid: false,
        upperValid: false,
        lowerValid: false,
        digitsValid: false,
        specialValid: false,
        allAllowedValid: true,
        score: 0,
      });
      return;
    }

    const len = testPassword.length;
    const lengthValid = len >= minLength && len <= maxLength;

    // Count uppercase
    const upperCount = (testPassword.match(/[A-Z]/g) || []).length;
    const upperValid = !requireUpper || upperCount >= minUpper;

    // Count lowercase
    const lowerCount = (testPassword.match(/[a-z]/g) || []).length;
    const lowerValid = !requireLower || lowerCount >= minLower;

    // Count digits
    const digitsCount = (testPassword.match(/[0-9]/g) || []).length;
    const digitsValid = !requireDigits || digitsCount >= minDigits;

    // Special characters check
    const specialCharsInPass = testPassword.replace(/[A-Za-z0-9]/g, "");
    let specialValid = true;
    let allAllowedValid = true;

    if (requireSpecial) {
      const specialCount = specialCharsInPass.length;
      specialValid = specialCount >= minSpecial;
    }

    // Check if any character is a special character not in the allowed list
    for (let char of specialCharsInPass) {
      if (!allowedSpecial.includes(char)) {
        allAllowedValid = false;
        break;
      }
    }

    // Calculate dynamic strength score (0 to 100)
    let passedChecks = 0;
    let totalChecks = 1; // Length is always a check
    if (lengthValid) passedChecks++;

    if (requireUpper) { totalChecks++; if (upperValid) passedChecks++; }
    if (requireLower) { totalChecks++; if (lowerValid) passedChecks++; }
    if (requireDigits) { totalChecks++; if (digitsValid) passedChecks++; }
    if (requireSpecial) { totalChecks++; if (specialValid && allAllowedValid) passedChecks++; }

    const score = Math.round((passedChecks / totalChecks) * 100);

    setValidationResults({
      lengthValid,
      upperValid,
      lowerValid,
      digitsValid,
      specialValid,
      allAllowedValid,
      score,
    });
  }, [
    testPassword,
    minLength,
    maxLength,
    requireUpper,
    minUpper,
    requireLower,
    minLower,
    requireDigits,
    minDigits,
    requireSpecial,
    minSpecial,
    allowedSpecial,
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-[#020817] font-sans antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-4 duration-300 ${
          toast.type === "success" 
            ? "bg-green-50 border-green-200 text-green-800" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? (
            <CheckCircle className="size-5 text-[#16a34a]" />
          ) : (
            <AlertTriangle className="size-5 text-[#dc2626]" />
          )}
          <span className="text-[13px] font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header Panel */}
      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
            <Lock className="size-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-[#020817]">Thiết lập quy tắc đặt mật khẩu</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="h-9 px-4 text-[13px] font-medium border-slate-200 text-[#64748b] hover:bg-slate-50 transition-colors gap-1.5"
          >
            <RefreshCw className="size-3.5" /> Đặt lại mặc định
          </Button>
          <Button
            onClick={handleSave}
            disabled={!isDirty}
            className={`h-9 px-4 text-[13px] font-medium transition-colors gap-1.5 ${
              isDirty 
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" 
                : "bg-slate-100 text-[#64748b] cursor-not-allowed border border-transparent"
            }`}
          >
            Lưu quy tắc
          </Button>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Rule Forms (2 Columns wide) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Card 1: Quy tắc về độ dài mật khẩu */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50/50 border-b border-slate-100">
              <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                <KeyRound className="size-4.5 text-blue-600" />
              </div>
              <h2 className="text-[14px] font-semibold text-[#020817]">Quy tắc về độ dài mật khẩu</h2>
            </div>
            
            <CardContent className="p-5 space-y-6">
              {/* Min characters rule */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Số ký tự tối thiểu</p>
                    <p className="text-[12px] text-[#64748b]">Độ dài tối thiểu của mật khẩu</p>
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-9">
                    <input
                      type="number"
                      min={4}
                      max={32}
                      value={minLength}
                      onChange={(e) => handleFieldChange(setMinLength, Math.min(32, Math.max(4, Number(e.target.value))))}
                      className="w-12 text-center text-[13px] font-semibold outline-none border-none h-full bg-transparent px-2"
                    />
                    <span className="px-3 border-l border-slate-200 text-[12px] font-medium text-slate-400 bg-slate-50/50 h-full flex items-center">
                      ký tự
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <input
                    type="range"
                    min={4}
                    max={32}
                    value={minLength}
                    onChange={(e) => handleFieldChange(setMinLength, Number(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] font-medium text-slate-400">
                    <span>4 ký tự</span>
                    <span>32 ký tự</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Max characters rule */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Số ký tự tối đa</p>
                    <p className="text-[12px] text-[#64748b]">Độ dài tối đa của mật khẩu</p>
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-9">
                    <input
                      type="number"
                      min={8}
                      max={128}
                      value={maxLength}
                      onChange={(e) => handleFieldChange(setMaxLength, Math.min(128, Math.max(8, Number(e.target.value))))}
                      className="w-12 text-center text-[13px] font-semibold outline-none border-none h-full bg-transparent px-2"
                    />
                    <span className="px-3 border-l border-slate-200 text-[12px] font-medium text-slate-400 bg-slate-50/50 h-full flex items-center">
                      ký tự
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <input
                    type="range"
                    min={8}
                    max={128}
                    value={maxLength}
                    onChange={(e) => handleFieldChange(setMaxLength, Number(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] font-medium text-slate-400">
                    <span>8 ký tự</span>
                    <span>128 ký tự</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Quy tắc về loại ký tự */}
          <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50/50 border-b border-slate-100">
              <div className="size-8 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                <Type className="size-4.5 text-emerald-600" />
              </div>
              <h2 className="text-[14px] font-semibold text-[#020817]">Quy tắc về loại ký tự</h2>
            </div>
            
            <CardContent className="p-5 space-y-6">
              {/* Row 1: Uppercase character */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Yêu cầu chữ hoa (A-Z)</p>
                    <p className="text-[12px] text-[#64748b]">Mật khẩu phải chứa ít nhất một chữ cái viết hoa</p>
                  </div>
                  <button
                    onClick={() => handleFieldChange(setRequireUpper, !requireUpper)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                      requireUpper ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        requireUpper ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {requireUpper && (
                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 rounded-lg border border-slate-150 animate-in slide-in-from-top-2 duration-150">
                    <span className="text-[12px] font-medium text-slate-500 pl-4 border-l border-slate-200">
                      Số lượng chữ hoa tối thiểu
                    </span>
                    <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-8">
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={minUpper}
                        onChange={(e) => handleFieldChange(setMinUpper, Math.min(10, Math.max(1, Number(e.target.value))))}
                        className="w-10 text-center text-[12px] font-semibold outline-none border-none h-full bg-transparent"
                      />
                      <span className="px-2.5 border-l border-slate-200 text-[11px] font-semibold text-slate-400 bg-slate-50 h-full flex items-center">
                        ký tự
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <hr className="border-slate-100" />

              {/* Row 2: Lowercase character */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Yêu cầu chữ thường (a-z)</p>
                    <p className="text-[12px] text-[#64748b]">Mật khẩu phải chứa ít nhất một chữ cái viết thường</p>
                  </div>
                  <button
                    onClick={() => handleFieldChange(setRequireLower, !requireLower)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                      requireLower ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        requireLower ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {requireLower && (
                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 rounded-lg border border-slate-150 animate-in slide-in-from-top-2 duration-150">
                    <span className="text-[12px] font-medium text-slate-500 pl-4 border-l border-slate-200">
                      Số lượng chữ thường tối thiểu
                    </span>
                    <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-8">
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={minLower}
                        onChange={(e) => handleFieldChange(setMinLower, Math.min(10, Math.max(1, Number(e.target.value))))}
                        className="w-10 text-center text-[12px] font-semibold outline-none border-none h-full bg-transparent"
                      />
                      <span className="px-2.5 border-l border-slate-200 text-[11px] font-semibold text-slate-400 bg-slate-50 h-full flex items-center">
                        ký tự
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <hr className="border-slate-100" />

              {/* Row 3: Digits character */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Yêu cầu chữ số (0-9)</p>
                    <p className="text-[12px] text-[#64748b]">Mật khẩu phải chứa ít nhất một chữ số</p>
                  </div>
                  <button
                    onClick={() => handleFieldChange(setRequireDigits, !requireDigits)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                      requireDigits ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        requireDigits ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {requireDigits && (
                  <div className="flex items-center justify-between p-3.5 bg-slate-50/50 rounded-lg border border-slate-150 animate-in slide-in-from-top-2 duration-150">
                    <span className="text-[12px] font-medium text-slate-500 pl-4 border-l border-slate-200">
                      Số lượng chữ số tối thiểu
                    </span>
                    <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-8">
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={minDigits}
                        onChange={(e) => handleFieldChange(setMinDigits, Math.min(10, Math.max(1, Number(e.target.value))))}
                        className="w-10 text-center text-[12px] font-semibold outline-none border-none h-full bg-transparent"
                      />
                      <span className="px-2.5 border-l border-slate-200 text-[11px] font-semibold text-slate-400 bg-slate-50 h-full flex items-center">
                        ký tự
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <hr className="border-slate-100" />

              {/* Row 4: Special character */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-semibold text-[#020817]">Yêu cầu ký tự đặc biệt</p>
                    <p className="text-[12px] text-[#64748b]">Mật khẩu phải chứa ít nhất một ký tự đặc biệt</p>
                  </div>
                  <button
                    onClick={() => handleFieldChange(setRequireSpecial, !requireSpecial)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                      requireSpecial ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        requireSpecial ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {requireSpecial && (
                  <div className="space-y-3.5 p-3.5 bg-slate-50/50 rounded-lg border border-slate-150 animate-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-medium text-slate-500 pl-4 border-l border-slate-200">
                        Số lượng ký tự đặc biệt tối thiểu
                      </span>
                      <div className="flex items-center bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs h-8">
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={minSpecial}
                          onChange={(e) => handleFieldChange(setMinSpecial, Math.min(10, Math.max(1, Number(e.target.value))))}
                          className="w-10 text-center text-[12px] font-semibold outline-none border-none h-full bg-transparent"
                        />
                        <span className="px-2.5 border-l border-slate-200 text-[11px] font-semibold text-slate-400 bg-slate-50 h-full flex items-center">
                          ký tự
                        </span>
                      </div>
                    </div>

                    {/* Allowed special characters text area */}
                    <div className="space-y-1.5 pt-2">
                      <label className="text-[12px] font-semibold text-[#020817]">Danh sách ký tự đặc biệt cho phép</label>
                      <input
                        type="text"
                        value={allowedSpecial}
                        onChange={(e) => handleFieldChange(setAllowedSpecial, e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-md h-9 px-3 text-[13px] font-mono shadow-xs focus:border-blue-500 outline-none"
                      />
                      <p className="text-[11px] text-[#64748b]">Nhập các ký tự đặc biệt được phép sử dụng</p>
                    </div>
                  </div>
                )}
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Side: Testing panel (1 Column wide) */}
        <div>
          <Card className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-50/50 border-b border-slate-100">
              <div className="size-8 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100">
                <ShieldCheck className="size-4.5 text-purple-600" />
              </div>
              <h2 className="text-[14px] font-semibold text-[#020817]">Kiểm tra mật khẩu</h2>
            </div>
            
            <CardContent className="p-5 space-y-5">
              
              {/* Test Password Input */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-[#020817]">Nhập mật khẩu thử nghiệm</label>
                <input
                  type="text"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="Nhập mật khẩu để kiểm tra..."
                  className="w-full bg-white border border-slate-200 rounded-md h-10 px-3 text-[13px] shadow-xs outline-none focus:border-blue-500"
                />
              </div>

              {testPassword && (
                <div className="space-y-4 py-2 border-t border-slate-100 animate-in fade-in-50 duration-200">
                  
                  {/* Strength Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[12px] font-semibold">
                      <span>Độ an toàn mật khẩu</span>
                      <span className={
                        validationResults.score < 50 
                          ? "text-[#dc2626]" 
                          : validationResults.score < 100 
                          ? "text-orange-500" 
                          : "text-green-600"
                      }>
                        {validationResults.score}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          validationResults.score < 50 
                            ? "bg-red-500" 
                            : validationResults.score < 100 
                            ? "bg-amber-500" 
                            : "bg-green-500"
                        }`}
                        style={{ width: `${validationResults.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-2.5 pt-1 text-[12px]">
                    
                    {/* Check 1: Length */}
                    <div className="flex items-center gap-2">
                      {validationResults.lengthValid ? (
                        <Check className="size-4 text-green-600 shrink-0" />
                      ) : (
                        <X className="size-4 text-red-500 shrink-0" />
                      )}
                      <span className={validationResults.lengthValid ? "text-slate-600" : "text-red-500"}>
                        Độ dài từ {minLength} đến {maxLength} ký tự
                      </span>
                    </div>

                    {/* Check 2: Uppercase */}
                    {requireUpper && (
                      <div className="flex items-center gap-2">
                        {validationResults.upperValid ? (
                          <Check className="size-4 text-green-600 shrink-0" />
                        ) : (
                          <X className="size-4 text-red-500 shrink-0" />
                        )}
                        <span className={validationResults.upperValid ? "text-slate-600" : "text-red-500"}>
                          Chứa ít nhất {minUpper} ký tự viết hoa (A-Z)
                        </span>
                      </div>
                    )}

                    {/* Check 3: Lowercase */}
                    {requireLower && (
                      <div className="flex items-center gap-2">
                        {validationResults.lowerValid ? (
                          <Check className="size-4 text-green-600 shrink-0" />
                        ) : (
                          <X className="size-4 text-red-500 shrink-0" />
                        )}
                        <span className={validationResults.lowerValid ? "text-slate-600" : "text-red-500"}>
                          Chứa ít nhất {minLower} ký tự viết thường (a-z)
                        </span>
                      </div>
                    )}

                    {/* Check 4: Digits */}
                    {requireDigits && (
                      <div className="flex items-center gap-2">
                        {validationResults.digitsValid ? (
                          <Check className="size-4 text-green-600 shrink-0" />
                        ) : (
                          <X className="size-4 text-red-500 shrink-0" />
                        )}
                        <span className={validationResults.digitsValid ? "text-slate-600" : "text-red-500"}>
                          Chứa ít nhất {minDigits} ký tự số (0-9)
                        </span>
                      </div>
                    )}

                    {/* Check 5: Special characters */}
                    {requireSpecial && (
                      <div className="flex items-center gap-2">
                        {validationResults.specialValid && validationResults.allAllowedValid ? (
                          <Check className="size-4 text-green-600 shrink-0" />
                        ) : (
                          <X className="size-4 text-red-500 shrink-0" />
                        )}
                        <span className={(validationResults.specialValid && validationResults.allAllowedValid) ? "text-slate-600" : "text-red-500"}>
                          {!validationResults.allAllowedValid 
                            ? "Chứa ký tự không được cho phép!" 
                            : `Chứa ít nhất ${minSpecial} ký tự đặc biệt`}
                        </span>
                      </div>
                    )}

                  </div>

                </div>
              )}

              <p className="text-[11px] text-[#64748b] leading-relaxed">
                Nhập mật khẩu vào ô bên trên để kiểm tra xem mật khẩu có đáp ứng các quy tắc đã thiết lập hay không.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
