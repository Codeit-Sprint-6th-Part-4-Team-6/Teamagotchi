import classNames from "classnames";
import Image from "next/image";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import Spinner from "@components/commons/Spinner";
import { useJoinTeam } from "@hooks/useJoinTeam";
import { validateImage } from "@utils/validateImage";

export default function JoinTeamPage() {
  const {
    groupInfo,
    isFetching,
    isPending,
    isDisabled,
    errorMessage,
    value,
    handleChange,
    handleSubmit,
  } = useJoinTeam();

  const classnames = classNames(
    "text-2xl font-medium lg:text-4xl",
    groupInfo || isFetching ? "mb-40" : "mb-24 md:mb-80"
  );

  return (
    <div className="flex w-full flex-col items-center px-16 pt-72 text-text-primary md:mx-auto md:w-460 md:px-0 md:pt-100 lg:pt-140">
      <h1 className={classnames}>팀 참여하기</h1>
      {isFetching ? (
        <Spinner size={32} color="primary" className="mb-40" />
      ) : (
        groupInfo && (
          <div className="mb-40 flex flex-col items-center gap-16">
            <div className="relative h-80 w-80 rounded-full lg:h-100 lg:w-100">
              <Image
                src={
                  groupInfo.image && validateImage(groupInfo.image)
                    ? groupInfo.image
                    : "icons/icon_member_large.svg"
                }
                alt="profile"
                fill
                className="rounded-full"
                priority
              />
            </div>
            <span>{groupInfo.name}</span>
            <div className="text-sm">
              {groupInfo.members[0].userName}님 외
              <span className="text-brand-primary"> {groupInfo.members.length - 1}</span>명이 속해
              있는 그룹입니다.
            </div>
          </div>
        )
      )}
      <form onSubmit={handleSubmit} className="w-full">
        <Label type="label" content="팀 링크" htmlFor="team-link" marginBottom={12} />
        <Input
          id="team-link"
          placeholder="팀 링크를 입력해주세요."
          className="mb-40"
          value={value}
          onChange={handleChange}
          errorMessage={errorMessage}
        />
        <Button
          type="submit"
          size="large"
          isPending={isPending}
          className="mb-24"
          disabled={isDisabled}
        >
          참여하기
        </Button>
      </form>
      <div className="text-md font-normal md:text-lg">
        공유받은 팀 링크를 입력해 참여할 수 있어요.
      </div>
    </div>
  );
}
