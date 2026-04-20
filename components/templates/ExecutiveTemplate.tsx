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

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, experience, education, skills, projects } = data;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl min-h-screen flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-80 bg-slate-900 text-white p-10 flex flex-col gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center mb-6 border-4 border-slate-700">
              <span className="text-4xl font-bold tracking-tighter">
                {personalDetails.fullName[0]}{personalDetails.surname[0]}
              </span>
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-widest">{personalDetails.fullName}</h1>
            <h2 className="text-slate-400 font-medium mt-1">{personalDetails.jobTitle}</h2>
          </div>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 border-b border-slate-800 pb-2">Contact</h3>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <span className="text-slate-500">E</span> {personalDetails.email}
              </p>
              <p className="flex items-center gap-3">
                <span className="text-slate-500">P</span> {personalDetails.phone}
              </p>
              <p className="flex items-center gap-3">
                <span className="text-slate-500">L</span> {personalDetails.location}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 border-b border-slate-800 pb-2">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {skills?.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-slate-800 rounded text-xs font-medium">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {education && education.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 border-b border-slate-800 pb-2">Education</h3>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <div key={i}>
                    <p className="text-sm font-bold">{edu.degree}</p>
                    <p className="text-xs text-slate-400 mt-1">{edu.institution}</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 md:p-16">
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-4">
              Professional Profile
              <div className="h-[2px] flex-1 bg-slate-100"></div>
            </h2>
            {summary && (
              <p className="text-lg leading-relaxed text-slate-600 italic border-l-4 border-slate-900 pl-6">
                "{summary}"
              </p>
            )}
          </section>

          {experience && experience.length > 0 && (
            <section className="mb-20">
              <h2 className="text-2xl font-bold text-slate-900 mb-10 flex items-center gap-4">
                Career History
                <div className="h-[2px] flex-1 bg-slate-100"></div>
              </h2>
              <div className="space-y-12">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l border-slate-200">
                    <div className="absolute w-3 h-3 bg-slate-900 rounded-full -left-[6px] top-2"></div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                        <p className="text-slate-500 font-medium">{exp.company} | {exp.location}</p>
                      </div>
                      <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-10 flex items-center gap-4">
                Key Projects
                <div className="h-[2px] flex-1 bg-slate-100"></div>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                  <div key={i} className="p-6 border border-slate-100 rounded-xl hover:border-slate-300 transition-all group">
                    <h3 className="font-bold text-slate-900 mb-2 flex items-center justify-between">
                      {project.title}
                      {project.link && (
                        <a href={project.link} className="opacity-0 group-hover:opacity-100 text-blue-600 transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
