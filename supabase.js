const SUPABASE_URL = "https://mgtzyzltfddumfquujmh.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndHp5emx0ZmRkdW1mcXV1am1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczOTAwMTAsImV4cCI6MjA5Mjk2NjAxMH0.jqHdGq2C4-Ey9rAs5tp7salZzFwy_Ad3hzK_qF4_wWg";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);