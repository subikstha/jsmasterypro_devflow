import Image from 'next/image';

import { Badge } from '../ui/badge';

interface Props {
  title: string;
  employerLogo: string | null;
  employer: string | null;
  description: string | null;
  country: string;
  city: string;
}

const JobsCard = ({
  title,
  employerLogo,
  employer,
  description,
  country,
  city,
}: Props) => {
  return (
    <div className="card-wrapper flex gap-6 rounded-[10px] p-9 sm:px-11">
      <div className="relative size-[64px] shrink-0">
        <Image
          src={employerLogo ?? '/images/jobs_logo.png'}
          fill
          alt={`${employer} logo`}
          className="flex-1 shrink-0 rounded-[10px]"
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="base-semibold text-dark200_light900 ">{title}</h3>
            {description && (
              <p className="text-dark500_light700 body-regular line-clamp-2">
                {description}
              </p>
            )}
          </div>
          <div className="shrink-0">
            <Badge className="body-medium background-light800_dark400  rounded-full">
              <span className="text-dark400_light700">{`${city}, ${country}`}</span>
            </Badge>
          </div>
        </div>
        <div className="flex items-start gap-6"></div>
      </div>
    </div>
  );
};

export default JobsCard;
