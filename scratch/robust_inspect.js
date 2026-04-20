
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    console.log('--- RESUME DATA INSPECTION ---');
    const { data, error } = await supabase
        .from('resumes')
        .select('id, title, personalDetails, hasPhoto, photoUri');

    if (error) {
        console.error(error);
        return;
    }

    data.forEach(r => {
        console.log(`Title: ${r.title}`);
        console.log(`ID: ${r.id}`);
        console.log(`hasPhoto: ${r.hasPhoto}`);
        console.log(`photoUri: ${r.photoUri}`);
        console.log(`Image (in personalDetails): ${r.personalDetails?.image}`);
        console.log(`Full Name: ${r.personalDetails?.fullName}`);
        console.log(`Job Title: ${r.personalDetails?.jobTitle}`);
        console.log('---');
    });
}

run();
