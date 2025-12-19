import { auth } from "@/auth";
import { connectTODatabase } from "@/lib/db";
import User from "@/models/user.model";
import EditRoleMobile from "./components/EditRoleMobile";
import Navbar from "./components/Navbar";

export default async function Home() {
  await connectTODatabase();
  const session = await auth();
  const user = await User.findById(session?.user?.id).lean();

  const inComplete =
    !user.mobile || !user.role || (!user.mobile && user.role == "user");

  if (inComplete) {
    return <EditRoleMobile />;
  }
  console.log(session);
  const planUser = JSON.parse(JSON.stringify(user)); // ye long process hai isko .lean() ke throgh kar sakte hai
  return (
    <div>
      <Navbar user={planUser} />
    </div>
  );
}
