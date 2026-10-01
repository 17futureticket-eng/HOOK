import { createContext, useContext, useState } from 'react'

const SearchContext = createContext(null)

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Address')
  return (
    <SearchContext.Provider value={{ query, setQuery, activeTab, setActiveTab }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}
