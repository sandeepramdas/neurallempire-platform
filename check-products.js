const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ktcwakkpcgiusjuhlpjy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Y3dha2twY2dpdXNqdWhscGp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODExMzg4MCwiZXhwIjoyMDgzNjg5ODgwfQ.fklJJ9R_yQXTauXvKTPzjrrQSlWSU6Etdt0PIYnqvBU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log('\n📦 Products in Supabase:\n');
  products.forEach(p => {
    console.log(`  • ${p.name} (slug: ${p.slug})`);
    if (p.description) console.log(`    ${p.description}`);
  });

  console.log(`\nTotal: ${products.length} products`);
}

checkProducts();
