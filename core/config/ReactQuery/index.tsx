import { toastify } from "@/app/components/ui/Toasts";

const STALETIME = 1000 * 5 * 60;
export const queryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: STALETIME,
            retry: 2,
        },
        mutation: {
            onError: (error: any) => {
                toastify("error", error.message)
            }
        }
    }
}
