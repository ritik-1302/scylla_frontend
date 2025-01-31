import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-6 w-[100px] " />
      </div>
      <div className="relative">
        <Skeleton className="h-6 w-5/5 " />
      </div>
      <div className="divide-y">
        <div className="flex items-center gap-4 p-4 dark:hover:bg-black hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="relative flex-shrink-0">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[125px]" />
              <span className="text-sm text-gray-500 flex-shrink-0">
                <Skeleton className="h-4 w-[100px]" />
              </span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="divide-y">
        <div className="flex items-center gap-4 p-4 dark:hover:bg-black hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="relative flex-shrink-0">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[125px]" />
              <span className="text-sm text-gray-500 flex-shrink-0">
                <Skeleton className="h-4 w-[100px]" />
              </span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="divide-y">
        <div className="flex items-center gap-4 p-4 dark:hover:bg-black hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="relative flex-shrink-0">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[125px]" />
              <span className="text-sm text-gray-500 flex-shrink-0">
                <Skeleton className="h-4 w-[100px]" />
              </span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="divide-y">
        <div className="flex items-center gap-4 p-4 dark:hover:bg-black hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="relative flex-shrink-0">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[125px]" />
              <span className="text-sm text-gray-500 flex-shrink-0">
                <Skeleton className="h-4 w-[100px]" />
              </span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="divide-y">
        <div className="flex items-center gap-4 p-4 dark:hover:bg-black hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="relative flex-shrink-0">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[125px]" />
              <span className="text-sm text-gray-500 flex-shrink-0">
                <Skeleton className="h-4 w-[100px]" />
              </span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex-1 space-y-4 p-8 pt-6">
    //   <div className="flex items-center justify-between space-y-2">
    //     <Skeleton className="h-8 w-[150px]" />
    //   </div>
    //   <Skeleton className="h-8 w-5/5 " />
    //     <div className="flex items-center space-x-4 pt-8">
    //       <Skeleton className="h-12 w-12 rounded-full" />
    //       <div className="space-y-2">
    //         <Skeleton className="h-4 w-[125px]" />
    //         <Skeleton className="h-4 w-[300px]" />
    //       </div>
    //     </div>
    //     <div className="flex items-center space-x-4 pt-8">
    //       <Skeleton className="h-12 w-12 rounded-full" />
    //       <div className="space-y-2">
    //         <Skeleton className="h-4 w-[125px]" />
    //         <Skeleton className="h-4 w-[300px]" />
    //       </div>
    //     </div>
    //     <div className="flex items-center space-x-4 pt-8">
    //       <Skeleton className="h-12 w-12 rounded-full" />
    //       <div className="space-y-2">
    //         <Skeleton className="h-4 w-[125px]" />
    //         <Skeleton className="h-4 w-[300px]" />
    //       </div>
    //     </div>
    //     <div className="flex items-center space-x-4 pt-8">
    //       <Skeleton className="h-12 w-12 rounded-full" />
    //       <div className="space-y-2">
    //         <Skeleton className="h-4 w-[125px]" />
    //         <Skeleton className="h-4 w-[300px]" />
    //       </div>
    //     </div>
    // </div>
  );
}
