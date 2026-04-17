const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cpxklwevikwuumqvkzhy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNweGtsd2V2aWt3dXVtcXZremh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMTI2MDQsImV4cCI6MjA4Mzc4ODYwNH0.NYCuOkm0IzwoNoVyITKH2-uyr2fGP7onSHbQ-froeC4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    console.log('Fetching portfolios...');
    const { data, error } = await supabase
        .from('portfolios')
        .select('*, resumes(*)')
        .limit(5)
        .order('id', { ascending: false });

    if (error) {
        console.error('Error:', error);
        return;
    }

    data.forEach(p => {
        console.log('--- Portfolio ---');
        console.log('Slug:', p.slug);
        const resume = p.resumes;
        if (resume) {
            console.log('Education Structure:', JSON.stringify(resume.education, null, 2));
        } else {
            console.log('No resume joined.');
        }
    });
}

inspect();
