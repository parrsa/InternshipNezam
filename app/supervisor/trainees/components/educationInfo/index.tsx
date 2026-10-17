"use client";

import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/input/SelectSilde";
import { TextArea } from "@/app/components/ui/input/TextArea";
import { useState } from "react";

const fieldOptions = [
  { label: "مهندسی عمران", value: "civil" },
  { label: "مهندسی معماری", value: "architecture" },
  { label: "مهندسی برق", value: "electrical" },
  { label: "مهندسی مکانیک", value: "mechanical" },
];

const qualificationOptions = [
  { label: "طراحی", value: "design" },
  { label: "نظارت", value: "supervision" },
  { label: "اجرا", value: "execution" },
];

const gradeOptions = [
  { label: "پایه ۱", value: "1" },
  { label: "پایه ۲", value: "2" },
  { label: "پایه ۳", value: "3" },
];

export default function EducationInfo() {
  const [field, setField] = useState("");
  const [qualification, setQualification] = useState("");
  const [grade, setGrade] = useState("");

  const [experienceYears, setExperienceYears] = useState("");
  const [activeProjects, setActiveProjects] = useState("");
  const [licenseYear, setLicenseYear] = useState("");
  const [summary, setSummary] = useState("");

  return (
    <div
      dir="rtl"
      className="w-full rounded-2xl border-2 shadow-xs border-neutral-200 p-5 sm:p-6  bg-white px-8 py-7 "
    >
      <div className="mb-8  flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef0f8] text-xs text-blue-800">
            ۲
          </span>
          <span className="text-s font-semibold text-neutral-900">
            رشته فعالیت، صلاحیت و سوابق
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center   w-full gap-55">
        <div className="w-full md:w-1/7">
          <div className="w-full">
            <span className="text-2xs  font-semibold text-gray-900">
              رشته فعالیت
            </span>
            <Select
              className=" text-nowrap text-xs"
              placeholder="انتخاب رشته"
              options={fieldOptions}
              value={field}
              onChange={setField}
            />
          </div>
        </div>

        <div className="flex justify-start w-full md:w-1/7">
          <div className="w-full">
            <span className="text-2xs  font-semibold text-gray-900">
              صلاحیت
            </span>
            <Select
              placeholder="انتخاب صلاحیت"
              className=" text-nowrap text-xs"
              options={qualificationOptions}
              value={qualification}
              onChange={setQualification}
            />
          </div>
        </div>

        <div className="flex  w-full md:w-1/7">
          <div className="w-full">
            <span className="text-2xs  font-semibold text-gray-900">
              پایه پروانه
            </span>
            <Select
              placeholder="انتخاب پایه"
              className=" text-nowrap text-xs"
              options={gradeOptions}
              value={grade}
              onChange={setGrade}
            />
          </div>
        </div>
      </div>

      {/* ردیف دوم: سه Input */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3 mt-5">
        <div className="w-full md:w-1/3">
          <Input
            label="سابقه کار (سال)"
            variant="default"
            labelClassName="mb-2 text-xs"
            inputSize="sm"
            type="number"
            min={0}
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Input
            label="تعداد پروژه فعال"
            variant="default"
            labelClassName="mb-2 text-xs"
            inputSize="sm"
            type="number"
            min={0}
            value={activeProjects}
            onChange={(e) => setActiveProjects(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Input
            label="سال اخذ پروانه"
            variant="default"
            labelClassName="mb-2 text-xs"
            inputSize="sm"
            type="number"
            value={licenseYear}
            onChange={(e) => setLicenseYear(e.target.value)}
          />
        </div>
      </div>

      {/* ردیف سوم: خلاصه سوابق */}
      <div className="mt-5 w-full">
        <label
          htmlFor="experience-summary"
          className="mb-2 block text-xs font-semibold text-gray-900"
        >
          خلاصه سوابق
        </label>
        <TextArea
          id="experience-summary"
          variant="default"
          rounded="xl"
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="خلاصه‌ای از سوابق حرفه‌ای، پروژه‌های اجرا شده و تخصص‌های اصلی..."
          className="min-h-0 text-xs"
        />
      </div>
    </div>
  );
}