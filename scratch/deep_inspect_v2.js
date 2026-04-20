
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function deepInspect() {
    console.log('--- DEEP INSPECTION ---');
    const { data: portfolios, error } = await supabase
        .from('portfolios')
        .select('*, resumes(*)');

    if (error) {
        console.error(error);
        return;
    }

    portfolios.forEach(p => {
        const r = p.resumes;
        if (!r) return;

        const isTeaching = r.title && r.title.toLowerCase().includes('teaching');
        if (!isTeaching) return;

        console.log(`Slug: ${p.slug}`);
        console.log(`Template: ${p.template_id}`);
        console.log(`Resume ID: ${r.id}`);
        console.log(`Resume Title: ${r.title}`);
        
        console.log(`  Experience (${r.experience?.length || 0}):`);
        (r.experience || []).forEach(e => console.log(`    - ${e.role} at ${e.company}`));
        
        console.log(`  Education (${r.education?.length || 0}):`);
        (r.education || []).forEach(e => console.log(`    - ${e.degree} at ${e.institution}`));
        
        console.log(`  Projects (${r.projects?.length || 0}):`);
        (r.projects || []).forEach(p => console.log(`    - TITLE: "${p.title}" DESC: "${p.description?.substring(0,30)}..."`));
        
        console.log('---');
    });
}

deepInspect();
