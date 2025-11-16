'use client';
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { formUrlQuery } from '@/lib/url';

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
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={popoverTriggerClasses}>
        <Button className={triggerClasses} role="combobox" aria-expanded={open}>
          {countries.find((country) => country.cca2 === value)?.name.common ??
            'Select Location'}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search Country..." />
          <CommandList>
            <CommandEmpty>No Countries Found</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => {
                return (
                  <CommandItem
                    key={country.cca2}
                    value={country.name.common}
                    onSelect={(currentValue) => {
                      const selected = countries.find(
                        (c) => c.name.common === currentValue
                      );
                      if (selected) {
                        setValue(selected.cca2);
                        const newUrl = formUrlQuery({
                          params: searchParams.toString(),
                          key: 'country',
                          value: selected.cca2,
                        });
                        router.push(newUrl, { scroll: false });
                      }
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
