// import { ShabnamFa } from "@/utils/font";
// import { YekanBakh } from "@/app/lib/font";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Type = "success" | "warning" | "error" | "info"

export const toastify = (type: Type, message: string) => {
  toast(message, {
    position: "top-center",
    type: type,
    pauseOnFocusLoss: false,
    closeButton: false,
    rtl: true,
    autoClose: 1000,
    hideProgressBar: true,
    // className: `${YekanBakh.className} customToast`,
  });
};

