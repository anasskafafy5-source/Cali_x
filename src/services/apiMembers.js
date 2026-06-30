// add new member
import { supabase } from "./supabase";

export async function createMember(memberData) {
  // 1- إضافة العضو
  const { data: member, error: memberError } = await supabase
    .from("members")
    .insert([memberData])
    .select()
    .single();

  if (memberError) {
    console.error(memberError);
    throw new Error("حدث خطأ أثناء إضافة العضو");
  }

  // 2- تسجيل أول دفعة في transactions
  if (member.paid_amount > 0) {
    const { error: transactionError } = await supabase
      .from("transactions")
      .insert([
        {
          member_id: member.id,
          captain_id: member.captain_id,
          type_transaction: "new_member",
          direction: "income",
          amount_paid: member.paid_amount,
          notes: "تسجيل عضو جديد",
          paid_at: new Date().toISOString(),
        },
      ]);

    if (transactionError) {
      console.error(transactionError);
      throw new Error("تم إضافة العضو ولكن فشل تسجيل العملية المالية");
    }
  }

  return member;
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

// PayBack and save it in transacrions

export async function payMember(id, memberData, amountPaid) {
  // تحديث بيانات العضو
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

  // تسجيل العملية المالية
  const { error: transactionError } = await supabase
    .from("transactions")
    .insert({
      member_id: id,
      captain_id: data.captain_id,
      type_transaction: "debt_payment",
      direction: "income",
      amount_paid: amountPaid,
      notes: "سداد المبلغ المستحق",
      paid_at: new Date().toISOString(),
    });

  if (transactionError) {
    console.error(transactionError);
    throw new Error("تم تحديث العضو ولكن فشل تسجيل العملية المالية");
  }

  return data;
}

// Renew member subscription
export async function renewMember(id, memberData, amountPaid = 0) {
  // 1- تحديث بيانات العضو
  const { data, error } = await supabase
    .from("members")
    .update(memberData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("حدث خطأ أثناء تجديد الاشتراك");
  }

  // 2- تسجيل العملية المالية إذا تم دفع مبلغ
  if (amountPaid > 0) {
    const { error: transactionError } = await supabase
      .from("transactions")
      .insert([
        {
          member_id: id,
          captain_id: data.captain_id,
          type_transaction: "renewal",
          direction: "income",
          amount_paid: amountPaid,
          notes: "تجديد الاشتراك",
          paid_at: new Date().toISOString(),
        },
      ]);

    if (transactionError) {
      console.error(transactionError);
      throw new Error("تم تجديد الاشتراك ولكن فشل تسجيل العملية المالية");
    }
  }

  return data;
}
