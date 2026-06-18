export default function BuyerOrderLoading() {
  return (
    <>
      <div className="flex h-[60px] flex-shrink-0 items-center justify-center border-b border-border bg-surface px-4">
        <div className="h-4 w-32 rounded-full bg-border/70" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-8">
        <div className="rounded-[18px] border border-border bg-white p-4">
          <div className="mb-3 h-5 w-44 rounded-full bg-border/70" />
          <div className="mb-2 h-3 w-28 rounded-full bg-border/60" />
          <div className="h-3 w-52 rounded-full bg-border/60" />
        </div>

        <div className="my-4 border-t border-border" />

        <div className="mb-3 h-3 w-28 rounded-full bg-border/70" />
        <div className="space-y-3">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-border/60" />
              <div className="flex-1">
                <div className="mb-2 h-3 w-40 rounded-full bg-border/70" />
                <div className="h-2 w-24 rounded-full bg-border/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
