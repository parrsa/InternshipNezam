import { Button } from "@/app/components/ui/Button";
import { messages } from "../../data";
import { cn } from "@/lib/cn";

function RecentMessages() {
  return (
    <div
      dir="rtl"
      className="w-full rounded-[18px] border border-slate-200 bg-white px-7.5 py-7.5 mb-10 shadow-sm"
    >
      <div
        className="mb-7.5 flex items-center justify-between"
      >
        <h2
          className="text-s font-bold text-slate-900"
        >
          پیام‌های اخیر
        </h2>

        <Button

          size="xs"
          variant="solid"
          type="button"
          className={cn("flex  items-center justify-center gap-2 h-8.75 rounded-xl bg-amber-50/40  text-nowrap text-2xs font-bold text-neutral-900 transition-colors active:text-neutral-950 active:bg-teal-50 hover:text-neutral-950 hover:bg-teal-50")}
        >
          همه پیام ها
        </Button>
   
      </div>

      <div className="divide-y divide-slate-200">
        {messages.map((message) => (
          <div
            key={`${message.name}-${message.date}`}
            className="flex h-15 items-center justify-between gap-5"
          >
            <div
              className="flex items-center gap-4"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-[14px] font-medium text-blue-700"
              >
                {message.avatar}
              </div>

              <div
                className="text-right"
              >
                <p
                  className="text-xs font-bold leading-6 text-slate-900"
                >
                  {message.name}
                </p>

                <p
                  className="text-2xs leading-5 text-slate-500"
                >
                  {message.message}
                </p>
              </div>
            </div>

            <span
              className={`shrink-0 rounded-full border px-3 py-1 text-3xs font-medium ${message.dateClass}`}
            >
              {message.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentMessages;