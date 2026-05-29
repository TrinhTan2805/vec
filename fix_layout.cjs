const fs = require('fs');
const file = 'd:/GiaoThongHaNoi/vec/src/app/components/layout/DashboardLayout.tsx';
let content = fs.readFileSync(file, 'utf8');

const correctHeader = `import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  Menu,
  Home,
  Route,
  Construction,
  Building2,
  CircleDot,
  GitMerge,
  ArrowRightLeft,
  Navigation,
  Shield,
  Hammer,
  Wrench,
  ShieldAlert,
  AlertCircle,
  FileText,
  Map as MapIcon,
  BarChart3,
  Settings,
  Ruler,
  Layers,
  Truck,
  LogOut,
  Search,
  Bell,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  X,
  LandPlot,
  Info,
  Edit,
  Trash2,
  Table,
  Plus,
  Eye,
  HardHat,
  AlertTriangle,
  Waves,
  Zap,
  ShieldCheck,
  Activity,
  UserCheck,
  Milestone,
  TrafficCone,
  ArrowRight,
  Lightbulb,
  TrainFront,
  Ship,
  History,
  ClipboardCheck,
  PieChart,
  MessageSquare,
  Inbox
} from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../ui/utils";
import { NotificationDropdown } from "../header/NotificationDropdown";
import { UserProfileDropdown } from "../header/UserProfileDropdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Clock } from "lucide-react";
import deployHistory from "../../../deploy-history.json";

const RoadBridgeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Road Background - Vertical with perspective */}
    <path d="M8 2L6 22H18L16 2H8Z" />

    {/* Road Markings */}
    <line x1="12" y1="4" x2="12" y2="7" stroke="white" strokeWidth="0.8" strokeDasharray="1.5 1" />
    <line x1="12" y1="15" x2="12" y2="20" stroke="white" strokeWidth="0.8" strokeDasharray="1.5 1" />

    {/* Bridge - Horizontal structure */}
    <rect x="3" y="9" width="18" height="4.5" rx="0.5" />
    <line x1="3" y1="10.5" x2="21" y2="10.5" stroke="white" strokeWidth="0.5" opacity="0.4" />
    <line x1="3" y1="12" x2="21" y2="12" stroke="white" strokeWidth="0.5" opacity="0.4" />

    {/* Bridge Supports */}
    <rect x="4.5" y="13.5" width="1.5" height="4" rx="0.2" />
    <rect x="18" y="13.5" width="1.5" height="4" rx="0.2" />
  </svg>
);

`;

const splitIndex = content.indexOf('interface NavItem {');
content = correctHeader + content.substring(splitIndex);
fs.writeFileSync(file, content);
