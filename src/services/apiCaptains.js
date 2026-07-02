import { supabase } from "./supabase";

// get captains state form viwe table which calc everything form the sql

export async function getCaptainStats() {
  const { data, error } = await supabase.from("captain_stats").select("*");

  if (error) throw error;

  return data;
}

// to get captains data
export async function getCaptains() {
  const { data, error } = await supabase.from("captains").select("*");

  if (error) throw new Error(error.message);

  return data;
}

// get captin_State by id
export async function getCaptainStatsById(id) {
  const { data, error } = await supabase
    .from("captain_stats") // اسم الـ View
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

// to create new cpatain
export async function createCaptain(newCaptain) {
  const { data, error } = await supabase
    .from("captains")
    .insert([newCaptain])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Captain could not be created");
  }

  return data;
}

// For Updating
export async function updateCaptain(id, updatedData) {
  const { data, error } = await supabase
    .from("captains")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("حدث خطأ أثناء تحديث بيانات الكابتن");
  }

  return data;
}

// get all members with the captain
export async function getCaptainMembers(id, page, pageSize) {
  let query = supabase
    .from("members_view")
    .select("*", { count: "exact" })
    .eq("captain_id", id);

  //[1] pagination
  if (page) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return { data, count };
}
