// import './globals.css'
// import { Header } from './components/header'
// import { SupportWidget } from './components/ui/SupportWidget'

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="fa" dir="rtl">
//       <body className="font-iranSans min-h-screen bg-background antialiased">
//         <div className="relative flex min-h-screen flex-col">
//           <Header />
//           <main className="flex-1">
//             {children}
//           </main>
//         </div>
//         <SupportWidget
//           position="bottom-right"
//           color="primary"
//         />
//       </body>
//     </html>
//   )
// }
// "use client";
// import { YekanBakh } from "./util/font";
// import "./globals.css";
// import UserLayou from "./layouts/UserLayou";
// import AdminLayout from "./layouts/AdminLayout";
// import TeacherLayout from "./layouts/TeacherLayout";
// import QueryProvider from "@/components/partial/provider/ReactQuery";
// import { AuthProvider, useAuthContext } from "@/components/partial/provider/Auth";
// import { ToastContainer } from "react-toastify";
// import ProtectedRoute from "@/components/partial/provider/ProtectedRoute";
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="fa" className={YekanBakh.variable}>
//       <body
//         dir="rtl"
//         suppressHydrationWarning
//         className="bg-black overflow-x-hidden"
//         style={{ backgroundColor: "var(--main-bg-color)" }}
//       >
//         <QueryProvider>
//           <AuthProvider>
//             <AppContent>{children}</AppContent>
//             <ToastContainer />
//           </AuthProvider>
//         </QueryProvider>
//       </body>
//     </html>
//   );
// }

// function AppContent({ children }: { children: React.ReactNode }) {
//   const { user, loading } = useAuthContext();

//   const renderLayout = () => {
//     if (loading) return <div>در حال بارگذاری...</div>;

//     if (user?.role === "Admin") return <AdminLayout>{children}</AdminLayout>;
//     if (user?.role === "Teacher") return <TeacherLayout>{children}</TeacherLayout>;
//     return <UserLayou>{children}</UserLayou>;
//   };

//   return <ProtectedRoute>{renderLayout()}</ProtectedRoute>;
// }













import QueryProvider from "@/core/provider/ReactQuery";
import { AuthProvider } from "@/core/provider/Auth";
import { ToastContainer } from "react-toastify";
import ClientLayoutSelector from "./components/partial/layout/ClientLayoutSelector";
import './globals.css'
import { Pelak  } from "@/lib/font";

interface RootLayoutProps {
  children: React.ReactNode;
}
export interface SocialItem {
  id: number
  title: string;
  socialId: string;
  link: string;
  base64Image: string;
  isFooter: boolean;
  isSideMenu: boolean
}

export interface SocialResponse {
  social?: SocialItem[];
  error?: string | null;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa" className={Pelak.variable}>
      <body
        dir="rtl"
        suppressHydrationWarning
        className="bg-black overflow-x-hidden"
        style={{ backgroundColor: "var(--main-bg-color)" }}
      >
        <ToastContainer />
        <QueryProvider> 
          <AuthProvider>
            <ClientLayoutSelector >
              {children}
            </ClientLayoutSelector>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}








