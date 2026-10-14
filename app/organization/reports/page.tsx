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
    <div
      className="
        min-h-screen
        w-full
        bg-[#f8f8f8]
       sm:p-7.5
      "
    >
      <div
        aria-label="گزارش مهندسان"
        className="
          mx-auto
          grid
          w-full
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
            <div
              key={id}
              className="
                w-full
                rounded-[18px]
                border
                border-slate-200
                bg-white
                px-5
                pb-5
                pt-11
                shadow-sm
              "
            >
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

              <div className="mt4 text-center">
                <h2
                  className="
                    text-xs
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
                    text-xs
                    font-normal
                    leading-6
                    text-slate-500
                  "
                >
                  رشته: {field}
                </p>
              </div>

              <div
                className="
                  mt-2.5
                  flex
                  items-center
                  justify-center
                  gap-1
                  text-xs
                  font-medium
                  text-slate-950
                "
              >
                <span>
                  {toPersianDigits(rating)}
                </span>

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

              <div
                className="
                  my-4
                  h-px
                  w-full
                  bg-slate-200
                "
              />

              <div
                className="
                  flex
                  items-center
                  justify-between
                  text-xs
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

              <div
                className="
                  mt-1.75
                  h-1.75
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

              <div className="mt-3 flex justify-center">
                <span
                  className={`
                    inline-flex
                   
                    items-center
                    justify-center
                    rounded-full
                    border
                    px-3
                    text-2xs
                    font-medium
                    leading-5
                    ${currentStatus.className}
                  `}
                >
                  {currentStatus.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reports;