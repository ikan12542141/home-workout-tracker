import { PROGRAM } from "@/lib/program";
import HariDetail from "./HariDetail";

export function generateStaticParams() {
  const params: { minggu: string; hari: string }[] = [];
  for (const w of PROGRAM) {
    for (let i = 0; i < w.hari.length; i++) {
      params.push({ minggu: String(w.minggu), hari: String(i) });
    }
  }
  return params;
}

type Params = Promise<{ minggu: string; hari: string }>;

export default async function Page({ params }: { params: Params }) {
  const { minggu, hari } = await params;
  return <HariDetail minggu={minggu} hari={hari} />;
}
