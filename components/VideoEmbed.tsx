type Props = {
  videoId: string;
  title?: string;
};

/**
 * Embed YouTube video — lazy loaded via iframe loading="lazy".
 * Use just the YouTube video ID (the part after `v=` in the URL).
 */
export default function VideoEmbed({ videoId, title }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-lg">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title ?? `Video latihan: ${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
