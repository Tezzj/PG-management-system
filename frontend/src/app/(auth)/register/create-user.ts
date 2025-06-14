'use server';

import { post } from '@/lib/util/fetch';
import { redirect } from 'next/navigation';
import { FormError } from '@/lib/interfaces/form-error.interface';

export default async function createUser(
  _prevState: FormError,
  formData: FormData
) {
  const { error } = await post('users', formData);

  if (error) {
    return { error };
  }

  redirect('/login');
}
