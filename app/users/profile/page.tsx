"use client";

import { useState } from "react";
import ProfileCard from "./components/profileCard";
import ProfileInfoForm, { ProfileInfoValues } from "./components/profileInfoForm";


function ProfileParent() {
    const [profile, setProfile] = useState<ProfileInfoValues | null>(null);

    return (
        <section  className="grid w-full grid-cols-1 gap-4 px-4 p-3 lg:grid-cols-3">
            <ProfileCard fullName={profile?.fullName} major={profile?.major} />
            <ProfileInfoForm onSubmit={setProfile} />
        </section>
    );
}

export default ProfileParent;