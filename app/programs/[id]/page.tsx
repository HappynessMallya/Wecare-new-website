import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProgramsPublic, getProgramDetailPublic } from '@/lib/public-api';
import { WHATSAPP_URL } from '@/lib/constants';
import { ProgramPageClient } from './ProgramPageClient';

const TAG_TO_ID: Record<string, string> = { t1: 'ecd', t2: 'quality-early-childhood-education', t3: 'child-care-in-public-spaces', t4: 'early-life-skills-training' };

const PROGRAM_META: Record<string, { title: string; description: string }> = {
  ecd: { title: 'Early Childhood Development', description: "Holistic support for Tanzania's youngest children aged 0–8 through family engagement and community-led solutions in Mbeya and Mara." },
  'quality-early-childhood-education': { title: 'Quality Early Childhood Education', description: 'Structured early learning building school readiness, confidence, and lifelong learning foundations for children aged 1–5 in Tanzania.' },
  'child-care-in-public-spaces': { title: 'Child Care in Public Spaces', description: 'Safe, community-owned child care models in market spaces so Tanzanian parents can work while children learn and stay protected.' },
  'early-life-skills-training': { title: 'Early Life Skills Training', description: 'Age-appropriate life skills pathways strengthening social-emotional growth, creativity, and practical confidence for children aged 3+.' },
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const meta = PROGRAM_META[params.id];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/programs/${params.id}` },
    openGraph: {
      title: `${meta.title} | WeCare Foundation`,
      description: meta.description,
    },
  };
}

export default async function ProgramDetailPage({ params }: { params: { id: string } }) {
  const [programs, detail] = await Promise.all([getProgramsPublic(), getProgramDetailPublic(params.id)]);
  const program = programs?.find((p) => p.id === params.id);
  if (!program) return notFound();

  const fallbackKey = TAG_TO_ID[program.tagType] ?? program.id;

  return <ProgramPageClient programId={fallbackKey} detail={detail} whatsappUrl={WHATSAPP_URL} />;
}
