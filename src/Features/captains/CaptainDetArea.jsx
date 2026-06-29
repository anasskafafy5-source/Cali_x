import { useParams } from "react-router-dom";
import CaptainInfoCart from "./CaptainInfoCart";
import { useGetCaptainById } from "./useGetCaptainById";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import AddMemberButton from "../members/AddMemberButton";
import { useGetCaptainMembers } from "./useGetCaptainMembers";
import MemberCard from "../members/MemberCard";

function CaptainDetArea() {
  const { id } = useParams();

  const { captain, isPending, error } = useGetCaptainById(id);

  const { captainMembers, isLoading, error: mError } = useGetCaptainMembers(id);

  if (isPending || isLoading) return <Spinner />;
  if (error || mError) return <Error />;
  return (
    <div className="mt-5">
      {" "}
      <CaptainInfoCart captain={captain} />
      {/* Heading for member in captian */}
      <div className="mt-4 mb-2 ml-1 flex items-center justify-between rounded-3xl bg-white px-3 py-3 shadow-sm">
        <h4 className="text-xl font-bold">
          أعضاء المدرب ({captain?.members_count})
        </h4>
        <AddMemberButton />
      </div>
      {/* Members Area */}
      <div className="mt-5 grid grid-cols-1 gap-5 pb-4 md:grid-cols-2 xl:grid-cols-3 ">
        {captainMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default CaptainDetArea;
