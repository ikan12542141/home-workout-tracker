import { EXERCISES } from "@/lib/exercises";
import LatihanDetail from "./LatihanDetail";

export function generateStaticParams() {
  return EXERCISES.map((e) => ({ id: e.id }));
}

type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  return <LatihanDetail id={id} />;
}
