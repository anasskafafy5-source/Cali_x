import { supabase } from "./supabase";

// Get all sessions
export async function getSessions() {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;

  return data;
}

// Add new session
export async function addSession(newSession) {
  // 1- Add session
  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .insert([newSession])
    .select()
    .single();

  if (sessionError) throw sessionError;

  // 2- Add transaction
  const { error: transactionError } = await supabase
    .from("transactions")
    .insert([
      {
        member_id: null, // لأن الـ session مش مرتبطة بعضو
        captain_id: newSession.captain_id,
        type_transaction: "session",
        direction: "income",
        amount_paid: newSession.price,
        notes: ` حصه لي الاعب ${newSession.member_name}`,
        paid_at: newSession.date,
      },
    ]);

  if (transactionError) throw transactionError;

  return session;
}
