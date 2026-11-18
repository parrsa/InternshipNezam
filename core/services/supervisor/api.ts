import api from "@/core/config/api";

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
  fldMemberId: number;
  memberId: string;
  id: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  licenseNumber: string;
  phoneNumber: string;
  birthDate: string;
  birthPlace: string;
  nezamRegisterCode: string;
  address: string;
  competenceList: number[];
  field: number;
  licenseBase: number;
  workExperience: number;
  activeProjectCount: number;
  licenseYear: number;
  experienceSummery: string;
  traineSalary: number;
  traineInsurnce: boolean;
  traineHoursByWeek: number;
  traineCertificate: boolean;
  acceptanceCapacity: number;
  assignedCapacity: number;
  minHoursByMonth: number;
  userId: string;
}

export const RealRegistration = async (data: RealRegistrationPayload) => {
  console.log("➡️ POST Supervisor/RealRegistration", data);
  try {
    const res = await api.post("Supervisor/RealRegistration", data);
    console.log("✅ RealRegistration response:", res.status, res.data);
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
export const GetLegalInfo = async () => {
  try {
    const res = await api.get("Supervisor/GetLegalInfo")
    return res.data
  } catch (err) {
    throw err
  }
}

