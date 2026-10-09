type RequestStatus = "pending" | "approved";

interface RequestItem {
  id: number;
  student: string;
  course: string;
  supervisor: string;
  status: RequestStatus;
}

const REQUESTS: RequestItem[] = [
  { id: 1, student: "علی محمدی", course: "مقررات ملی ساختمان", supervisor: "مهندس رضایی", status: "pending" },
  { id: 2, student: "زهرا حسینی", course: "تأسیسات برقی", supervisor: "مهندس احمدی", status: "pending" },
  { id: 3, student: "محمد رضایی", course: "طراحی معماری", supervisor: "مهندس کریمی", status: "approved" },
  { id: 4, student: "فاطمه کریمی", course: "سازه", supervisor: "مهندس رضایی", status: "approved" },
];

const STATUS_STYLES: Record<RequestStatus, { label: string; className: string }> = {
  pending: {
    label: "در انتظار",
    className: "border-amber-300 bg-amber-100 text-amber-800",
  },
  approved: {
    label: "تأیید شده",
    className: "border-green-300 bg-green-100 text-green-800",
  },
};

export default function RecentRequests() {
  return (
    <section className="h-full rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">درخواست‌های اخیر</h2>
        <button type="button" className="text-sm font-medium text-gray-900 hover:text-indigo-600">
          همه
        </button>
      </header>

      <ul className="mt-8">
        {REQUESTS.map((item) => {
          const status = STATUS_STYLES[item.status];
          return (
            <li
              key={item.id}
              className="flex items-center gap-4 border-b border-gray-200 py-3 first:pt-0 last:border-b-0 last:pb-0"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm text-indigo-700">
                {item.student.charAt(0)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-gray-900">{item.student}</p>
                <p className="truncate text-[13px] text-gray-500">
                  {item.course} — {item.supervisor}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full border px-3 py-0.5 text-xs ${status.className}`}
              >
                {status.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}