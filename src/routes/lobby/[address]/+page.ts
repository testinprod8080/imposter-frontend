import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load({ params }) {
  if (params.address)
    return { contractAddress: params.address };
 
  throw error(404, 'Not found');
}