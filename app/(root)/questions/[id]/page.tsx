import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

import AllAnswers from '@/components/answers/AllAnswers';
import TagCard from '@/components/cards/TagCard';
import Preview from '@/components/editor/Preview';
import AnswerForm from '@/components/forms/AnswerForm';
import Metric from '@/components/Metric';
import SaveQuestion from '@/components/questions/SaveQuestion';
import UserAvatar from '@/components/UserAvatar';
import Votes from '@/components/votes/Votes';
import ROUTES from '@/constants/routes';
import { getAnswers } from '@/lib/actions/answer.action';
import { getQuestion, incrementViews } from '@/lib/actions/question.action';
import { hasVoted } from '@/lib/actions/vote.action';
import { formatNumber, getTimeStamp } from '@/lib/utils';

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  // NOTE: We can only do parallel requests like below if one request does not depend on another
  const [, { success, data: question }] = await Promise.all([
    await incrementViews({ questionId: id }),
    await getQuestion({ questionId: id }),
  ]);

  if (!success || !question) redirect('/404');

  const {
    success: areAnswersLoaded,
    data: answerResult,
    error: answersError,
  } = await getAnswers({
    questionId: id,
    page: 1,
    pageSize: 10,
    filter: 'latest',
  });

  const hasVotedPromise = hasVoted({
    targetId: question._id,
    targetType: 'question',
  });

  const { author, title, createdAt, answers, views, content, tags } = question;
  return (
    <>
      {/* <View questionId={id} /> */}
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              imageUrl={author.image}
              className="size-[22px]"
              fallbackClassName="text-[10px]"
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="paragraph-semibold text-dark300_light700">
                {author.name}
              </p>
            </Link>
          </div>
          <div className="flex justify-end">
            <Suspense fallback={<div>Loading...</div>}>
              <Votes
                targetType="question"
                upvotes={question.upvotes}
                downvotes={question.downvotes}
                targetId={question._id}
                hasVotedPromise={hasVotedPromise}
              />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <SaveQuestion questionId={question._id} />
            </Suspense>
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full">
          {title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimeStamp(new Date(createdAt))}`}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
        <Metric
          imgUrl="/icons/message.svg"
          alt="message icon"
          value={answers}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
        <Metric
          imgUrl="/icons/eye.svg"
          alt="eye icon"
          value={formatNumber(views)}
          title=""
          textStyles="small-regular text-dark400_light700"
        />
      </div>
      <Preview content={content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard
            key={tag._id}
            _id={tag._id as string}
            name={tag.name}
            compact
          />
        ))}
      </div>
      <section className="my-5">
        <AllAnswers
          data={answerResult?.answers}
          success={areAnswersLoaded}
          error={answersError}
          totalAnswers={answerResult?.totalAnswers || 0}
        />
      </section>
      <section className="my-5">
        <AnswerForm
          questionId={question._id}
          questionTitle={question.title}
          questionContent={question.content}
        />
      </section>
    </>
  );
};

export default QuestionDetails;
