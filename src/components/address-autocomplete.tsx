/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Input } from "./ui/input"

type AddressAutocompleteProps = {
 value: string
 onChange: (value: string) => void
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

export default function AddressAutocomplete({ value, onChange }: AddressAutocompleteProps) {
 const [query, setQuery] = useState(value)
 const [suggestions, setSuggestions] = useState<string[]>([])
 const skipFetch = useRef(false)
 const hasInteracted = useRef(false)

 const fetchSuggestions = useDebouncedCallback(async (q: string) => {
  if (!q || skipFetch.current || !hasInteracted.current) {
   skipFetch.current = false
   return
  }
  
  const res = await fetch(
   `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json?country=US&access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`
  )

  const data = await res.json()
  const results = data.features?.map((feature: any) => feature.place_name) || []
  setSuggestions(results)
 }, 300)

 useEffect(() => {
  fetchSuggestions(query)
 }, [query])

 return (
  <div className="relative w-full group z-50 cursor-text">
   <Input
    type="text"
    id="address"
    name="address"
    placeholder="Address"
    value={query}
    onChange={(e) => {
     setQuery(e.target.value)
     hasInteracted.current = true
    }}
    required
   />
   {suggestions.length > 0 && (
    <ul className="absolute mt-1 w-full bg-[#f6fafe] border border-gray-300 rounded shadow-sm max-h-48 overflow-y-auto z-50">
     {suggestions.map((suggestion, i) => (
      <li
       key={i}
       className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
       onClick={() => {
        onChange(suggestion)
        setQuery(suggestion)
        setSuggestions([])
        skipFetch.current = true
       }}
      >
       {suggestion}
      </li>
     ))}
    </ul>
   )}
  </div>
 )
}