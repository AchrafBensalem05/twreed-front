import { cn } from "@/lib/utils"
import { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  emptyMessage = "No items found.",
  className,
  disabled = false,
}) {
  const [open, setOpen] = useState(false)

  const handleSelect = (selectedValue) => {
    const newValues = value.includes(selectedValue)
      ? value.filter((item) => item !== selectedValue)
      : [...value, selectedValue]
    onChange(newValues)
  }

  const handleRemove = (valueToRemove) => {
    onChange(value.filter((item) => item !== valueToRemove))
  }

  const handleClear = () => {
    onChange([])
  }

  return (
    <div className={cn ("space-y-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-transparent"
            disabled={disabled}
          >
            {value.length > 0 ? (
              <span className="flex items-center gap-1">
                {value.length} selected
                {value.length > 0 && (
                  <X
                    className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClear()
                    }}
                  />
                )}
              </span>
            ) : (
              placeholder
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem key={option.value} value={option.value} onSelect={() => handleSelect(option.value)}>
                    <Check className={cn("mr-2 h-4 w-4", value.includes(option.value) ? "opacity-100" : "opacity-0")} />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map((selectedValue) => {
            const option = options.find((opt) => opt.value === selectedValue)
            return (
              <Badge key={selectedValue} variant="secondary" className="gap-1 pr-1">
                {option?.label}
                <X
                  className="h-3 w-3 cursor-pointer hover:bg-muted rounded-sm"
                  onClick={() => handleRemove(selectedValue)}
                />
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}