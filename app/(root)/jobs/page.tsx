import React from 'react';

import CommonFilter from '@/components/filters/CommonFilter';
import LocalSearch from '@/components/search/LocalSearch';
import { JobsLocationFilters } from '@/constants/filters';
import ROUTES from '@/constants/routes';

const FindJobs = () => {
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
          <CommonFilter
            filters={JobsLocationFilters}
            containerClasses="flex-1"
            selectValue="Select Location"
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>
        {/* <Button className="primary-gradient min-h-[56px]">Find Jobs</Button> */}
      </div>
    </div>
  );
};

export default FindJobs;
