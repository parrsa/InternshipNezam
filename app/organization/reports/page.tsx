import { EngineerReportCard } from "./components/engineerReport";
import { Engineer } from "./types";

const engineers: Engineer[] = [
  {
    id: 1,
    initial: "ک",
    name: "مهندس کریمی",
    field: "معماری",
    specialties: "طراح",
    level: 3,
    experience: 15,
    rating: 88,
    completed: 4,
    total: 8,
    status: "active",
    type: "real",
    activeProjects: 4,
  },
  {
    id: 2,
    initial: "ا",
    name: "مهندس احمدی",
    field: "برق",
    specialties: "طراح / ناظر",
    level: 2,
    experience: 9,
    rating: 92,
    completed: 5,
    total: 8,
    status: "active",
    type: "real",
    activeProjects: 2,
    projects: [
      { id: 1, name: "مجتمع تجاری کیان", role: "ناظر رشته برق", area: 8500, year: 1402, status: "done" },
      { id: 2, name: "برج پارسیان", role: "طراح تأسیسات برق", area: 12000, year: 1403, status: "running" },
      { id: 3, name: "اداره تجاری شمال", role: "طراح برق", area: 3800, year: 1401, status: "done" },
    ],
    resume: {
      fileName: "resume_ahmadi.pdf",
      description: "فایل رزومه شخصی — ۱.۲ مگابایت",
    },
  },
  {
    id: 3,
    initial: "ر",
    name: "مهندس رضایی",
    field: "عمران",
    specialties: "طراح / ناظر / مجری",
    level: 3,
    experience: 12,
    rating: 95,
    completed: 6,
    total: 10,
    status: "active",
    type: "real",
    activeProjects: 3,
  },
  {
    id: 4,
    initial: "پ",
    name: "شرکت مهندسین مشاور پارس",
    field: "عمران",
    specialties: "طراح / ناظر / مجری",
    level: 3,
    experience: 20,
    rating: 90,
    completed: 0,
    total: 6,
    status: "active",
    type: "legal",
    activeProjects: 6,
  },
  {
    id: 5,
    initial: "ج",
    name: "مهندس جوادی",
    field: "نقشه‌برداری",
    specialties: "مجری",
    level: 2,
    experience: 7,
    rating: 78,
    completed: 2,
    total: 6,
    status: "review",
    type: "real",
    activeProjects: 1,
  },
  {
    id: 6,
    initial: "م",
    name: "مهندس موسوی",
    field: "مکانیک",
    specialties: "طراح / ناظر",
    level: 2,
    experience: 8,
    rating: 84,
    completed: 3,
    total: 8,
    status: "review",
    type: "real",
    activeProjects: 2,
  },
];

function Reports() {
  const toPersianDigits = (value: any) =>
    String(value).replace(
      /\d/g,
      (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]
    );

  const getProgress = (completed: any, total: any) => {
    if (!total || total <= 0) return 0;

    return Math.min(
      Math.max((completed / total) * 100, 0),
      100
    );
  };

  const statusConfig: any = {
    active: {
      label: "فعال",
      className:
        "border-emerald-300 bg-emerald-100 text-emerald-900",
    },

    inactive: {
      label: "غیرفعال",
      className:
        "border-slate-300 bg-slate-100 text-slate-600",
    },

    review: {
      label: "نیازمند بررسی",
      className:
        "border-amber-300 bg-orange-100 text-orange-900",
    },
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f8f8] ">
      <div
        aria-label="گزارش مهندسان"
        className="mx-auto grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {engineers.map((engineer) => (
          <EngineerReportCard key={engineer.id} engineer={engineer} />
        ))}
      </div>
    </div>
  );
}

export default Reports;