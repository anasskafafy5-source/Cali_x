import PageHeader from "../ui/PageHeader";
import AddMemberButton from "../Features/members/AddMemberButton";
import MembersMainArea from "../Features/members/MembersMainArea";
import { useGetAllMemberViews } from "../Features/members/useGetAllMemberViews";
import Spinner from "../ui/Spinner";

function Members() {
  const { members_count, isPending } = useGetAllMemberViews();

  if (isPending) return <Spinner />;
  return (
    <>
      <PageHeader>
        <div>
          <h3 className="text-xl font-bold sm:text-2xl">إدارة الأعضاء</h3>
          <span className="mt-1 block text-[15px] font-semibold text-stone-500">
            <span className="text-xl font-semibold text-orange-500">
              {members_count ?? ""}
            </span>{" "}
            أعضاء مسجلين
          </span>
        </div>
        <AddMemberButton />
      </PageHeader>
      <MembersMainArea />
    </>
  );
}

export default Members;
