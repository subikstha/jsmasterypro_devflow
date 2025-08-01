import React from 'react';

import { AnswerFilters } from '@/constants/filters';
import { EMPTY_ANSWERS } from '@/constants/states';

import AnswerCard from '../cards/AnswerCard';
import DataRenderer from '../DataRenderer';
import CommonFilter from '../filters/CommonFilter';
import Pagination from '../Pagination';
interface Props extends ActionResponse<Answer[]> {
  totalAnswers: number;
  page: number;
  isNext: boolean;
}

const AllAnswers = ({
  page,
  isNext,
  data,
  success,
  error,
  totalAnswers,
}: Props) => {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? 'Answer' : 'Answers'}{' '}
        </h3>
        <CommonFilter
          filters={AnswerFilters}
          otherClasses="sm:min-w-32"
          containerClasses="max-xs:w-full"
        />
      </div>

      <DataRenderer
        data={data}
        error={error}
        success={success}
        render={(answers) =>
          answers.map((answer) => <AnswerCard key={answer._id} {...answer} />)
        }
        empty={EMPTY_ANSWERS}
      />
      <Pagination page={page} isNext={isNext || false} />
    </div>
  );
};

export default AllAnswers;
