import React from 'react';

interface ResumeData {
  personalDetails: {
    fullName: string;
    surname: string;
    email: string;
    phone: string;
    location: string;
    jobTitle: string;
    image?: string;
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
  }>;
  skills: Array<{
    name: string;
    category: 'technical' | 'soft';
  }>;
  projects: Array<{
    title: string;
    description: string;
    link?: string;
    image?: string;
  }>;
}

export default function DesignerTemplate({ data }: { data: ResumeData }) {
  const { personalDetails, summary, skills, projects } = data;

  // Derive country from location (usually "City, Country" or just "Country")
  const locationParts = personalDetails?.location ? personalDetails.location.split(', ') : ["Switzerland"];
  const country = locationParts.length > 1 ? locationParts[locationParts.length - 1] : personalDetails?.location || "Switzerland";

  // Use the generated AI placeholder images
  const profileImage = personalDetails?.image || '/profile_male.png';

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans scroll-smooth">
      {/* ---------------- SECTION 1: HOME ---------------- */}
      <div id="home" className="flex flex-col md:flex-row h-screen w-full">
        {/* Left Side */}
        <div className="w-full md:w-[55%] flex flex-col justify-center px-12 md:px-24 bg-white relative">
          <div className="absolute top-12 left-12 md:left-24 font-serif text-2xl italic tracking-wide text-zinc-800 font-medium">
            {personalDetails?.fullName || "Marko Peric"}
          </div>
          
          <div className="max-w-2xl mt-20">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-zinc-900 leading-[1.2]">
              {personalDetails?.jobTitle || "UX UI Designer"} <span className="font-normal">&amp;</span> <br/>
              enthusiast <br/>
              from <span className="text-[#d83838]">{country}</span>.
            </h1>
          </div>

          <div className="absolute bottom-12 flex space-x-3 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] flex-wrap gap-y-2">
            <a href="#" className="hover:text-zinc-600">Dribbble</a><span>-</span>
            <a href="#" className="hover:text-zinc-600">Instagram</a><span>-</span>
            <a href="#" className="hover:text-zinc-600">LinkedIn</a><span>-</span>
            <a href="#" className="hover:text-zinc-600">Github</a><span>-</span>
            <a href={`mailto:${personalDetails?.email}`} className="hover:text-zinc-600">Email</a>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="w-full md:w-[45%] h-full bg-[#1c1c1c] relative overflow-hidden">
          <img 
            src={profileImage} 
            alt="Profile View" 
            className="w-full h-full object-cover grayscale opacity-90 object-top" 
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply flex items-center justify-center text-zinc-800"></div>
          
          {/* Navigation over image */}
          <div className="absolute top-12 right-12 md:right-24 flex space-x-8 text-[11px] font-bold text-white uppercase tracking-[0.1em] z-10 hidden md:flex">
            <a href="#about" className="hover:text-zinc-300 transition-colors">About</a>
            <a href="#work" className="hover:text-zinc-300 transition-colors">Work</a>
            <a href="#contact" className="hover:text-zinc-300 transition-colors">Contact</a>
          </div>

          <div className="absolute bottom-12 right-12 md:right-24 text-[10px] text-zinc-400 tracking-[0.1em]">
            &copy; {new Date().getFullYear()} {personalDetails?.fullName || "Marko"}
          </div>
        </div>
      </div>

      {/* ---------------- SECTION 2: ABOUT ---------------- */}
      <div id="about" className="flex flex-col md:flex-row min-h-screen w-full bg-white text-zinc-800 p-12 md:p-24 relative">
        <div className="absolute top-12 left-12 md:left-24 font-serif text-2xl italic tracking-wide text-zinc-800 font-medium">
          <a href="#home">{personalDetails?.fullName || "Marko Peric"}</a>
        </div>
        <div className="absolute top-12 right-12 md:right-24 flex space-x-8 text-[11px] font-bold text-zinc-800 uppercase tracking-[0.1em] z-10 hidden md:flex">
          <a href="#about" className="text-[#d83838]">About</a>
          <a href="#work" className="hover:text-zinc-500 transition-colors">Work</a>
          <a href="#contact" className="hover:text-zinc-500 transition-colors">Contact</a>
        </div>

        {/* Left Side Image (smaller) */}
        <div className="w-full md:w-[35%] flex items-center justify-center mt-32 md:mt-0">
          <div className="max-w-[320px] w-full aspect-[3/4] relative overflow-hidden shadow-sm">
            <img 
              src={profileImage} 
              alt="Profile About" 
              className="w-full h-full object-cover grayscale" 
            />
          </div>
        </div>
        
        {/* Right Side Text */}
        <div className="w-full md:w-[65%] flex flex-col justify-center px-0 md:px-24 mt-16 md:mt-0">
          <h2 className="text-4xl md:text-[3.5rem] font-serif font-black text-zinc-900 mb-10 tracking-tight">
            Hi,
          </h2>
          <div className="space-y-8 text-zinc-500 font-serif leading-relaxed text-[17px] max-w-2xl">
            <p>
              I am a <span className="text-[#d83838]">professional</span> focused on {personalDetails?.jobTitle || "my craft"}, based in {country}. I am highly passionate about my work.
            </p>
            {summary && (
              <p className="text-zinc-600">
                {summary}
              </p>
            )}
            {skills && skills.length > 0 && (
              <p>
                My favorite everyday tools are <span className="text-[#d83838]">critical thinking</span>, creativity, and solid workflows. I'm advanced in {skills.slice(0, 4).map(s => s.name).join(', ')}.
              </p>
            )}
            <p>
              I genuinely enjoy solving problems and aiming at a great user experience.
            </p>
          </div>
          <div className="mt-16">
            <a href="#" className="font-bold text-[10px] uppercase tracking-[0.2em] text-[#d83838] hover:text-red-700 transition-colors">
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* ---------------- SECTION 3: WORK / PROJECTS ---------------- */}
      {projects && projects.length > 0 && (
        <div id="work" className="flex flex-col min-h-screen w-full bg-white text-zinc-800 p-12 md:p-24 relative">
          <div className="absolute top-12 left-12 md:left-24 font-serif text-2xl italic tracking-wide text-zinc-800 font-medium z-20">
            <a href="#home">{personalDetails?.fullName || "Marko Peric"}</a>
          </div>
          <div className="absolute top-12 right-12 md:right-24 flex space-x-8 text-[11px] font-bold text-zinc-800 uppercase tracking-[0.1em] z-10 hidden md:flex z-20">
            <a href="#about" className="hover:text-zinc-500 transition-colors">About</a>
            <a href="#work" className="text-[#d83838]">Work</a>
            <a href="#contact" className="hover:text-zinc-500 transition-colors">Contact</a>
          </div>

          <div className="mt-32 max-w-2xl z-10">
            <h2 className="text-4xl md:text-[3rem] font-serif font-black text-zinc-900 mb-6 tracking-tight">
              Selected projects
            </h2>
            <p className="text-zinc-500 font-serif leading-relaxed text-[19px]">
              I work with <span className="text-[#d83838]">clients</span> around the world to build amazing apps, products and services.
            </p>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 max-w-5xl w-full z-10">
            {projects.slice(0, 4).map((proj, idx) => (
              <div key={idx} className="flex flex-col group">
                <div className="w-full aspect-[4/3] bg-zinc-100 overflow-hidden mb-8 relative">
                  <img 
                    src={proj.image || `/project_${(idx % 2) + 1}.png`} 
                    alt={proj.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  {proj.link && (
                    <a href={proj.link} className="absolute inset-0 z-10" target="_blank" rel="noreferrer"></a>
                  )}
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-800 mb-3 bg-zinc-100/80 inline-block px-2 py-1 absolute mt-[280px] ml-4 md:mt-[230px] lg:mt-[280px]">
                  {proj.title}
                </h3>
                <p className="text-zinc-500 font-serif line-clamp-3 p-4">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- SECTION 4: CONTACT ---------------- */}
      <div id="contact" className="flex flex-col min-h-screen w-full bg-white text-zinc-800 p-12 md:p-24 relative">
        <div className="absolute top-12 left-12 md:left-24 font-serif text-2xl italic tracking-wide text-zinc-800 font-medium">
          <a href="#home">{personalDetails?.fullName || "Marko Peric"}</a>
        </div>
        <div className="absolute top-12 right-12 md:right-24 flex space-x-8 text-[11px] font-bold text-zinc-800 uppercase tracking-[0.1em] z-10 hidden md:flex">
          <a href="#about" className="hover:text-zinc-500 transition-colors">About</a>
          <a href="#work" className="hover:text-zinc-500 transition-colors">Work</a>
          <a href="#contact" className="text-[#d83838]">Contact</a>
        </div>

        <div className="flex-grow flex flex-col justify-center items-start max-w-4xl mt-32">
          <h2 className="text-5xl md:text-[5.5rem] font-serif font-black text-zinc-900 leading-[1.1] tracking-tight mb-8">
            Interested in working with me?<br/>
            Or just want to say 'Hello'?
          </h2>
          <a href={`mailto:${personalDetails?.email}`} className="text-3xl md:text-[2.5rem] font-serif font-black text-[#d83838] hover:text-red-700 transition-colors tracking-tight">
            {personalDetails?.email || "hello@example.com"}
          </a>
        </div>

        <div className="absolute bottom-12 left-12 md:left-24 right-12 md:right-24 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
          <div className="flex space-x-3 mb-4 md:mb-0 flex-wrap gap-y-2">
            <a href="#" className="hover:text-zinc-600 transition-colors">Dribbble</a><span>-</span>
            <a href="#" className="hover:text-zinc-600 transition-colors">Instagram</a><span>-</span>
            <a href="#" className="hover:text-zinc-600 transition-colors">LinkedIn</a><span>-</span>
            <a href="#" className="hover:text-zinc-600 transition-colors">Github</a><span>-</span>
            <a href={`mailto:${personalDetails?.email}`} className="hover:text-zinc-600 transition-colors">Email</a>
          </div>
          <div>
            &copy; {new Date().getFullYear()} {personalDetails?.fullName || "Marko Peric"}
          </div>
        </div>
      </div>
    </div>
  );
}
