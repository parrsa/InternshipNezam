import api from "@/core/config/api";

export const GetInfoTrainee = async () => {
    try {
        const res = await api.get("Trainee/GetInfo");
        return res.data;
    } catch (err) {
        console.error("Failed to fetch Trainee/GetRealInfo:", err);
        throw err;
    }
};

export const RegistrationTrainee = async (data: any) => {
    try {
        const res = await api.post("Trainee/Registration", data);
        return res.data;
    } catch (err: any) {
        console.error("Failed to post Trainee/Registration:", {
            status: err?.response?.status,
            data: err?.response?.data,
            message: err?.message,
        });
        throw err;
    }
};


export const PaymentTrainee = async (
    traineeId: number,
    competences: number[],
) => {
    try {
        const res = await api.post(
            `Trainee/Payment?traineeId=${traineeId}`,
            competences,
        );
        return res.data;
    } catch (err: any) {
        console.error("Failed to post Trainee/Payment:", {
            status: err?.response?.status,
            data: err?.response?.data,
            message: err?.message,
        });
        throw err;
    }
};

export const VerifyPaymentTrainee = async (data: {
    terminalId: number;
    invoiceId: string;
    amount: number;
    cardnumber: string;
    payload: string;
    hash: string;
    rrn: string;
    traceNumber: string;
    digitalReceipt: string;
    datePaid: string;
    respCode: string;
    respMsg: string;
    issuerBan: string;
}) => {
    try {
        const res = await api.post("Trainee/VerifyPaymrnt", data);
        return res.data;
    } catch (err: any) {
        console.error("Failed to post Trainee/VerifyPaymrnt:", {
            status: err?.response?.status,
            data: err?.response?.data,
            message: err?.message,
        });
        throw err;
    }
};