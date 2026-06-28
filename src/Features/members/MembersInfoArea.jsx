import { useGetAllMemberViews } from "./useGetAllMemberViews";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import MemberCard from "./MemberCard";

function MembersInfoArea() {
  const { membersViews, isPending: loading, error } = useGetAllMemberViews();

  if (loading) return <Spinner />;
  if (error) return <Error />;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {membersViews.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

export default MembersInfoArea;
