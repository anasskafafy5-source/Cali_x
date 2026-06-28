export function formatCurrency(amount, fractionDigits = 2) {
  if (amount === null || amount === undefined || isNaN(amount)) return "0.00";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(Number(amount));
}

// utils/formatDateForDB.js

// utils/formatDateForDB.js

export function formatDateForDB(date) {
  if (!date) return null;

  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// help in adding new member
export function buildMemberData(values, captainState) {
  const subscriptionPrice = Number(values.subscription_price);
  const paidAmount = Number(values.paid_amount);
  const captain = captainState.find((c) => c.id === Number(values.captain));

  return {
    full_name: values.full_name,
    captain_name: captain.full_name,
    captain_id: captain.id,
    phone: values.phone,
    age: Number(values.age) || null,
    notes: values.notes || "",

    subscription_price: subscriptionPrice,
    paid_amount: paidAmount,
    remaining_amount: subscriptionPrice - paidAmount,

    subscription_start_date: formatDateForDB(values.subscription_start_date),

    subscription_end_date: formatDateForDB(values.subscription_end_date),
    last_payment_date: formatDateForDB(values.subscription_start_date),

    is_frozen: false,
    frozen_days: 0,
    freeze_reason: "",
  };
}

// help in renew the member

export function buildRenewalData(values, member) {
  const subscriptionPrice = Number(member.subscription_price);
  const paidAmount = Number(values.paid_amount);

  return {
    subscription_price: subscriptionPrice,

    paid_amount: paidAmount,

    remaining_amount: Math.max(subscriptionPrice - paidAmount, 0),

    subscription_start_date: formatDateForDB(values.subscription_start_date),

    subscription_end_date: formatDateForDB(values.subscription_end_date),

    last_payment_date: formatDateForDB(values.subscription_start_date),

    notes: values.notes?.trim() || "",

    is_frozen: false,
    frozen_days: 0,
    freeze_reason: "",
  };
}

//help in freeze the member

export function buildFreezeData(values, member) {
  const frozenDays = Number(values.frozen_days);

  const endDate = new Date(member.subscription_end_date);

  endDate.setDate(endDate.getDate() + frozenDays);

  return {
    is_frozen: true,

    frozen_days: frozenDays,

    freeze_reason: values.freeze_reason?.trim() || "",

    subscription_end_date: formatDateForDB(endDate),
  };
}

// for edit the member
export function buildUpdateMemberData(values, captainState, member) {
  const captain =
    captainState.find((c) => c.id === Number(values.captain)) ?? member;

  const subscriptionPrice = Number(
    values.subscription_price ?? member.subscription_price,
  );

  const paidAmount = Number(values.paid_amount ?? member.paid_amount);

  return {
    full_name: values.full_name ?? member.full_name,
    captain_name: captain.full_name,
    captain_id: captain.id,
    phone: values.phone ?? member.phone,
    age: Number(values.age ?? member.age) || null,
    notes: values.notes ?? member.notes,

    subscription_price: subscriptionPrice,
    paid_amount: paidAmount,
    remaining_amount: subscriptionPrice - paidAmount,

    subscription_start_date: values.subscription_start_date
      ? formatDateForDB(values.subscription_start_date)
      : member.subscription_start_date,

    subscription_end_date: values.subscription_end_date
      ? formatDateForDB(values.subscription_end_date)
      : member.subscription_end_date,
  };
}
