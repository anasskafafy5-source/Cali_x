// get the setting
import { supabase } from "./supabase";

// Get settings
export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) throw error;

  return data;
}

// Update settings
export async function updateSettings(updatedData) {
  const { data, error } = await supabase
    .from("settings")
    .update(updatedData)
    .eq("id", 1)
    .select()
    .single();

  if (error) throw error;

  return data;
}
