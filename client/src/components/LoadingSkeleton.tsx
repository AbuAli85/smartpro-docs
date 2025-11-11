import { Skeleton } from "@/components/ui/skeleton";

/**
 * Card skeleton for loading states
 */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-8 border border-slate-200">
      <Skeleton className="h-12 w-12 rounded-lg mb-4" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

/**
 * Blog post skeleton
 */
export function BlogPostSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

/**
 * Testimonial skeleton
 */
export function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-xl p-8 border border-slate-200">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-5 h-5" />
        ))}
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-6" />
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-3 w-40" />
    </div>
  );
}

/**
 * Feature card skeleton
 */
export function FeatureCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-8 border border-slate-200">
      <Skeleton className="w-12 h-12 rounded-lg mb-4" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

/**
 * Page header skeleton
 */
export function PageHeaderSkeleton() {
  return (
    <div className="py-20 text-center">
      <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
      <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
    </div>
  );
}

/**
 * Grid skeleton for multiple items
 */
export function GridSkeleton({ 
  count = 3, 
  component: Component = CardSkeleton 
}: { 
  count?: number; 
  component?: React.ComponentType;
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

/**
 * List skeleton for vertical lists
 */
export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Table skeleton
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full space-y-3">
      <div className="flex gap-4 pb-3 border-b border-slate-200">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-1/4" />
        </div>
      ))}
    </div>
  );
}

