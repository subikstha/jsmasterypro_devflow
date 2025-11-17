import Image from 'next/image';

interface Props {
  title: string;
  employerLogo: string | null;
  employer: string | null;
}

const JobsCard = ({ title, employerLogo, employer }: Props) => {
  return (
    <div className="card-wrapper flex gap-6 rounded-[10px] p-9 sm:px-11">
      <Image
        src={employerLogo ?? '/images/placeholder.png'}
        width={64}
        height={64}
        alt={`${employer} logo`}
      />
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-6">
          <div className="flex flex-col">
            <h3>{title}</h3>
          </div>
        </div>
        <div className="flex items-start gap-6"></div>
      </div>
    </div>
  );
};

export default JobsCard;
