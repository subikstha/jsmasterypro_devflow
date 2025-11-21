import { redirect } from 'next/navigation';
import React from 'react';

import { auth } from '@/auth';
import EditProfileForm from '@/components/forms/EditProfileForm';
import { getUser } from '@/lib/actions/user.action';

const EditProfile = async () => {
  const loggedInUser = await auth();
  if (!loggedInUser) redirect('/sign-in');
  const userId = loggedInUser.user?.id;
  if (!userId) redirect('/sign-in');

  const { success, data: user } = await getUser({ userId });

  if (!success || !user) return;
  console.log('This is the user in the edit page', user);
  return (
    <div>
      <EditProfileForm name={user.user.name} username={user.user.username} />
    </div>
  );
};

export default EditProfile;
