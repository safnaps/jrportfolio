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

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, experience, education, skills, projects } = data;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Decorative Background Element */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 py-24">
        {/* Hero Section */}
        <header className="mb-32 text-center">
          <div className="inline-block px-4 py-1 border border-zinc-800 rounded-full text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-12 animate-fade-in">
            Available for Projects
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            {personalDetails.fullName}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
            I'm a {personalDetails.jobTitle} based in {personalDetails.location}. {summary}
          </p>
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-bold tracking-widest uppercase text-zinc-500">
            <a href={`mailto:${personalDetails.email}`} className="hover:text-white transition-colors">{personalDetails.email}</a>
            <span className="text-zinc-800">/</span>
            <span>{personalDetails.phone}</span>
          </div>
        </header>

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section className="mb-40">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-purple-500">Experience</h2>
              <div className="h-[1px] flex-1 bg-zinc-800"></div>
            </div>
            <div className="space-y-24">
              {experience.map((exp, i) => (
                <div key={i} className="group">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-3">
                      <span className="text-sm font-bold text-zinc-600 tracking-widest uppercase">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <div className="md:col-span-9">
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-zinc-500 font-bold mb-6 text-lg uppercase tracking-wide">
                        {exp.company} • {exp.location}
                      </p>
                      <p className="text-zinc-400 leading-relaxed text-lg whitespace-pre-line max-w-2xl">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Grid */}
        {projects && projects.length > 0 && (
          <section className="mb-40">
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-blue-500">Projects</h2>
              <div className="h-[1px] flex-1 bg-zinc-800"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {projects.map((project, i) => (
                <div key={i} className="group relative">
                  <div className="aspect-video bg-zinc-900 rounded-3xl border border-zinc-800 mb-8 p-10 flex flex-col justify-end group-hover:border-zinc-700 transition-all overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-800/50 rounded-bl-[100px] border-b border-l border-zinc-700/50 group-hover:scale-110 transition-transform"></div>
                    
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-zinc-500 leading-relaxed line-clamp-2">{project.description}</p>
                    
                    {project.link && (
                      <a href={project.link} className="absolute inset-0 z-20"></a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Section: Skills & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          <section>
             <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-zinc-600 mb-12">Expertise</h2>
             <div className="flex flex-wrap gap-4">
               {skills?.map((skill, i) => (
                 <span key={i} className="text-2xl font-bold text-zinc-400 hover:text-white transition-colors cursor-default">
                   {skill.name}{i !== skills.length - 1 && <span className="text-zinc-800 ml-4">/</span>}
                 </span>
               ))}
             </div>
          </section>

          {education && education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-zinc-600 mb-12">Education</h2>
              <div className="space-y-12">
                {education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                    <p className="text-zinc-500 font-medium">{edu.institution}</p>
                    <p className="text-xs text-zinc-700 font-bold uppercase mt-2 tracking-widest">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-60 pt-20 border-t border-zinc-900 text-center">
          <p className="text-zinc-800 text-xs font-bold uppercase tracking-[1em]">
            Built with JobReady
          </p>
        </footer>
      </div>
    </div>
  );
}
