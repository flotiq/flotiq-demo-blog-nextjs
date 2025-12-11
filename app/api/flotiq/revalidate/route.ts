import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const editorKey = req.headers.get('x-editor-key') || '';

  if (editorKey !== process.env.FLOTIQ_EDITOR_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  revalidateTag('flotiq-content', 'max');
  return new NextResponse(undefined, { status: 204 });
}
