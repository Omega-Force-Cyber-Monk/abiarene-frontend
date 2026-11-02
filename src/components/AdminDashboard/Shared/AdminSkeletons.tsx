import React from "react";

export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200/80 rounded-xl ${className}`} />
);

// Overview Cards Skeleton
export const DashboardCardsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-3xl p-5 border border-gray-100 bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-11 h-11 rounded-lg" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      ))}
    </div>
  );
};

// Table Rows Skeleton
export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 6,
}) => {
  return (
    <div className="p-6 shadow-2xl rounded-3xl bg-white border border-gray-100 space-y-5">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-72 rounded-xl" />
        <Skeleton className="h-8 w-32 rounded-xl" />
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        <div className="divide-y divide-gray-100 p-2">
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} className="p-4 flex gap-4 items-center">
              {Array.from({ length: columns }).map((_, c) => (
                <Skeleton key={c} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Subscription Plans Cards Skeleton
export const SubscriptionPlansSkeleton: React.FC = () => {
  return (
    <div className="p-6 shadow-2xl rounded-3xl bg-white border border-gray-100 space-y-5">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl p-6 border border-gray-200 bg-gray-50/50 space-y-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-32" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-4/5" />
              <Skeleton className="h-3.5 w-3/4" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};
