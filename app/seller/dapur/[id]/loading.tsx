export default function KitchenOrderLoading() {
  return (
    <>
      <div className="flex h-[60px] flex-shrink-0 items-center justify-center border-b border-border bg-surface px-4">
        <div className="h-4 w-28 rounded-full bg-border/70" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-8">
        <div className="rounded-[18px] border border-border bg-white p-4">
          <div className="mb-3 h-6 w-44 rounded-full bg-border/70" />
          <div className="h-3 w-36 rounded-full bg-border/60" />
        </div>

        <div className="my-4 border-t border-border" />

        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="aspect-square rounded-[16px] border border-border bg-white p-3">
              <div className="h-full rounded-[12px] bg-border/50" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
