const engineers = [
  {
    id: 1,
    initial: "ک",
    name: "مهندس کریمی",
    field: "معماری",
    rating: 88,
    completed: 4,
    total: 8,
    status: "active",
  },
  {
    id: 2,
    initial: "ا",
    name: "مهندس احمدی",
    field: "عمران",
    rating: 92,
    completed: 5,
    total: 8,
    status: "active",
  },
  {
    id: 3,
    initial: "ر",
    name: "مهندس رضایی",
    field: "عمران",
    rating: 95,
    completed: 6,
    total: 10,
    status: "active",
  },
  {
    id: 4,
    initial: "ص",
    name: "مهندس صادقی",
    field: "عمران",
    rating: 0,
    completed: 0,
    total: 6,
    status: "inactive",
  },
  {
    id: 5,
    initial: "ج",
    name: "مهندس جوادی",
    field: "نقشه‌برداری",
    rating: 78,
    completed: 2,
    total: 6,
    status: "review",
  },
  {
    id: 6,
    initial: "م",
    name: "مهندس موسوی",
    field: "برق",
    rating: 82,
    completed: 3,
    total: 8,
    status: "review",
  },
];

function Reports() {
  const toPersianDigits = (value) =>
    String(value).replace(
      /\d/g,
      (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]
    );

  const getProgress = (completed, total) => {
    if (!total || total <= 0) return 0;

    return Math.min(
      Math.max((completed / total) * 100, 0),
      100
    );
  };

  const statusConfig = {
    active: {
      label: "فعال",
      className:
        "border-emerald-300 bg-emerald-100 text-emerald-700",
    },

    inactive: {
      label: "غیرفعال",
      className:
        "border-slate-300 bg-slate-100 text-slate-600",
    },

    review: {
      label: "نیازمند بررسی",
      className:
        "border-amber-300 bg-amber-100 text-amber-700",
    },
  };

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-[#f8f8f8]
        px-[30px]
        py-[32px]
      "
    >
      <section
        aria-label="گزارش مهندسان"
        className="
          mx-auto
          grid
          w-full
          max-w-[1500px]
          grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {engineers.map((engineer) => {
          const {
            id,
            initial,
            name,
            field,
            rating,
            completed,
            total,
            status,
          } = engineer;

          const progress = getProgress(
            completed,
            total
          );

          const currentStatus = statusConfig[status];

          return (
            <article
              key={id}
              className="
                min-h-[367px]
                w-full
                rounded-[18px]
                border
                border-slate-200
                bg-white
                px-5
                pb-5
                pt-[50px]
                shadow-[0_2px_5px_rgba(15,23,42,0.08)]
              "
            >
              {/* Avatar */}
              <div className="flex justify-center">
                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-[#e5ebf8]
                    text-[22px]
                    font-medium
                    text-[#0645b5]
                  "
                  aria-hidden="true"
                >
                  {initial}
                </div>
              </div>

              {/* Engineer information */}
              <div className="mt-[18px] text-center">
                <h2
                  className="
                    text-[17px]
                    font-bold
                    leading-7
                    text-slate-950
                  "
                >
                  {name}
                </h2>

                <p
                  className="
                    mt-0.5
                    text-[13px]
                    font-normal
                    leading-6
                    text-slate-500
                  "
                >
                  رشته: {field}
                </p>
              </div>

              {/* Rating */}
              <div
                className="
                  mt-[10px]
                  flex
                  items-center
                  justify-center
                  gap-1
                  text-[16px]
                  font-medium
                  text-slate-950
                "
              >
                <span>
                  {toPersianDigits(rating)}
                </span>

                {/* Star */}
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-[#f59e0b]"
                >
                  <path
                    d="
                      M12 3.75
                      l2.63 5.33
                      5.88.85
                      -4.25 4.14
                      1 5.86
                      L12 17.16
                      l-5.26 2.77
                      1-5.86
                      -4.25-4.14
                      5.88-.85
                      L12 3.75Z
                    "
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Divider */}
              <div
                className="
                  my-[17px]
                  h-px
                  w-full
                  bg-slate-200
                "
              />

              {/* Trainees information */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  text-[13px]
                  leading-5
                  text-slate-600
                "
              >
                <span>
                  کارآموزان
                </span>

                <span
                  dir="ltr"
                  className="font-medium text-slate-900"
                >
                  {toPersianDigits(total)}
                  {" / "}
                  {toPersianDigits(completed)}
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="
                  mt-[7px]
                  h-[7px]
                  w-full
                  overflow-hidden
                  rounded-full
                  bg-[#d7e0f3]
                "
                role="progressbar"
                aria-label={`پیشرفت کارآموزان ${name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div
                  className="
                    h-full
                    rounded-r-full
                    bg-[#1747b8]
                    transition-[width]
                    duration-300
                    ease-out
                  "
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              {/* Status */}
              <div className="mt-[5px] flex justify-center">
                <span
                  className={`
                    inline-flex
                    min-h-[28px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    px-[13px]
                    text-[12px]
                    font-medium
                    leading-5
                    ${currentStatus.className}
                  `}
                >
                  {currentStatus.label}
                </span>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default Reports;