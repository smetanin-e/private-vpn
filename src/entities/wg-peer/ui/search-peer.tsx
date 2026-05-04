import { CleareButton } from "@/src/shared/components"
import { Input } from "@/src/shared/components/ui"
import { ReadonlyURLSearchParams, useRouter } from "next/navigation"
import React from "react"

interface Props {
  className?: string
  searchValue: string
  setSearchValue: (value: string) => void
  searchParams: ReadonlyURLSearchParams
}

export const SearchPeer: React.FC<Props> = ({
  searchValue,
  setSearchValue,
  searchParams,
}) => {
  const router = useRouter()

  const handleSearch = (value: string) => {
    setSearchValue(value)

    // Обновляем URL параметр
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="relative sm:max-w-sm">
      <Input
        placeholder="Поиск по имени клиента"
        type="text"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {searchValue && <CleareButton onClick={() => handleSearch("")} />}
    </div>
  )
}
