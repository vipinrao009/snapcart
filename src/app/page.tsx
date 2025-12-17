import { auth } from "@/auth";
import { connectTODatabase } from "@/lib/db";
import User from "@/models/user.model";
import EditRoleMobile from "./components/EditRoleMobile";

export default async function Home() {
  await connectTODatabase();
  const session = await auth();
  const user = await User.findById(session?.user?.id);

  const inComplete =
    !user.mobile || !user.role || (!user.mobile && user.role == "user");

  if (inComplete) {
    return <EditRoleMobile />;
  }
  console.log(session);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Hello vipin</h1>
    </div>
  );
}
