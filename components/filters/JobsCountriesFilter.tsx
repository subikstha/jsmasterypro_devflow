'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface Props {
  triggerClasses?: string;
  countries: CountriesData;
  popoverTriggerClasses?: string;
}

const JobsCountriesFilter = ({
  triggerClasses,
  countries,
  popoverTriggerClasses,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={popoverTriggerClasses}>
        <Button className={triggerClasses} role="combobox" aria-expanded={open}>
          {countries.find((country) => country.cca2 === value)?.name.common ??
            'Select Country'}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search Country..." />
          <CommandList>
            <CommandEmpty>No Countries Found</CommandEmpty>
            <CommandGroup>
              {countries.map((country, index) => {
                console.log('index country loop', index);
                return (
                  <CommandItem
                    key={country.cca2}
                    value={country.name.common}
                    onSelect={(currentValue) => {
                      const selected = countries.find(
                        (c) => c.name.common === currentValue
                      );
                      if (selected) setValue(selected.cca2);
                      setOpen(false);
                    }}
                  >
                    {country.name.common}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default JobsCountriesFilter;
