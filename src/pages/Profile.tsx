
import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";
import { BottomNavbar } from "@/components/layout/BottomNavbar";

const Profile = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      if (error) throw error;

      toast({
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not sign out",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p>Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <header className="sticky top-0 bg-white z-40 p-4 border-b">
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>

      <main className="p-4 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input value={user.email} disabled />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <Button
          className="w-full"
          onClick={handleUpdateProfile}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default Profile;
