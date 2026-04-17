import React from 'react';

interface ResumeData {
  personalDetails: {
    fullName: string;
    surname: string;
    email: string;
    phone: string;
    location: string;
    jobTitle: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field?: string;
    startDate?: string;
    endDate?: string;
    courses?: string;
  }>;
  skills: Array<{
    name: string;
    category: 'technical' | 'soft';
  }>;
  projects: Array<{
    title: string;
    description: string;
    link?: string;
  }>;
}

export default function SimpleTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, experience, education, skills, projects } = data;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-100">
      {/* Header / Hero */}
      <header className="py-20 px-6 max-w-5xl mx-auto border-b border-zinc-100">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black flex flex-wrap gap-x-4">
              <span>{personalDetails.fullName}</span>
              <span className="text-zinc-400">{personalDetails.surname}</span>
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-zinc-600 font-medium">
              {personalDetails.jobTitle}
            </p>
          </div>
          <div className="flex flex-col gap-1 text-zinc-500 font-medium md:text-right">
            <p>{personalDetails.email}</p>
            <p>{personalDetails.phone}</p>
            <p>{personalDetails.location}</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Left Column (Main Content) */}
        <div className="md:col-span-8 space-y-20">
          {/* About */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-8">About Me</h2>
            <p className="text-xl leading-relaxed text-zinc-700">
              {summary}
            </p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-8">Professional Experience</h2>
            <div className="space-y-12">
              {experience?.map((exp, i) => (
                <div key={i} className="group">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                    <h3 className="text-2xl font-bold text-black group-hover:text-blue-600 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-sm font-medium text-zinc-400">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-lg text-zinc-600 font-medium mb-4">{exp.company} • {exp.location}</p>
                  <p className="text-zinc-600 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-8">Selected Projects</h2>
            <div className="grid grid-cols-1 gap-8">
              {projects?.map((project, i) => (
                <div key={i} className="p-8 bg-zinc-50 rounded-2xl hover:bg-zinc-100 transition-colors">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    {project.title}
                    {project.link && (
                      <a href={project.link} className="text-blue-500 hover:text-blue-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="md:col-span-4 space-y-16">
          {/* Skills */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-8">Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {skills?.map((skill, i) => (
                <span key={i} className={`px-4 py-2 rounded-full text-sm font-bold ${
                  skill.category === 'technical' 
                  ? 'bg-black text-white' 
                  : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-8">Education</h2>
            <div className="space-y-8">
              {education?.map((edu, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </h3>
                  <p className="text-zinc-600 font-medium leading-tight">{edu.institution}</p>
                  {(edu.startDate || edu.endDate) && (
                    <p className="text-sm text-zinc-400 mt-1">{edu.startDate} — {edu.endDate}</p>
                  )}
                  {edu.courses && (
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                      <span className="font-bold text-zinc-400">COURSES:</span> {edu.courses}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 bg-zinc-50 text-center">
        <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">
          Generated via JobReady Portfolio
        </p>
      </footer>
    </div>
  );
}
