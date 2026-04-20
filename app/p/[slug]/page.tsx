import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import SimpleTemplate from '../../../components/templates/SimpleTemplate';
import ExecutiveTemplate from '../../../components/templates/ExecutiveTemplate';
import CreativeTemplate from '../../../components/templates/CreativeTemplate';
import DesignerTemplate from '../../../components/templates/DesignerTemplate';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PortfolioPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Fetch portfolio entry with joined resume data
  const { data: portfolio, error: pError } = await supabase
    .from('portfolios')
    .select('*, resumes(*)')
    .eq('slug', slug)
    .single();

  if (pError || !portfolio) {
    console.error('Portfolio fetch error:', pError);
    return notFound();
  }

  // The joined data comes back in the 'resumes' property
  const rawResume = portfolio.resumes;

  if (!rawResume) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-zinc-500">Resume data not found for this portfolio.</p>
      </div>
    );
  }

  // Map raw database fields to the Template's expected interface and filter out empty records
  const formattedData = {
    personalDetails: {
      fullName: rawResume.personalDetails?.fullName || 'Anonymous',
      surname: rawResume.personalDetails?.surname || '',
      email: rawResume.personalDetails?.email || '',
      phone: rawResume.personalDetails?.phone || '',
      location: `${rawResume.personalDetails?.city || ''}, ${rawResume.personalDetails?.country || ''}`,
      jobTitle: rawResume.personalDetails?.jobTitle || rawResume.targetJobTitle || 'Professional',
    },
    summary: rawResume.summary || rawResume.targetJobDescription || 'Passionate professional dedicated to delivering high-quality results.',
    experience: (rawResume.experience || []).filter((e: any) => e.company || e.role),
    education: (rawResume.education || []).filter((e: any) => e.institution || e.degree),
    skills: rawResume.skills || [],
    projects: (rawResume.projects || []).filter((p: any) => p.title || p.description),
  };

  // Render the selected template
  switch (portfolio.template_id) {
    case 'executive':
      return <ExecutiveTemplate data={formattedData as any} />;
    case 'designer':
      return <DesignerTemplate data={formattedData as any} />;
    case 'creative':
      return <CreativeTemplate data={formattedData as any} />;
    case 'simple':
    default:
      return <SimpleTemplate data={formattedData as any} />;
  }
}

// Force dynamic rendering to ensure fresh data
export const revalidate = 0; 
