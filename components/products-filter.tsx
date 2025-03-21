"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface FilterSection {
  title: string
  isOpen: boolean
}

export default function ProductsFilter() {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sections, setSections] = useState<FilterSection[]>([
    { title: "Categories", isOpen: true },
    { title: "Price", isOpen: true },
    { title: "Size", isOpen: false },
    { title: "Color", isOpen: false },
  ])
  const isMobile = useMobile()

  const toggleSection = (index: number) => {
    setSections(sections.map((section, i) => (i === index ? { ...section, isOpen: !section.isOpen } : section)))
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <Button variant="outline" size="sm" className="w-full h-10">
          Reset All
        </Button>
      </div>

      {/* Categories */}
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <div className="flex justify-between items-center mb-4 cursor-pointer py-2" onClick={() => toggleSection(0)}>
          <h3 className="font-semibold">Categories</h3>
          {sections[0].isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {sections[0].isOpen && (
          <div className="space-y-3">
            {["Hoodies", "T-Shirts", "Pants", "Outerwear", "Accessories", "Footwear", "Skate"].map((category) => (
              <div key={category} className="flex items-center space-x-3">
                <Checkbox id={`category-${category}`} className="h-5 w-5" />
                <label htmlFor={`category-${category}`} className="text-sm text-gray-300 cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <div className="flex justify-between items-center mb-4 cursor-pointer py-2" onClick={() => toggleSection(1)}>
          <h3 className="font-semibold">Price</h3>
          {sections[1].isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {sections[1].isOpen && (
          <div>
            <Slider
              defaultValue={[0, 200]}
              max={200}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-4"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">${priceRange[0]}</span>
              <span className="text-sm text-gray-300">${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Size */}
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <div className="flex justify-between items-center mb-4 cursor-pointer py-2" onClick={() => toggleSection(2)}>
          <h3 className="font-semibold">Size</h3>
          {sections[2].isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {sections[2].isOpen && (
          <div className="grid grid-cols-3 gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className="border border-zinc-800 rounded text-center py-3 cursor-pointer hover:border-primary hover:text-primary transition-colors"
              >
                {size}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Color */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer py-2" onClick={() => toggleSection(3)}>
          <h3 className="font-semibold">Color</h3>
          {sections[3].isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {sections[3].isOpen && (
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Black", color: "bg-black" },
              { name: "White", color: "bg-white" },
              { name: "Red", color: "bg-red-500" },
              { name: "Blue", color: "bg-blue-500" },
              { name: "Green", color: "bg-green-500" },
              { name: "Gray", color: "bg-gray-500" },
            ].map((color) => (
              <div
                key={color.name}
                className="w-8 h-8 rounded-full cursor-pointer border border-zinc-700"
                style={{ backgroundColor: color.name.toLowerCase() }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

