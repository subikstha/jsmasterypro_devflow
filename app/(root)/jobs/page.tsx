import React from 'react';

import JobsCountriesFilter from '@/components/filters/JobsCountriesFilter';
import LocalSearch from '@/components/search/LocalSearch';
import ROUTES from '@/constants/routes';
import { api } from '@/lib/api';

const FindJobs = async () => {
  // 1. First we get the IP address using the following api call
  const result = await api.location.getDnsInfo();
  const {
    dns: { ip },
  } = result || {};
  // 2. Second we get the country where the user is located
  const { countryCode } = await api.location.getIpInfo(ip);
  // 3. Get all the countries to be displayed in the combobox
  const countries = await api.countries.getAllCountries();
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      <div className="mt-11 flex gap-5">
        <div className=" flex flex-1 items-center gap-5">
          <LocalSearch
            route={ROUTES.JOBS}
            imgSrc="/icons/search.svg"
            iconPosition="left"
            placeholder="Job Title, Company or Keywords"
            otherClasses="flex-1"
          />
          <JobsCountriesFilter
            countries={countries}
            triggerClasses="w-full justify-start min-h-[56px] body-regular no-focus background-light800_dark300 text-dark500_light700 border px-5 py-2.5"
            popoverTriggerClasses="flex-1"
            defaultCountryCode={countryCode}
          />
        </div>
        {/* <Button className="primary-gradient min-h-[56px]">Find Jobs</Button> */}
      </div>
    </div>
  );
};

export default FindJobs;
