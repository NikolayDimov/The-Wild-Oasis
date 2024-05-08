import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zqhphtmaustafqcuqtqa.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxaHBodG1hdXN0YWZxY3VxdHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwOTIyODksImV4cCI6MjAzMDY2ODI4OX0.zraIbmhsg2Co4m5pk3wtmUYimxkyi2n9ZTbpKK_rdsQ";

if (!supabaseKey) {
    throw new Error("Supabase key is not defined in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
