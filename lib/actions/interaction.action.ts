import mongoose from 'mongoose';

import Interaction, { IInteraction } from '@/database/interaction.model';

import action from '../handlers/action';
import handleError from '../handlers/error';
import { CreateInteractionSchema } from '../validations';

export async function createInteraction(
  params: CreateInteractionParams
): Promise<ActionResponse<IInteraction>> {
  const validationResult = await action({
    params,
    schema: CreateInteractionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    action: actionType,
    actionId,
    actionTarget,
    authorId,
  } = validationResult.params!;

  const userId = validationResult.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [interaction] = await Interaction.create(
      [
        {
          user: userId,
          action: actionType,
          actionId,
          actionType: actionTarget,
        },
      ],
      { session }
    );

    // TODO: Update reputation for both the performer and the content author
    await updateReuptation({
      interaction,
      session,
      performerId: userId!,
      authorId,
    });
    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(interaction)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function updateReuptation(params: UpdateReputationParams) {
  const { interaction, session, performerId, authorId } = params;
  const { action, actionType } = interaction;

  let performerPoints = 0;
  let authorPoints = 0;

  switch (action) {
    case 'upvote':
      performerPoints = 2;
      authorPoints = 10;
      break;
    case 'downvote':
      performerPoints = -1;
      authorPoints = -2;
      break;
    case 'post':
      authorPoints = actionType === 'question' ? 5 : 10;
      break;
    case 'delete':
      authorPoints = actionType === 'question' ? -5 : -10;
      break;
  }
}
