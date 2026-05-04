"use client"
import { SessionProvider } from "next-auth/react"
import React, { PropsWithChildren } from "react"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../lib/query-client"
import { Toaster } from "@/src/shared/components/ui"
import { ThemeProvider } from "@/src/shared/components/theme-provider"

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ThemeProvider>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            {" "}
            {children}
            <Toaster />
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}
