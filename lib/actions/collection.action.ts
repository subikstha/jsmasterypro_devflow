'use server';

import { revalidatePath } from 'next/cache';

import ROUTES from '@/constants/routes';
import { Collection, Question } from '@/database';

import action from '../handlers/action';
import handleError from '../handlers/error';
import { CollectionBaseSchema } from '../validations';

export async function toggleSaveQuestion(
  params: CollectionBaseParams
): Promise<ActionResponse<{ saved: boolean }>> {
  const validationResult = await action({
    params,
    schema: CollectionBaseSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;

  const userId = validationResult.session?.user?.id;

  try {
    // Fetch the question that we want to save
    const question = await Question.findById(questionId);

    if (!question) throw new Error('Question not found');

    // Now we create a new collection
    // First we check if the collection already exists
    const collection = await Collection.findOne({
      question: questionId,
      author: userId,
    });

    if (collection) {
      // Remove from the collection
      await Collection.findByIdAndDelete(collection.id);

      return {
        success: true,
        data: {
          saved: false,
        },
      };
    } else {
      await Collection.create({
        author: userId,
        question: questionId,
      });

      revalidatePath(ROUTES.QUESTION(questionId));
      return {
        success: true,
        data: {
          saved: true,
        },
      };
    }
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
