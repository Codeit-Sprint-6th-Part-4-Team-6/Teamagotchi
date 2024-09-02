import { Member } from "@coworkers-types";
import TextButton from "@components/commons/Button/TextButton";
import Label from "@components/commons/Label";
import { useModal } from "@hooks/useModal";
import MemberCard from "./MemberCard";
import { InviteMemberModal, UserInfoModal } from "./TeamPageModal";

export default function MembersSection({
  members = [],
  role,
}: {
  members: Member[];
  role: string;
}) {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal("InviteMemberModal", InviteMemberModal);
  };
  const handleUserOpenModal = (name: string, email: string, image: string | null) => {
    openModal("UserInfoModal", UserInfoModal, { name, email, image });
  };

  return (
    <section className="pb-60">
      <div className="mb-20 flex justify-between">
        <div className="flex items-center gap-5 text-nowrap">
          <Label content="멤버" />
          <span className="text-lg font-normal text-text-default">{`(${members.length}명)`}</span>
        </div>
        {role === "ADMIN" ? (
          <TextButton className="text-nowrap" onClick={handleOpenModal} icon="plus">
            새로운 멤버 초대하기
          </TextButton>
        ) : null}
      </div>
      <div className="grid grid-cols-2 gap-15 md:grid-cols-3">
        {members.map((member) => (
          <MemberCard
            key={`member-${member.userId}`}
            memberId={member.userId}
            name={member.userName}
            email={member.userEmail}
            image={member.userImage}
            onClick={() => {
              handleUserOpenModal(member.userName, member.userEmail, member.userImage);
            }}
            curUserRole={role}
            role={member.role}
          />
        ))}
      </div>
    </section>
  );
}
