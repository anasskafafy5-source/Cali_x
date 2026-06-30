// add new member
import { supabase } from "./supabase";

export async function createMember(memberData) {
  const { data, error } = await supabase
    .from("members")
    .insert([memberData])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("حدث خطأ أثناء إضافة العضو");
  }

  return data;
}

// Get all Memeber for memeber_view
export async function getAllMembersView() {
  const { data, error } = await supabase.from("members_view").select("*"); // النجمة تعني جلب كل الأعمدة

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// update the member data
export async function updateMember(id, memberData) {
  const { data, error } = await supabase
    .from("members")
    .update(memberData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("حدث خطأ أثناء تحديث بيانات العضو");
  }

  return data;
}

// delete member
export async function deleteMember(id) {
  const { error } = await supabase.from("members").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete member");
  }

  return true;
}

// get member by id
export async function getMemberStatsById(id) {
  const { data, error } = await supabase
    .from("members_view")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't get member stats");
  }

  return data;
}
