const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ktcwakkpcgiusjuhlpjy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Y3dha2twY2dpdXNqdWhscGp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODExMzg4MCwiZXhwIjoyMDgzNjg5ODgwfQ.fklJJ9R_yQXTauXvKTPzjrrQSlWSU6Etdt0PIYnqvBU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function exploreTables() {
  try {
    // Get all tables in public schema
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (error) {
      // Alternative: Try a direct SQL query
      const { data: tablesData, error: sqlError } = await supabase.rpc('get_tables');

      if (sqlError) {
        console.log('Cannot query information_schema, trying known tables...');

        // Try common tables
        const tables = ['blog_posts', 'users', 'organizations', 'products', 'subscriptions'];

        for (const table of tables) {
          const { data, error, count } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });

          if (!error) {
            console.log(`✅ Table exists: ${table} (${count || 0} rows)`);
          }
        }
      } else {
        console.log('Tables found:', tablesData);
      }
    } else {
      console.log('All tables in database:');
      data.forEach(table => console.log(`  - ${table.table_name}`));
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

exploreTables();
