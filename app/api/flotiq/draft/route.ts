import { draftMode } from 'next/headers';
import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { getAbsoluteUrl } from '@/app/_lib/helpers';

export async function GET(req: NextRequest) {
  const editorKey = req.nextUrl.searchParams.get('key') || '';
  const redirectPath = req.nextUrl.searchParams.get('redirect') || '/';
  if (editorKey !== process.env.FLOTIQ_EDITOR_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  const draftState = await draftMode();
  const newDraft = req.nextUrl.searchParams.has('draft')
    ? req.nextUrl.searchParams.get('draft') === 'true'
    : !draftState.isEnabled;

  if (newDraft) {
    draftState.enable();
  } else {
    draftState.disable();
  }
  redirect(getAbsoluteUrl(redirectPath));
}
