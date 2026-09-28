// "use client";
// import { queryClientConfig } from "@/core/config/ReactQuery";
// import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { useState } from "react";

// interface QueryProviderProps {
//     children: React.ReactNode;
//     dehydratedState?: any;
// }

// const QueryProvider = ({ children, dehydratedState }: QueryProviderProps) => {
//     const [queryClient] = useState(() =>
//         new QueryClient(queryClientConfig)
//     );
//     return (
//         <QueryClientProvider client={queryClient}>
//             <HydrationBoundary state={dehydratedState}>
//                 {children}
//                 <ReactQueryDevtools initialIsOpen={false} />
//             </HydrationBoundary>
//         </QueryClientProvider>
//     );
// };

// export default QueryProvider;
"use client";
import { ReactNode, useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClientConfig } from "@/core/config/ReactQuery";

interface QueryProviderProps {
    children: ReactNode;
    dehydratedState?: any;
}

export default function QueryProvider({
    children,
    dehydratedState,
}: QueryProviderProps) {
    // const [queryClient] = useState(() => new QueryClient());
    const queryClient = new QueryClient(queryClientConfig);

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
