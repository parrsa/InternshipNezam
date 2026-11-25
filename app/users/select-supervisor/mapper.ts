import { Supervisor } from "./components/supervisorCard";

export interface SupervisorApiItem {
    supervisorId: number;
    isLegal: boolean;
    typeTitle: string;
    canSelected: any;
    fullName: string;
    licenseNumber: string;
    field: string;          // "مهندسی معماری"
    competence: string;     // "نظارت,طراحی,مجری"
    totalCapacity: number;
    reserved: number;
    remainCapacity: number;
}

export interface SupervisorsApiResponse {
    data: {
        totalCount: number;
        items: SupervisorApiItem[];
    };
    isSuccess: boolean;
    message: string;
}
export function mapApiToSupervisor(item: SupervisorApiItem): Supervisor {
    return {
        id: String(item.supervisorId),
        name: item.fullName,
        initial: item.fullName?.trim().charAt(0) ?? "-",
        specialties: `${item.field} — ${item.competence.replace(/,/g, " / ")}`,
        capacity: {
            current: item.reserved,
            max: item.totalCapacity,
            percent:
                item.totalCapacity > 0
                    ? Math.round((item.reserved / item.totalCapacity) * 100)
                    : 0,
        },
        type: item.isLegal ? "legal" : "real",
        field: item.field,
        canSelected: item.canSelected, // ← اضافه شد
    };
}