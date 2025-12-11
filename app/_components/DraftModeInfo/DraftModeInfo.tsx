'use client';
import { usePathname } from 'next/navigation';

export function DraftModeInfo({ editorKey }: { readonly editorKey: string }) {
  const pathname = usePathname();

  return (
    <div>
      <div className="bg-yellow-400 text-center text-slate-800 p-2">
        You are browsing unpublished changes. Click here to go back to viewing
        published versions only:
        <a
          href={`/api/flotiq/draft?key=${editorKey || ''}&draft=false&redirect=${encodeURIComponent(pathname)}`}
          className="m-2 hover:text-red font-bold"
        >
          ✕
        </a>
      </div>
    </div>
  );
}
