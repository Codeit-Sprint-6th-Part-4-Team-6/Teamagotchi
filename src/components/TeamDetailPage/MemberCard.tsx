import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import NameTag from "@components/commons/NameTag";
import Popover from "@components/commons/Popover";
import { useModal } from "@hooks/useModal";
import { useToast } from "@hooks/useToast";
import { useAuthStore } from "@store/useAuthStore";
import { IconKebabLarge } from "@utils/icon";
import { deleteGroupMember } from "@api/groupApi";
import { DeleteGroupMemberModal } from "./TeamPageModal";

export default function MemberCard({
  memberId,
  name,
  email,
  image,
  onClick,
  role,
}: {
  memberId: number;
  name: string;
  email: string;
  image: string | null;
  onClick: () => void;
  role: string;
}) {
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const { teamId } = router.query;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuthStore();

  const deleteGroupMemberMutation = useMutation({
    mutationFn: () => deleteGroupMember(Number(teamId), Number(memberId)),
    onSuccess: () => {
      toast("success", "해당 멤버가 추방되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["team", teamId] });
    },
  });

  const deleteOnConfirm = () => {
    deleteGroupMemberMutation.mutate();
    closeModal();
  };

  const handleOpenMemberDeleteModal = () => {
    openModal("DeleteGroupMemberModal", DeleteGroupMemberModal, { onConfirm: deleteOnConfirm });
  };

  return (
    <div className="flex h-73 items-center rounded-16 bg-background-secondary px-24 py-2 transition-all">
      <div className="flex w-full items-center justify-between">
        <NameTag type="email" name={name} email={email} image={image} />
        <Popover>
          <Popover.Toggle>
            <IconKebabLarge className="rounded-5 transition-all hover:bg-background-tertiary" />
          </Popover.Toggle>
          <Popover.Wrapper popDirection="left">
            <Popover.Item onClick={onClick}>정보보기</Popover.Item>
            {role === "ADMIN" && user?.email !== email ? (
              <Popover.Item onClick={handleOpenMemberDeleteModal}>추방하기</Popover.Item>
            ) : null}
          </Popover.Wrapper>
        </Popover>
      </div>
    </div>
  );
}
