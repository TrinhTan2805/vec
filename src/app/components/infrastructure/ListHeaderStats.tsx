import React from "react";
import { Card, CardContent } from "../ui/card";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../ui/utils";

export interface StatItem {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: React.ReactNode;
  color: string;
}

interface ListHeaderStatsProps {
  stats: StatItem[];
}

export function ListHeaderStats({ stats }: ListHeaderStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-0">
            <div className="flex h-full items-stretch">
              {/* Color accent side */}
              <div className={cn("w-1.5", stat.color)} />
              
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500 line-clamp-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">{stat.value}</h3>
                  </div>
                  <div className={cn("p-2.5 rounded-xl transition-colors duration-300", 
                    stat.color.replace('bg-', 'bg-').replace('-500', '-50'),
                    stat.color.replace('bg-', 'text-'))}>
                    {stat.icon}
                  </div>
                </div>
                
                {stat.change && (
                  <div className="mt-4 flex items-center gap-1.5">
                    <div className={cn("flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[11px] font-bold",
                      stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>
                      {stat.trend === "up" ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                      {stat.change}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">So với năm ngoái</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
