
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectTeachingResume() {
    const { data: teachingResumes, error } = await supabase
        .from('portfolios')
        .select('*, resumes(*)')
        .ilike('slug', '%teaching%');

    if (error) {
        console.error(error);
        return;
    }

    teachingResumes.forEach(p => {
        console.log(`Slug: ${p.slug}`);
        console.log(`Resume Title: ${p.resumes?.title}`);
        console.log(`Experience: ${JSON.stringify(p.resumes?.experience)}`);
        console.log(`Education: ${JSON.stringify(p.resumes?.education)}`);
        console.log(`Projects: ${JSON.stringify(p.resumes?.projects)}`);
        console.log('---');
    });
}

inspectTeachingResume();
