"use client";

import HomeDashboardCards from "./components/homePage/homeDashboardCard";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/input";


export default function Home() {
  return (
    <div className="w-full min-h-screen  flex flex-col items-center justify-center bg-neutral-50">
      <HomeDashboardCards />

    </div>
  );
}
