import { NextRequest } from 'next/server';
import { livePreview } from '@flotiq/nextjs-live-preview/server';
import { redirect } from 'next/navigation';
import { getAbsoluteUrl } from '@/app/_lib/helpers';

export async function GET(req: NextRequest) {
  const redirectPath = req.nextUrl.searchParams.get('redirect') || '/';
  const clientAuthKey = req.nextUrl.searchParams.get('editor_key');

  if (clientAuthKey !== process.env.FLOTIQ_EDITOR_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  const livePreviewState = await livePreview();
  const newLivePreview = req.nextUrl.searchParams.has('live-preview')
    ? req.nextUrl.searchParams.get('live-preview') === 'true'
    : !livePreviewState.isEnabled;

  if (newLivePreview) {
    livePreviewState.enable(req);
  } else {
    livePreviewState.disable();
  }
  redirect(getAbsoluteUrl(redirectPath));
}
