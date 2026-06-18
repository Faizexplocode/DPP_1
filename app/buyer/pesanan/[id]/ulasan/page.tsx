"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { useOrders } from "@/app/context/order-context";
import TopBar from "@/app/components/layout/top-bar";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Modal } from "@/app/components/ui/modal";
import { ThumbsUp } from "lucide-react";

export default function UlasanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getOrder } = useOrders();
  const order = getOrder(id);

  const [rating, setRating] = useState(4);
  const [timeOption, setTimeOption] = useState<"good" | "bad">("good");
  const [portionOption, setPortionOption] = useState<"good" | "bad">("good");
  const [showSuccess, setShowSuccess] = useState(false);

  if (!order) return null;

  return (
    <>
      <TopBar title="Beri Ulasan" onBack={() => router.push("/buyer")} />

      <div className="flex-1 overflow-y-auto p-5 pb-8">
        <Card className="mb-4">
          <h2 className="mb-1.5 text-lg font-extrabold">
            {order.title} — {order.seller}
          </h2>
          <p className="text-xs text-muted">
            {order.servings} {order.unit} &middot; {order.date}
          </p>
        </Card>

        <div className="my-4 border-t border-border" />

        {/* Rating Stars */}
        <h3 className="mb-1 text-lg font-extrabold">Bagaimana pesananmu?</h3>
        <div className="my-3.5 flex justify-center gap-2.5">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => setRating(value)}
              className="border-none bg-transparent p-0 transition-transform hover:scale-110"
            >
              <Star
                size={34}
                className={
                  value <= rating
                    ? "fill-orange-main text-orange-main"
                    : "text-border"
                }
              />
            </button>
          ))}
        </div>

        {/* Time Option */}
        <h3 className="mb-2 text-xs font-extrabold uppercase tracking-widest text-muted">
          Ketepatan Waktu
        </h3>
        <div className="mb-4 flex gap-3">
          <button
            className={`flex-1 rounded-xl border-[1.5px] py-3 font-extrabold transition-all ${
              timeOption === "good"
                ? "border-green-dark bg-green-dark text-white"
                : "border-green-dark bg-white text-green-dark"
            }`}
            onClick={() => setTimeOption("good")}
          >
            Tepat Waktu
          </button>
          <button
            className={`flex-1 rounded-xl border-[1.5px] py-3 font-extrabold transition-all ${
              timeOption === "bad"
                ? "border-green-dark bg-green-dark text-white"
                : "border-green-dark bg-white text-green-dark"
            }`}
            onClick={() => setTimeOption("bad")}
          >
            Terlambat
          </button>
        </div>

        {/* Portion Option */}
        <h3 className="mb-2 text-xs font-extrabold uppercase tracking-widest text-muted">
          Kualitas Porsi
        </h3>
        <div className="mb-4 flex gap-3">
          <button
            className={`flex-1 rounded-xl border-[1.5px] py-3 font-extrabold transition-all ${
              portionOption === "good"
                ? "border-green-dark bg-green-dark text-white"
                : "border-green-dark bg-white text-green-dark"
            }`}
            onClick={() => setPortionOption("good")}
          >
            Sesuai
          </button>
          <button
            className={`flex-1 rounded-xl border-[1.5px] py-3 font-extrabold transition-all ${
              portionOption === "bad"
                ? "border-green-dark bg-green-dark text-white"
                : "border-green-dark bg-white text-green-dark"
            }`}
            onClick={() => setPortionOption("bad")}
          >
            Tidak Sesuai
          </button>
        </div>

        {/* Comment */}
        <h3 className="mb-2 text-xs font-extrabold uppercase tracking-widest text-muted">
          Komentar Opsional
        </h3>
        <textarea
          placeholder="Tulis pengalamanmu di sini..."
          className="w-full min-h-[110px] rounded-2xl border border-border bg-white p-3.5 text-sm outline-none resize-none transition-all focus:border-orange-main focus:ring-4 focus:ring-orange-main/15"
        />

        <Button
          variant="primary"
          className="mt-4"
          onClick={() => setShowSuccess(true)}
        >
          Kirim Ulasan
        </Button>
      </div>

      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        icon={<ThumbsUp size={34} />}
        title="Terima Kasih!"
        description="Ulasanmu membantu seller untuk terus berkembang."
        primaryText="Kembali ke Beranda"
        primaryAction={() => router.push("/buyer")}
      />
    </>
  );
}
