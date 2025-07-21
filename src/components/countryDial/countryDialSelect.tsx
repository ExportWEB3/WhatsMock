import React, { useState } from 'react'
import CountryList, { Country } from 'country-list-with-dial-code-and-flag'
import ReactCountryFlag from 'react-country-flag'
import { CountrySelectProps } from '../../utilities/typedec'

export function CountryDialSelect({ onChange }: CountrySelectProps) {
  const countries: Country[] = CountryList.getAll()
  const [selected, setSelected] = useState<Country>(
    countries.find((c) => c.code === 'NG') || countries[0]
  )

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const c = countries.find((c) => c.code === e.target.value)
    if (c) {
      setSelected(c)
      onChange(c)
    }
  }

  return (
    <div className="relative w-3/4 mt-3">
      <select
        value={selected.code}
        onChange={handleChange}
        className="w-full h-12 pl-16 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name} (+{c.dial_code})
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
        <ReactCountryFlag countryCode={selected.code} svg className="w-5 h-5" />
        <span className="font-medium">+{selected.dial_code}</span>
      </div>
    </div>
  )
}

