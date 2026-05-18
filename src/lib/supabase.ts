import { createClient } from "@supabase/supabase-js";

// anon key is safe to expose — Supabase RLS policies restrict data access per user
export const supabase = createClient(
  "https://ttebvjaindmwcdhnpbhc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0ZWJ2amFpbmRtd2NkaG5wYmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMTY1MTcsImV4cCI6MjA5NDY5MjUxN30.NZXn--xmagI29_20Rb_Lk2byda5FgogD0PCxnrlpgSg"
);
