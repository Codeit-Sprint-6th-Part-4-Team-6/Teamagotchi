import ChangePassword from "@components/editUser/ChangePassword";
import DeleteAccount from "@components/editUser/DeleteAccount";
import EditUserForm from "@components/editUser/EditUserForm";

export default function EditUserPage() {
  return (
    <section className="relative mx-16 flex flex-col gap-24 pt-24 md:mx-auto md:w-744 lg:pt-40">
      <h2 className="text-xl">계정 설정</h2>
      <EditUserForm />
      <div className="flex items-center justify-between">
        <DeleteAccount />
        <ChangePassword />
      </div>
    </section>
  );
}
