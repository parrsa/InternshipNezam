import CommitmentAgreement from "./components/commitmentAgreement";
import EducationInfo from "./components/educationInfo";
import LicenseStatus from "./components/licenseStatus";
import PersonalInfoForm from "./components/personalForm";


function Trainees() {
    return (
        <div className="w-full flex flex-col gap-4  p-4 items-center justify-center">
            <PersonalInfoForm />
            <EducationInfo/>
            <LicenseStatus/>
            <CommitmentAgreement

            />
        </div>
    );
}

export default Trainees;