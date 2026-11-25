// import api from "@/core/config/api";

// export interface RealSupervisorInfoResponse {
//   data: {
//     fldMemberId: number;
//     memberId: string;
//     id: number;
//     firstName: string;
//     lastName: string;
//     nationalCode: string;
//     licenseNumber: string;
//     phoneNumber: string;
//     birthDate: string;
//     birthPlace: string | null;
//     nezamRegisterCode: string;
//     address: string;
//     competenceList: number[];
//     field: number;
//     licenseBase: number;
//     workExperience: number;
//     activeProjectCount: number;
//     licenseYear: number;
//     experienceSummery: string | null;
//     traineSalary: number;
//     traineInsurnce: boolean;
//     traineHoursByWeek: number;
//     traineCertificate: boolean;
//     acceptanceCapacity: number;
//     assignedCapacity: number;
//     minHoursByMonth: number;
//     userId: string;
//   };
//   isSuccess: boolean;
//   message: string;
// }

// export const GetRealInfo = async (): Promise<RealSupervisorInfoResponse> => {
//   try {
//     const res = await api.get("Supervisor/GetRealInfo");
//     return res.data;
//   } catch (err) {
//     console.error("Failed to fetch Supervisor/GetRealInfo:", err);
//     throw err;
//   }
// };

// export interface RealRegistrationPayload {
//   fldMemberId: number;
//   memberId: string;
//   id: number;
//   firstName: string;
//   lastName: string;
//   nationalCode: string;
//   licenseNumber: string;
//   phoneNumber: string;
//   birthDate: string;
//   birthPlace: string;
//   nezamRegisterCode: string;
//   address: string;
//   competenceList: number[];
//   field: number;
//   licenseBase: number;
//   workExperience: number;
//   activeProjectCount: number;
//   licenseYear: number;
//   experienceSummery: string;
//   traineSalary: number;
//   traineInsurnce: boolean;
//   traineHoursByWeek: number;
//   traineCertificate: boolean;
//   acceptanceCapacity: number;
//   assignedCapacity: number;
//   minHoursByMonth: number;
//   userId: string;
// }

// export const RealRegistration = async (data: RealRegistrationPayload) => {
//   try {
//     const res = await api.post("Supervisor/RealRegistration", data);
//     return res.data;
//   } catch (err: any) {
//     console.error("❌ RealRegistration failed:", {
//       status: err?.response?.status,
//       data: err?.response?.data,
//       message: err?.message,
//       code: err?.code,
//     });
//     throw err;
//   }
// };
// export const GetLegalInfo = async () => {
//   try {
//     const res = await api.get("Supervisor/GetLegalInfo")
//     return res.data
//   } catch (err) {
//     throw err
//   }
// }



import api from "@/core/config/api";

/* ============================================================
   حقیقی
   ============================================================ */

export interface RealSupervisorInfoResponse {
  data: {
    fldMemberId: number;
    memberId: string;
    id: number;
    firstName: string;
    lastName: string;
    nationalCode: string;
    licenseNumber: string;
    phoneNumber: string;
    birthDate: string;
    birthPlace: string | null;
    nezamRegisterCode: string;
    address: string;
    competenceList: number[];
    field: number;
    licenseBase: number;
    workExperience: number;
    activeProjectCount: number;
    licenseYear: number;
    experienceSummery: string | null;
    traineSalary: number;
    traineInsurnce: boolean;
    traineHoursByWeek: number;
    traineCertificate: boolean;
    acceptanceCapacity: number;
    assignedCapacity: number;
    minHoursByMonth: number;
    userId: string;
  };
  isSuccess: boolean;
  message: string;
}

export const GetRealInfo = async (): Promise<RealSupervisorInfoResponse> => {
  try {
    const res = await api.get("Supervisor/GetRealInfo");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch Supervisor/GetRealInfo:", err);
    throw err;
  }
};
export interface RealRegistrationPayload {
  fldMemberId?: number;
  memberId?: string;
  id?: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  licenseNumber: string;
  phoneNumber: string;
  birthDate: string;
  birthPlace: string;
  nezamRegisterCode?: string;
  address?: string;
  competenceList: number[];
  field: number;
  licenseBase: number;
  workExperience: number;
  activeProjectCount: number;
  licenseYear: number;
  experienceSummery?: string;
  traineSalary: number;
  traineInsurnce: boolean;
  traineHoursByWeek: number;
  traineeCertificate: boolean;
  acceptanceCapacity: number;
  traineeCapacity: number;
  userId?: string;
  cvFile?: File;
}

export const RealRegistration = async (data: RealRegistrationPayload) => {
  try {
    const formData = new FormData();

    // فیلدهای ساده
    formData.append("FldMemberId", String(data.fldMemberId ?? 0));
    formData.append(
      "MemberId",
      data.memberId ?? "00000000-0000-0000-0000-000000000000"
    );
    formData.append("Id", String(data.id ?? 0));
    formData.append("FirstName", data.firstName ?? "");
    formData.append("LastName", data.lastName ?? "");
    formData.append("NationalCode", data.nationalCode ?? "");
    formData.append("LicenseNumber", data.licenseNumber ?? "");
    formData.append("PhoneNumber", data.phoneNumber ?? "");
    formData.append("BirthDate", data.birthDate ?? "");
    formData.append("BirthPlace", data.birthPlace ?? "");
    if (data.nezamRegisterCode)
      formData.append("NezamRegisterCode", data.nezamRegisterCode);
    if (data.address) formData.append("Address", data.address);

    // CompetenceList آرایه‌ی عددی است → هر عضو جدا append می‌شود
    (data.competenceList ?? []).forEach((c) =>
      formData.append("CompetenceList", String(c))
    );

    formData.append("Field", String(data.field ?? 0));
    formData.append("LicenseBase", String(data.licenseBase ?? 0));
    formData.append("WorkExperience", String(data.workExperience ?? 0));
    formData.append(
      "ActiveProjectCount",
      String(data.activeProjectCount ?? 0)
    );
    formData.append("LicenseYear", String(data.licenseYear ?? 0));
    if (data.experienceSummery)
      formData.append("ExperienceSummery", data.experienceSummery);

    formData.append("TraineSalary", String(data.traineSalary ?? 0));
    formData.append("TraineInsurnce", String(!!data.traineInsurnce));
    formData.append(
      "TraineHoursByWeek",
      String(data.traineHoursByWeek ?? 0)
    );
    formData.append("TraineCertificate", String(!!data.traineCertificate));
    formData.append(
      "AcceptanceCapacity",
      String(data.acceptanceCapacity ?? 0)
    );
    formData.append("TraineeCapacity", String(data.traineeCapacity ?? 0));

    if (data.userId) formData.append("UserId", data.userId);

    // فایل رزومه (اجباری طبق Swagger)
    if (data.cvFile) {
      formData.append("CVFile", data.cvFile);
      formData.append("CVFileName", data.cvFile.name);
    }

    const res = await api.post("Supervisor/RealRegistration", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err: any) {
    console.error("❌ RealRegistration failed:", {
      status: err?.response?.status,
      data: err?.response?.data,
      message: err?.message,
      code: err?.code,
    });
    throw err;
  }
};

/* ============================================================
   حقوقی
   ============================================================ */

export interface LegalSupervisorInfoResponse {
  data: {
    fldMemberId: number;
    memberId: string;
    id: number;
    name: string;
    licenseNumber: string;
    nationalId: string;
    registerDate: string;
    registerPlace: string;
    phoneNumber: string;
    nezamRegisterCode: string;
    address: string;
    fieldList: number[];
    competenceList: number[];
    licenseBase: number;
    workExperience: number;
    activeProjectCount: number;
    licenseYear: number;
    experienceSummery: string | null;
    traineSalary: number;
    traineInsurnce: boolean;
    traineHoursByWeek: number;
    traineCertificate: boolean;
    acceptanceCapacity: number;
    assignedCapacity: number;
    minHoursByMonth: number;
    userId: string;
  };
  isSuccess: boolean;
  message: string;
}

export const GetLegalInfo = async (): Promise<LegalSupervisorInfoResponse> => {
  try {
    const res = await api.get("Supervisor/GetLegalInfo");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export interface LegalRegistrationPayload {
  fldMemberId?: number;
  memberId?: string;
  id?: number;
  name: string;
  licenseNumber: string;
  nationalId: string;
  registerDate: string;
  registerPlace: string;
  phoneNumber: string;
  nezamRegisterCode?: string;
  address?: string;
  fieldList: number[];
  competenceList: number[];
  licenseBase: number;
  workExperience: number;
  activeProjectCount: number;
  licenseYear: number;
  experienceSummery: string;
  traineSalary: number;
  traineInsurnce: boolean;
  traineHoursByWeek: number;
  traineeCertificate: boolean;
  acceptanceCapacity: number;
  traineeCapacity: number;
  userId?: string;
  cvFile?: File;
}

export const LegalRegistration = async (data: LegalRegistrationPayload) => {
  try {
    const formData = new FormData();

    // فیلدهای ساده
    formData.append("FldMemberId", String(data.fldMemberId ?? 0));
    formData.append(
      "MemberId",
      data.memberId ?? "00000000-0000-0000-0000-000000000000"
    );
    formData.append("Id", String(data.id ?? 0));
    formData.append("Name", data.name ?? "");
    formData.append("LicenseNumber", data.licenseNumber ?? "");
    formData.append("NationalId", data.nationalId ?? "");
    formData.append("RegisterDate", data.registerDate ?? "");
    formData.append("RegisterPlace", data.registerPlace ?? "");
    formData.append("PhoneNumber", data.phoneNumber ?? "");
    if (data.nezamRegisterCode)
      formData.append("NezamRegisterCode", data.nezamRegisterCode);
    if (data.address) formData.append("Address", data.address);

    // آرایه‌های عددی — هر عضو جدا append می‌شود
    (data.fieldList ?? []).forEach((f) =>
      formData.append("FieldList", String(f))
    );
    (data.competenceList ?? []).forEach((c) =>
      formData.append("CompetenceList", String(c))
    );

    formData.append("LicenseBase", String(data.licenseBase ?? 0));
    formData.append("WorkExperience", String(data.workExperience ?? 0));
    formData.append(
      "ActiveProjectCount",
      String(data.activeProjectCount ?? 0)
    );
    formData.append("LicenseYear", String(data.licenseYear ?? 0));
    formData.append("ExperienceSummery", data.experienceSummery ?? "");
    formData.append("TraineSalary", String(data.traineSalary ?? 0));
    formData.append("TraineInsurnce", String(!!data.traineInsurnce));
    formData.append(
      "TraineHoursByWeek",
      String(data.traineHoursByWeek ?? 0)
    );
    formData.append("TraineCertificate", String(!!data.traineCertificate));
    formData.append(
      "AcceptanceCapacity",
      String(data.acceptanceCapacity ?? 0)
    );
    formData.append("TraineeCapacity", String(data.traineeCapacity ?? 0));

    if (data.userId) formData.append("UserId", data.userId);

    // فایل رزومه (اجباری طبق Swagger)
    if (data.cvFile) {
      formData.append("CVFile", data.cvFile);
      formData.append("CVFileName", data.cvFile.name);
    }

    const res = await api.post("Supervisor/LegalRegistration", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err: any) {
    console.error("❌ LegalRegistration failed:", {
      status: err?.response?.status,
      data: err?.response?.data,
      message: err?.message,
      code: err?.code,
    });
    throw err;
  }
};

/* ============================================================
   درخواست‌های کارآموزی (Trainee For Confirm)
   ============================================================ */

export interface TraineeForConfirmItem {
  supervisorTraineeId: number;
  traineeId: number;
  supervisorId: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  field: string;
  competences: string;
  creationDate: string;
}

export interface GetAllTraineeForConfirmResponse {
  data: TraineeForConfirmItem[];
  isSuccess: boolean;
  message: string;
}

export const GetAllTraineeForConfirm =
  async (): Promise<GetAllTraineeForConfirmResponse> => {
    try {
      const res = await api.get("Supervisor/GetAllTraineeForConfirm");
      return res.data;
    } catch (err) {
      console.error("Failed to fetch GetAllTraineeForConfirm:", err);
      throw err;
    }
  };

export interface ConfirmTraineePayload {
  supervisorTraineeId: number;
  traineeId: number;
  description: string;
  isConfirm: boolean;
}

export const ConfirmTrainee = async (data: ConfirmTraineePayload) => {
  try {
    const res = await api.post("Supervisor/ConfirmTrainee", data);
    return res.data;
  } catch (err: any) {
    console.error("❌ ConfirmTrainee failed:", {
      status: err?.response?.status,
      data: err?.response?.data,
      message: err?.message,
    });
    throw err;
  }
};