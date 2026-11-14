export const SupervisorKeys = {
    all: () => ["supervisor"] as const,
    realInfo: () => [...SupervisorKeys.all(), "realInfo"] as const,
    legalInfo: () => [...SupervisorKeys.all(), "legalInfo"] as const,
    detail: (id: string | number) =>
      [...SupervisorKeys.all(), "detail", id] as const,
  } as const;