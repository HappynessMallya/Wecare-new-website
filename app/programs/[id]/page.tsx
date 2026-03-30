import { notFound } from 'next/navigation';
import { getProgramsPublic, getProgramDetailPublic } from '@/lib/public-api';
import { WHATSAPP_URL } from '@/lib/constants';
import { ProgramPageClient } from './ProgramPageClient';

const TAG_TO_ID: Record<string, string> = { t1: 'ecd', t2: 'quality-early-childhood-education', t3: 'child-care-in-public-spaces', t4: 'early-life-skills-training' };

export default async function ProgramDetailPage({ params }: { params: { id: string } }) {
  const [programs, detail] = await Promise.all([getProgramsPublic(), getProgramDetailPublic(params.id)]);
  const program = programs?.find((p) => p.id === params.id);
  if (!program) return notFound();

  const fallbackKey = TAG_TO_ID[program.tagType] ?? program.id;

  return <ProgramPageClient programId={fallbackKey} detail={detail} whatsappUrl={WHATSAPP_URL} />;
}
