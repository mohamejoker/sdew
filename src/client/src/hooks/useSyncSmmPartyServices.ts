
import { useState } from "react";
import { smmPartyProvider } from "@/services/providers/smmPartyProvider";
import { supabase } from "@/integrations/supabase/client";

type SyncResult = {
  total: number;
  success: number;
  failed: number;
};

export function useSyncSmmPartyServices() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const sync = async (profitPercent: number) => {
    setIsSyncing(true);
    setLastMessage(null);
    try {
      // 1. سحب كل الخدمات من SMM Party
      const all = await smmPartyProvider.getServices();
      if (!all || !Array.isArray(all) || all.length === 0) throw new Error("لم يتم العثور على خدمات");
      // 2. لكل خدمة؛ احسب السعر النهائي وادخلها
      let success = 0;
      let failed = 0;
      for (const srv of all) {
        try {
          const finalRate = parseFloat(srv.rate) * (1 + profitPercent / 100);
          // جلب معرف المورد تلقائيًا
          const providerRes = await supabase.from("providers").select("id").eq("name", "SMM Party").maybeSingle();
          if (!providerRes.data?.id) throw new Error("لم يتم العثور على مورد SMM Party");
          // تحقق أن الخدمة غير موجودة أصلاً
          const exists = await supabase.from("provider_services")
            .select("id")
            .eq("provider_id", providerRes.data.id)
            .eq("external_service_id", srv.service)
            .maybeSingle();
          if (exists.data?.id) {
            // تحديث السعر فقط
            await supabase.from("provider_services")
              .update({ rate: finalRate })
              .eq("id", exists.data.id);
          } else {
            // إدخال خدمة جديدة
            await supabase.from("provider_services").insert([{
              provider_id: providerRes.data.id,
              external_service_id: srv.service,
              name: srv.name,
              type: srv.type,
              platform: srv.category?.toLowerCase().includes("instagram")
                ? "instagram"
                : srv.category?.toLowerCase().includes("tiktok")
                  ? "tiktok"
                  : srv.category?.toLowerCase().includes("youtube")
                    ? "youtube"
                    : srv.category?.toLowerCase().includes("twitter")
                      ? "twitter"
                      : "other",
              category: srv.category,
              description: srv.name,
              rate: finalRate,
              min_order: parseInt(srv.min),
              max_order: parseInt(srv.max),
              is_active: true,
              quality: "high",
              refill_enabled: srv.refill,
              cancel_enabled: srv.cancel,
              average_time: "1-24 ساعة",
            }]);
          }
          success++;
        } catch (err) {
          failed++;
        }
      }
      setLastMessage(`تمت مزامنة ${success} خدمة (${failed} أخفقوا)`);
      setIsSyncing(false);
      return { total: all.length, success, failed } as SyncResult;
    } catch (e: any) {
      setIsSyncing(false);
      setLastMessage(e.message || "خطأ غير معروف");
      throw e;
    }
  };

  return { isSyncing, sync, lastMessage };
}
