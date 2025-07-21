import { useState } from "react";
import { Div } from "../../divComponent/div";
import { Button } from "../../Button/button";
import "./homePage.css"

export function HomeComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Div className="w-full h-full bg-pink-50">
      <Div className="w-full h-h10"></Div>
      <Div className="w-full h-h90 flex items-center justify-center">
        <Div className="w-w55 h-h70 flex justify-center bg-white rounded-3xl border border-black/90">
          <Div className="w-96 h-full flex items-center flex-col">
            <h1 className="text-4xl tracking-tighter mt-16">Enter phone number</h1>
            <p className="tracking-tighter text-xl mt-1">
              Select a country and enter your phone number
            </p>

            {/* Dropdown Wrapper */}
            <div className="relative w-3/4 mt-10">
              <select
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-12 px-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 border-black/80 appearance-none"
              >
                <option value="NG">Nigeria</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="IN">India</option>
                <option value="DE">Germany</option>
              </select>

              {/* Chevron icon */}
<svg
  xmlns="http://www.w3.org/2000/svg"
  className={`absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-black transition-transform duration-300 ${
    isOpen ? "rotate-180" : "rotate-0"
  }`}
  fill="currentColor"
  viewBox="0 0 20 20"
>
  <path
    fillRule="evenodd"
    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
    clipRule="evenodd"
  />
</svg>

            </div>

            {/* Phone input */}
<div className="flex w-3/4">
  {/* Country code input */}
  <input
    type="number"
    placeholder="+234"
    className="no-spinner w-1/3 px-4 h-12 mt-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-black/80"
  />

  {/* Phone number input */}
  <input
    type="number"
    pattern="[0-9]*"
    inputMode="numeric"
    min="0"
    max="9"
    placeholder="Enter phone number"
    className="no-spinner w-full h-12 px-4 py-2 mt-3 border border-gray-300 rounded-r-full focus:outline-none focus:ring-2 focus:ring-blue-500 border-black/80"
  />
</div>
          <Button
          type="button"
          btnText="Next"
          className="py-2 px-7 nextButton rounded-full mt-20 text-white"
           >Next</Button>
          </Div>
        </Div>

      </Div>
    </Div>
  );
}
