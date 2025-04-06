import React from 'react';

const QuestionDetails = async ({ params }: RouteParams) => {
  const {id} = await params;
  return (
    <div>
      Question Page: <span>{id}</span>
    </div>
  );
};

export default QuestionDetails;
