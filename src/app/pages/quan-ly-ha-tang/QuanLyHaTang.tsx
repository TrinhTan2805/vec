import { useState } from "react";
import { Route, Building2, CircleDot, Eye, FileText, MapPin, Download, TrendingUp, Construction, Wrench, Calendar, AlertTriangle, Clock, CheckCircle2, Hammer, Upload, Filter, Edit, Trash2, Search, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { SimpleMapView } from "../../components/map/SimpleMapView";
import { Switch } from "../../components/ui/switch";
import { Input } from "../../components/ui/input";
import { QuanLyKCHT } from "../../components/infrastructure/QuanLyKCHT";

import { Link, useLocation } from "react-router";
import { cn } from "../../components/ui/utils";

export default function QuanLyHaTang() {
  return (
    <div className="space-y-6">
      <QuanLyKCHT type="road" />
    </div>
  );
}
