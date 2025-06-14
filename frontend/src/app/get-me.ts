'use server';

import { get } from '@/lib/util/fetch';

export default async function getMe() {
  return get('users/me');
}
