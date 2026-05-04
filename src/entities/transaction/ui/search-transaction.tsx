import { CleareButton } from "@/src/shared/components"
import { Input } from "@/src/shared/components/ui"
import React from "react"

interface Props {
  className?: string
  searchValue: string
  setSearchValue: (text: string) => void
}

export const SearchTransaction: React.FC<Props> = ({
  searchValue,
  setSearchValue,
}) => {
  return (
    <div className="relative sm:max-w-sm">
      <Input
        placeholder="Поиск по имени клиента или по ID"
        className=""
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && <CleareButton onClick={() => setSearchValue("")} />}
    </div>
  )
}
