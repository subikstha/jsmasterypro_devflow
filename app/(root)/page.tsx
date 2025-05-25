import { Button } from '@/components/ui/button';
import QuestionCard from '@/components/cards/QuestionCard';
import HomeFilter from '@/components/filters/HomeFilter';
import LocalSearch from '@/components/search/LocalSearch';
import ROUTES from '@/constants/routes';

import Link from 'next/link';
import { auth } from '@/auth';
import { getQuestions } from '@/lib/actions/question.action';
const questions = [
  {
    _id: '1',
    title: 'How to learn React?',
    description: 'I want to learn React, can anyone help me?',
    tags: [
      { _id: '1', name: 'React' },
      { _id: '2', name: 'JavaScript' },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      image:
        'data:image/jpeg;base64,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',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date('2024-10-21'),
  },
  {
    _id: '2',
    title: 'How to learn JavaScript?',
    description: 'I want to learn JavaScript, can anyone help me?',
    tags: [
      { _id: '1', name: 'JavaScript' },
      { _id: '2', name: 'CSS' },
    ],
    author: {
      _id: '1',
      name: 'John Doe',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81rjOau5wfDHjVwwQgM9IFHi3srmU7Hjb0TE06w5GJfT4KpbIdtj0U14&s',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date('2024-01-21'),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const session = await auth();

  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || '',
    filter: filter || '',
  });

  console.log('Questions are', data, success, error);

  const { questions } = data || {};
  console.log('Session is', session);

  // const filteredQuestions = questions.filter((question) => {
  //   const matchesQuery = question.title
  //     .toLowerCase()
  //     .includes(query.toLowerCase());
  //   const matchesFilter = filter
  //     ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
  //     : true;
  //   return matchesQuery && matchesFilter;
  // });
  return (
    <>
      <section className=" w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center flex">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions && questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard key={question._id} question={question} />
          ))
        ) : (
          <div className="mt-10 flex w-full items-center justify-center">
            <p className="text-dark400_light700">No Questions Found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
