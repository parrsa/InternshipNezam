import CommitmentAgreement from "./components/commitmentAgreement";
import EducationInfo from "./components/educationInfo";
import LicenseStatus from "./components/licenseStatus";
import PersonalInfoForm from "./components/personalForm";


function Trainees() {
    return (
        <div className="w-full flex flex-col gap-4  px-5 p-2 items-center justify-center">
            <PersonalInfoForm />
            <EducationInfo/>
            <LicenseStatus/>
            <CommitmentAgreement

            />
        </div>
    );
}

export default Trainees;