import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-8 w-[125px]" />
      </div>
      <Skeleton className="h-8 w-2/5" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 pt-3 pb-5">
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
        <Skeleton className="h-[125px] rounded-xl" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5 pt-3">
        <Skeleton className="h-10 rounded-xl" />
        <Skeleton className="h-10 rounded-xl" />
        <Skeleton className="h-10 rounded-xl" />
        <Skeleton className="h-10 rounded-xl" />
        <Skeleton className="h-10 rounded-xl" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5 pt-3 pb-1">
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
        <Skeleton className="h-6 rounded-xl" />
      </div>
    </div>
  );
}
