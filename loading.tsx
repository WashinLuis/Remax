import { ListingSkeleton } from "@/components/listing/ListingSkeleton";

export default function Loading() {
  return (
    <div className="bg-mist pt-28">
      <ListingSkeleton />
    </div>
  );
}
