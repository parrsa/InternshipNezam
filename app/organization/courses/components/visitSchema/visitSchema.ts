
import * as Yup from "yup";

export interface VisitOption {
  label: string;
  value: string;
}

export interface VisitFormValues {
  title: string;
  projectType: string;
  manager: string;
  visitDate: string;
  visitTime: string;
  duration: string;
  meetingLocation: string;
  projectAddress: string;
  description: string;
  capacity: string;
  companyCost: string;
  registrationDeadline: string;
  requirements: string;
  sendListToManager: boolean;
  issueAttendanceCertificate: boolean;
}

export const initialVisitValues: VisitFormValues = {
  title: "",
  projectType: "",
  manager: "",
  visitDate: "",
  visitTime: "",
  duration: "",
  meetingLocation: "",
  projectAddress: "",
  description: "",
  capacity: "",
  companyCost: "",
  registrationDeadline: "",
  requirements: "",
  sendListToManager: true,
  issueAttendanceCertificate: true,
};

const validDate = (value?: string) => {
  if (!value) return false;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const [, year, month, day] = match;
  const date = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day))
  );

  return (
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() === Number(month) - 1 &&
    date.getUTCDate() === Number(day)
  );
};

export const visitValidationSchema: Yup.ObjectSchema<VisitFormValues> =
  Yup.object({
    title: Yup.string()
      .trim()
      .required("عنوان بازدید الزامی است")
      .max(150, "عنوان نباید بیشتر از ۱۵۰ کاراکتر باشد"),

    projectType: Yup.string()
      .required("نوع پروژه را انتخاب کنید"),

    manager: Yup.string()
      .required("مسئول پروژه را انتخاب کنید"),

    visitDate: Yup.string()
      .required("تاریخ بازدید الزامی است")
      .test("valid-date", "تاریخ بازدید معتبر نیست", validDate),

    visitTime: Yup.string()
      .required("ساعت حرکت الزامی است")
      .matches(
        /^([01]\d|2[0-3]):[0-5]\d$/,
        "ساعت معتبر نیست"
      ),

    duration: Yup.string()
      .required("مدت بازدید الزامی است")
      .matches(/^\d+$/, "مدت بازدید باید عدد باشد")
      .test(
        "duration-range",
        "مدت بازدید باید بین ۱ تا ۲۴ ساعت باشد",
        (value) =>
          Boolean(value && Number(value) >= 1 && Number(value) <= 24)
      ),

    meetingLocation: Yup.string()
      .required("محل حرکت را انتخاب کنید"),

    projectAddress: Yup.string()
      .trim()
      .required("آدرس پروژه الزامی است")
      .max(500, "آدرس بیش از حد طولانی است"),

    description: Yup.string()
      .defined()
      .max(2000, "توضیحات نباید بیشتر از ۲۰۰۰ کاراکتر باشد"),

    capacity: Yup.string()
      .required("ظرفیت الزامی است")
      .matches(/^\d+$/, "ظرفیت باید عدد صحیح باشد")
      .test(
        "capacity-range",
        "ظرفیت باید بین ۱ تا ۱۰۰۰۰ نفر باشد",
        (value) =>
          Boolean(
            value &&
              /^\d+$/.test(value) &&
              Number(value) >= 1 &&
              Number(value) <= 10000
          )
      ),

    companyCost: Yup.string()
      .required("هزینه شرکت الزامی است")
      .matches(/^\d+$/, "هزینه باید به‌صورت عدد وارد شود")
      .test(
        "cost-range",
        "مبلغ واردشده معتبر نیست",
        (value) =>
          Boolean(
            value &&
              /^\d+$/.test(value) &&
              Number.isSafeInteger(Number(value)) &&
              Number(value) >= 0
          )
      ),

    registrationDeadline: Yup.string()
      .required("مهلت ثبت‌نام الزامی است")
      .test(
        "valid-deadline",
        "تاریخ مهلت ثبت‌نام معتبر نیست",
        validDate
      ),

    requirements: Yup.string()
      .defined()
      .max(1000, "الزامات نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),

    sendListToManager: Yup.boolean().defined(),

    issueAttendanceCertificate: Yup.boolean().defined(),
  });
