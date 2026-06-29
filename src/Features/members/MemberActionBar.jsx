import DeleteMember from "./MEMBERS_ACTIONS/DeleteMember";
import EditMemberData from "./MEMBERS_ACTIONS/EditMemberData";
import HasRemaining from "./MEMBERS_ACTIONS/HasRemaining";
import Member_renewal from "./MEMBERS_ACTIONS/Member_renewal";
import MemberForzen from "./MEMBERS_ACTIONS/MemberForzen";
import MemberViewDetails from "./MEMBERS_ACTIONS/MemberViewDetails";

function MemberActionBar({ member, inDetailsPage = false }) {
  return (
    <div className="border-t pt-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-600">الإجراءات</h3>

      <div className="grid max-w-3xl grid-cols-6 gap-1">
        {!inDetailsPage && <MemberViewDetails id={member.id} />}
        {member.has_remaining && <HasRemaining member={member} />}

        <Member_renewal member={member} />

        <MemberForzen member={member} />

        <EditMemberData member={member} />

        <DeleteMember member={member} inDetailsPage={inDetailsPage} />
      </div>
    </div>
  );
}

export default MemberActionBar;
