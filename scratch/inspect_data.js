
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cpxklwevikwuumqvkzhy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNweGtsd2V2aWt3dXVtcXZremh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMTI2MDQsImV4cCI6MjA4Mzc4ODYwNH0.NYCuOkm0IzwoNoVyITKH2-uyr2fGP7onSHbQ-froeC4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectData() {
    console.log("Fetching portfolios...");
    const { data: portfolios, error: pError } = await supabase
        .from('portfolios')
        .select('id, slug, resume_id, template_id, created_at, resumes(id, title, projects)');

    if (pError) {
        console.error("Error fetching portfolios:", pError);
        return;
    }

    console.log("Portfolios found:", portfolios.length);
    portfolios.forEach(p => {
        console.log(`- Slug: ${p.slug}`);
        console.log(`  Template: ${p.template_id}`);
        console.log(`  Resume ID: ${p.resume_id}`);
        const rawProjects = p.resumes?.projects || [];
        const filteredProjects = rawProjects.filter(prj => prj.title?.trim() || prj.description?.trim());
        console.log(`  Resume Title: ${p.resumes?.title}`);
        console.log(`  Projects Count: ${rawProjects.length} (Filtered: ${filteredProjects.length})`);
        if (filteredProjects.length > 0) {
            console.log(`  Project Details: ${filteredProjects.map(pr => `[Title: ${pr.title || 'EMPTY'}, Desc: ${pr.description?.substring(0, 20) || 'EMPTY'}]`).join(', ')}`);
        }
        console.log('---');
    });
}

inspectData();
