"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "@/app/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { getYesterday, isValidISODate, toISODate } from "@/lib/date-utils";
import JalaliDatePicker from "@/lib/jalaliDatePicker";

import LicenseStatus, { type Item, type ProjectRow } from "../licenseStatus";
import CommitmentAgreement from "../commitmentAgreement";
import RegistrationCOnditions from "../RegistrationConditions";
import ResumeUploader, { type ResumeFile } from "../resumeUploader";
import EducationInfo from "../educationInfo";
import {
  TOTAL_CAPACITY_BY_USER_TYPE,
  type UserType,
} from "../supervisorConfig";

import {
  realInfoToFormValues,
  realInfoToLicenseStatus,
  realInfoToRegistrationConditions,
  realInfoToCommitment,
} from "../../hook/index";

/* ============ Types ============ */

export interface PersonalInfoFormSubmitState {
  formValues: {
    FullName?: string;
    CompanyName?: string;
    LicenseNumber?: string;
    NationalCode?: string;
    Birthday?: string; // ISO
    Birthplace?: string;
    PhoneNumber?: string;
  };
  userType: UserType;
  fields: Item[];
  qualifications: Item[];
  experienceYears: string;
  activeProjects: string;
  summary: string;
  salary: string;
  insurance: "social" | "none";
  weeklyHours: string;
  traineeCertificate: boolean;
  allocatedCapacity: string;
  minMonthlyHours: string;
  payloadTotalCapacity: number;
  resume: ResumeFile | null;
  resumeFile: File | null;
  projects: ProjectRow[];
}

/** شکل داده‌ای که mapper کاربر جاری برمی‌گرداند (برای fallback) */
export interface PersonalInfoInitialData {
  FullName?: string;
  CompanyName?: string;
  LicenseNumber?: string;
  NationalCode?: string;
  Birthday?: string;
  Birthplace?: string;
  PhoneNumber?: string;
}

interface PersonalInfoFormProps {
  stepNumber?: string;
  /** داده اولیه هویتی (مثلاً از GetCurrentUser) - فقط fallback */
  initialData?: PersonalInfoInitialData | null;
  /** داده کامل سرپرست از بک‌اند (GetInfoTrainee) - اولویت اول */
  backendData?: any | null;
  isSubmitting?: boolean;
  onSubmit?: (state: PersonalInfoFormSubmitState) => void;
  onSaveDraft?: () => void;
}

/* ============ Initial values ============ */

const user = {
  FullName: "",
  LicenseNumber: "",
  NationalCode: "",
  Birthday: "",
  Birthplace: "",
  PhoneNumber: "",
};

const legal = {
  CompanyName: "",
  LicenseNumber: "",
  NationalCode: "",
  Birthday: "",
  Birthplace: "",
  PhoneNumber: "",
};

const usersType: { id: number; title: string; type: UserType }[] = [
  { id: 1, title: "شخص حقیقی", type: "User" },
  { id: 2, title: "شخص حقوقی", type: "legal" },
];

/* ============ Validation ============ */

const pastDate = (label: string) =>
  Yup.string()
    .trim()
    .required(`${label} الزامی است`)
    .test("is-past-date", `${label} باید قبل از امروز باشد`, (value) => {
      if (!value) return true;
      return isValidISODate(value) && value < toISODate(new Date());
    });

const commonShape = {
  LicenseNumber: Yup.string().trim().required("شماره پروانه اشتغال الزامی است"),
  NationalCode: Yup.string()
    .trim()
    .required("کد ملی الزامی است")
    .matches(/^[0-9۰-۹]{10}$/, "کد ملی باید ۱۰ رقم باشد"),
  Birthday: pastDate("تاریخ تولد"),
  Birthplace: Yup.string().trim().required("محل تولد الزامی است"),
  PhoneNumber: Yup.string()
    .trim()
    .required("شماره تماس الزامی است")
    .matches(/^(09|۰۹)[0-9۰-۹]{9}$/, "شماره تماس معتبر نیست"),
};

const userSchema = Yup.object({
  FullName: Yup.string().trim().required("نام و نام خانوادگی الزامی است"),
  ...commonShape,
});

const legalSchema = Yup.object({
  ...commonShape,
  CompanyName: Yup.string().trim().required("نام شرکت / موسسه الزامی است"),
  NationalCode: Yup.string()
    .trim()
    .required("شناسه ملی الزامی است")
    .matches(/^[0-9۰-۹]{11}$/, "شناسه ملی باید ۱۱ رقم باشد"),
  Birthday: pastDate("تاریخ تأسیس"),
  Birthplace: Yup.string().trim().required("محل شرکت الزامی است"),
});

/* ============ Component ============ */

export function PersonalInfoForm({
  stepNumber = "۱",
  initialData,
  backendData,
  isSubmitting = false,
  onSubmit,
  onSaveDraft,
}: PersonalInfoFormProps) {
  const [userType, setUserType] = useState<UserType>("User");
  const yesterday = useMemo(() => getYesterday(), []);
  const isUser = userType === "User";
  

  const [fields, setFields] = useState<Item[]>([]);
  const [qualifications, setQualifications] = useState<Item[]>([]);
  const [experienceYears, setExperienceYears] = useState("");
  const [activeProjects, setActiveProjects] = useState("");
  const [summary, setSummary] = useState("");
  const [salary, setSalary] = useState("");
  const [insurance, setInsurance] = useState<"social" | "none">("none");
  const [weeklyHours, setWeeklyHours] = useState("");
  const [traineeCertificate, setTraineeCertificate] = useState(false);
  const [allocatedCapacity, setAllocatedCapacity] = useState("");
  const [minMonthlyHours, setMinMonthlyHours] = useState("");
  const [resume, setResume] = useState<ResumeFile | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [projects, setProjects] = useState<ProjectRow[]>([]);

  /* ---------- Pre-fill از GetInfoTrainee (backendData) ---------- */
  useEffect(() => {
    if (!backendData) return;

    const license = realInfoToLicenseStatus(backendData);
    setFields(license.fields);
    setQualifications(license.qualifications);
    setExperienceYears(license.experienceYears);
    setActiveProjects(license.activeProjects);
    setSummary(license.summary);

    const reg = realInfoToRegistrationConditions(backendData);
    setSalary(reg.salary);
    setInsurance(reg.insurance);
    setWeeklyHours(reg.weeklyHours);
    setTraineeCertificate(reg.traineeCertificate);

    const commit = realInfoToCommitment(backendData);
    setAllocatedCapacity(commit.allocatedCapacity);
    setMinMonthlyHours(commit.minMonthlyHours);
  }, [backendData]);

  /* ---------- initialValues داینامیک (merge: backend > currentUser) ---------- */
  const dynamicInitial = useMemo(() => {
    // اگر backendData موجود است، از آن استفاده کن
    const fromBackend = backendData
      ? realInfoToFormValues(backendData)
      : null;

    // داده کاربر جاری (fallback)
    const fromUser = initialData ?? null;

    // ادغام: اولویت با backend، سپس currentUser
    const mapped = {
      FullName: fromBackend?.FullName || fromUser?.FullName || "",
      CompanyName: fromBackend?.CompanyName || fromUser?.CompanyName || "",
      LicenseNumber:
        fromBackend?.LicenseNumber || fromUser?.LicenseNumber || "",
      NationalCode:
        fromBackend?.NationalCode || fromUser?.NationalCode || "",
      Birthday: fromBackend?.Birthday || fromUser?.Birthday || "",
      Birthplace: fromBackend?.Birthplace || fromUser?.Birthplace || "",
      PhoneNumber: fromBackend?.PhoneNumber || fromUser?.PhoneNumber || "",
    };

    return isUser
      ? { ...user, ...mapped }
      : { ...legal, ...mapped };
  }, [backendData, initialData, isUser]);

  /* ---------- ظرفیت ---------- */
  const commitment = useMemo(
    () =>
      realInfoToCommitment(backendData, TOTAL_CAPACITY_BY_USER_TYPE[userType]),
    [backendData, userType]
  );

  return (
    <Formik
      enableReinitialize
      initialValues={dynamicInitial}
      validationSchema={isUser ? userSchema : legalSchema}
      onSubmit={(values) => {
        onSubmit?.({
          formValues: values,
          userType,
          fields,
          qualifications,
          experienceYears,
          activeProjects,
          summary,
          salary,
          insurance,
          weeklyHours,
          traineeCertificate,
          allocatedCapacity,
          minMonthlyHours,
          payloadTotalCapacity: commitment.payloadTotalCapacity,
          resume,
          resumeFile,
          projects,
        });
      }}
    >
      {({
        getFieldProps,
        errors,
        touched,
        values,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
      }) => {
        const f = (name: string) => ({
          name,
          field: getFieldProps(name),
          error: !!((touched as any)[name] && (errors as any)[name]),
          errorMessage: (errors as any)[name] as string | undefined,
        });

        return (
          <Form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-center items-center gap-4"
          >
            {/* Card 1: اطلاعات هویتی */}
            <div className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 sm:p-6 bg-white px-8 py-7">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
                    {stepNumber}
                  </span>
                  <span className="text-s font-semibold text-neutral-900">
                    نوع شخص و اطلاعات هویتی
                  </span>
                </div>
                <div className="text-xs bg-neutral-100 text-neutral-500 border border-neutral-300 p-1 px-3 rounded-xl">
                  <span>الزامی</span>
                </div>
              </div>

              <div className="mt-8">
                <div className="w-full flex justify-start items-start flex-col gap-3 text-sm">
                  <p className="text-3xs text-black font-bold">نوع شخص</p>
                  <div className="w-full flex justify-center items-center gap-3">
                    {usersType.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setUserType(item.type)}
                        className={`w-1/2 h-11 flex justify-center items-center text-center border border-neutral-300 rounded-lg text-xs cursor-pointer p-2 hover:bg-blue-300 transition-all duration-500 hover:text-white ${userType === item.type ? "bg-blue-700 text-white" : ""
                          }`}
                      >
                        <p>{item.title}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-5">
                  <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
                    <div className="w-full md:w-2/3">
                      {isUser ? (
                        <Input
                          key="FullName"
                          label="نام و نام خانوادگی"
                          variant="default"
                          labelClassName="mb-2 text-xs"
                          placeholder="مثال: مهندس رضایی"
                          inputSize="sm"
                          {...f("FullName")}
                        />
                      ) : (
                        <Input
                          key="CompanyName"
                          label="نام شرکت / موسسه"
                          variant="default"
                          labelClassName="mb-2 text-xs"
                          placeholder="مثال: شرکت مهندسین مشاور"
                          inputSize="sm"
                          {...f("CompanyName")}
                        />
                      )}
                    </div>
                    <div className="w-full md:w-1/3">
                      <Input
                        label="شماره پروانه اشتغال"
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="012345-6"
                        inputSize="sm"
                        {...f("LicenseNumber")}
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
                    <div className="w-full md:w-1/3">
                      <Input
                        label={isUser ? "کدملی" : "شناسه ملی"}
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder={isUser ? "0123456789" : "01234567890"}
                        inputSize="sm"
                        {...f("NationalCode")}
                      />
                    </div>
                    <div className="w-full md:w-1/3">
                      <JalaliDatePicker
                        label={isUser ? "تاریخ تولد" : "تاریخ تأسیس"}
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="۱۳۷۰/۰۱/۰۱"
                        inputSize="sm"
                        name="Birthday"
                        value={(values as any).Birthday ?? ""}
                        maxDate={yesterday}
                        error={
                          !!(
                            (touched as any).Birthday &&
                            (errors as any).Birthday
                          )
                        }
                        errorMessage={
                          (touched as any).Birthday
                            ? ((errors as any).Birthday as string | undefined)
                            : undefined
                        }
                        onChange={(iso: string) => {
                          setFieldTouched("Birthday", true, false);
                          setFieldValue("Birthday", iso, true);
                        }}
                        onBlur={() => setFieldTouched("Birthday", true, false)}
                      />
                    </div>
                    <div className="w-full md:w-1/3">
                      <Input
                        label={isUser ? "محل تولد" : "محل شرکت"}
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="تهران"
                        inputSize="sm"
                        {...f("Birthplace")}
                      />
                    </div>
                  </div>

                  <div className="flex justify-start items-start w-full">
                    <div className="w-full md:w-1/3">
                      <Input
                        label="شماره تماس"
                        variant="default"
                        labelClassName="mb-2 text-xs"
                        placeholder="0912345678"
                        inputSize="sm"
                        inputMode="numeric"
                        {...f("PhoneNumber")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <EducationInfo userType={userType} />

            <LicenseStatus
              userType={userType}
              fields={fields}
              setFields={setFields}
              qualifications={qualifications}
              setQualifications={setQualifications}
              experienceYears={experienceYears}
              setExperienceYears={setExperienceYears}
              activeProjects={activeProjects}
              setActiveProjects={setActiveProjects}
              summary={summary}
              setSummary={setSummary}
              projects={projects}
              setProjects={setProjects}
            />

            <RegistrationCOnditions
              salary={salary}
              setSalary={setSalary}
              insurance={insurance}
              setInsurance={setInsurance}
              weeklyHours={weeklyHours}
              setWeeklyHours={setWeeklyHours}
              traineeCertificate={traineeCertificate}
              setTraineeCertificate={setTraineeCertificate}
            />

            <CommitmentAgreement
              userType={userType}
              supervisorName={
                (values as any).FullName || (values as any).CompanyName
              }
              licenseNumber={(values as any).LicenseNumber}
              displayTotalCapacity={commitment.displayTotalCapacity}
              allocatedCapacity={allocatedCapacity}
              setAllocatedCapacity={setAllocatedCapacity}
              minMonthlyHours={minMonthlyHours}
              setMinMonthlyHours={setMinMonthlyHours}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onSaveDraft={onSaveDraft}
            />

            <ResumeUploader
              initialResume={resume}
              onChange={(r, file) => {
                setResume(r);
                setResumeFile(file ?? null);
              }}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default PersonalInfoForm;