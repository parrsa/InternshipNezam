import { useRef, useState } from "react"
import { cn } from "@/lib/cn"
import { Upload } from "lucide-react"
import { toastify } from "../Toasts"
import { useFormikContext } from "formik"

const DEFAULT_ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/jfif', 'image/png', 'image/gif', 'image/webp']

export default function SelectFileInput({
    title = 'عکس آپلود',
    subtitle,
    onSelectFile,
    FormError,
    FormErrorMassage,
    desc,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    accept = 'image/*',
}: {
    FormError: boolean,
    FormErrorMassage: string,
    title?: string,
    subtitle?: string,
    onSelectFile: (file: string) => void,
    desc?: string,
    allowedTypes?: string[],
    accept?: string,
}) {
    const InputRef = useRef<HTMLInputElement | null>(null)
    const [error, setISError] = useState<boolean>(false)
    const [fileName, setFileName] = useState<string>('')
    function handleSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files
        if (file && file.length > 0) {
            const selectedFile = file[0]
            const maxSize = 2 * 1024 * 1024;
            if (selectedFile) {
                if (!allowedTypes.includes(selectedFile?.type)) {
                    toastify('error', 'فایل انتخابی باید عکس باشد')
                }
                else if (selectedFile.size > maxSize) {
                    setISError(true)
                } else {
                    const imageUrl = URL.createObjectURL(selectedFile);
                    onSelectFile(imageUrl)
                    setFileName(selectedFile.name)

                }
            }
        }
    }
    return (
        <>
            <div className={cn(error && '!border-red-300  !bg-red-50', FormError && '!border-red-300  !bg-red-50', fileName && '!border-green-300  !bg-green-50', 'border-dashed  rounded-3xl border-2 h-45 select-none cursor-pointer border-accent-300 bg-input-50  p-5 flex flex-col items-center justify-center gap-2')} onClick={() => InputRef.current?.click()}>
                <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M74.375 45.5V29.75C74.375 25.1087 72.5313 20.6575 69.2494 17.3756C65.9675 14.0937 61.5163 12.25 56.875 12.25H27.125C22.4837 12.25 18.0325 14.0937 14.7506 17.3756C11.4687 20.6575 9.625 25.1087 9.625 29.75V54.25C9.625 56.5481 10.0777 58.8238 10.9571 60.947C11.8366 63.0702 13.1256 64.9993 14.7506 66.6244C18.0325 69.9063 22.4837 71.75 27.125 71.75H49.035" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.5312 59.5L20.1213 48.3C21.3807 47.0491 23.0336 46.2718 24.8003 46.0996C26.567 45.9274 28.339 46.3709 29.8163 47.355C31.2935 48.3391 33.0655 48.7825 34.8322 48.6103C36.5989 48.4381 38.2518 47.6608 39.5112 46.41L47.6662 38.255C50.0095 35.9038 53.1119 34.4617 56.4199 34.186C59.7279 33.9103 63.0262 34.819 65.7263 36.75L74.3712 43.435M28.0312 35.595C28.7942 35.5904 29.5488 35.4355 30.252 35.1393C30.9551 34.8431 31.593 34.4113 32.1293 33.8685C32.6655 33.3257 33.0897 32.6827 33.3774 31.976C33.6651 31.2694 33.8108 30.5129 33.8062 29.75C33.8017 28.987 33.6468 28.2324 33.3506 27.5292C33.0544 26.8261 32.6225 26.1882 32.0798 25.6519C31.537 25.1157 30.894 24.6916 30.1873 24.4038C29.4806 24.1161 28.7242 23.9704 27.9612 23.975C26.4203 23.9842 24.9462 24.6053 23.8632 25.7014C22.7802 26.7976 22.177 28.2791 22.1863 29.82C22.1955 31.3609 22.8166 32.835 23.9127 33.918C25.0089 35.001 26.4903 35.6042 28.0312 35.595Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M66.479 54.25V71.75M57.75 63.0175H75.25" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>


                <p className='font-bold text-lg'>
                    {title}
                </p>
                {subtitle && (
                    <p className='text-black/60 text-sm'>
                        {subtitle}
                    </p>
                )}
                <p className='text-black/60'>
                    {error && 'حجم عکس بیشتر از 2 مگ میباشد'}
                    {!error && !fileName && !desc && ' حجم عکس نباید بیشتر از 2 مگ باشه'}
                    {!error && !fileName && desc && desc}
                    {fileName && fileName}
                </p>
            </div >
            {FormError && (
                <p className="text-sm  text-red-600 pt-2">
                    {FormErrorMassage}
                </p>
            )
            }
            <input className='hidden' onChange={(e) => handleSelectFile(e)} type='file' ref={InputRef} accept={accept} />
        </>
    )
}