import SettingsForm from "../Features/settings/SettingsForm";

function Settings() {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl font-bold sm:text-2xl">الإعدادات</h3>
        <p className="text-sm font-semibold text-stone-500 sm:text-[16px]">
          {" "}
          إعدادات النظام والصالة
        </p>
      </div>
      <SettingsForm />
    </>
  );
}

export default Settings;
