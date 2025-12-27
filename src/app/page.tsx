import { auth } from "@/auth";
import { connectTODatabase } from "@/lib/db";
import User from "@/models/user.model";
import EditRoleMobile from "../components/EditRoleMobile";
import Navbar from "../components/Navbar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import RiderDashboard from "../components/RiderDashboard";

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
      
      {user.role === "user" ? (
        <UserDashboard />
      ) : user.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <RiderDashboard />
      )}
    </div>
  );
}
