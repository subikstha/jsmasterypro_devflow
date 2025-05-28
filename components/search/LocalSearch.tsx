'use client';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';

import { Input } from '../ui/input';

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
  iconPosition?: 'left' | 'right';
}

const LocalSearch = ({
  route,
  imgSrc,
  placeholder,
  otherClasses,
  iconPosition = 'left',
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  console.log('this is the query in local search bar component', query);

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        console.log('pathname and route in the else block is', pathname, route);
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['query'],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 350);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, route, searchParams, pathname]);
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />
      {iconPosition === 'right' && (
        <Image
          src={imgSrc}
          width={15}
          height={15}
          alt="Search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
