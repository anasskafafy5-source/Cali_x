import { useParams } from "react-router-dom";
import MemberDetailsHeader from "./MemberDetailsHeader";
import { useGetMemberById } from "./useGetMemberById";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import MemberPersonalInfo from "./MemberPersonalInfo";
import MemberSubscriptionInfo from "./MemberSubscriptionInfo";
import MemberNotes from "./MemberNotes";
import MemberFreezeInfo from "./MemberFreezeInfo";

function DetailsMemberArea() {
  const { id } = useParams();
  const { memberData, isLoading, error } = useGetMemberById(Number(id));
  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return (
    <div className="mt-2.5 p-1.5">
      <MemberDetailsHeader member={memberData} />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MemberPersonalInfo member={memberData} />
        <MemberSubscriptionInfo member={memberData} />
        <MemberNotes member={memberData} />
        <MemberFreezeInfo member={memberData} />
      </div>
    </div>
  );
}

export default DetailsMemberArea;
