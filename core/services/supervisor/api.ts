import api from "@/core/config/api";

/* ---------- Types ---------- */

export interface SupervisorRealInfoResponse {
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

export interface SupervisorRealPayload {
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

/* ---------- API Calls ---------- */

/**
 * دریافت اطلاعات سرپرست حقیقی (GetRealInfo)
 */
export const getSupervisorRealInfo =
  async (): Promise<SupervisorRealInfoResponse> => {
    try {
      const response = await api.get<SupervisorRealInfoResponse>(
        "Supervisor/GetRealInfo"
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch Supervisor/GetRealInfo:", error);
      throw error;
    }
  };

/**
 * ثبت‌نام سرپرست حقیقی (RealRegistration)
 */
export const registerSupervisorReal = async (
  payload: SupervisorRealPayload
): Promise<any> => {
  try {
    const response = await api.post(
      "Supervisor/RealRegistration",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Failed to post Supervisor/RealRegistration:", error);
    throw error;
  }
};