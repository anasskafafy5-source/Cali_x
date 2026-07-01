import { supabase } from "./supabase";

export async function createTransaction(transactionData) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([transactionData])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to create transaction");
  }

  return data;
}

// to get all transactions

export async function getTransactions() {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
      *,
      member:members(id, full_name),
      captain:captains(id, full_name)
    `,
    )
    .order("paid_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch transactions");
  }

  return data;
}
