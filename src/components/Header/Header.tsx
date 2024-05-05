import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, auth } from "@/auth";
import { Button } from "@/components/ui/button";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="bg-gray-800 py-4">
      <div className="container flex justify-between items-center">
        <div className="text-white font-bold">Lab Scheduler</div>
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={
                    session.user.image ||
                    "https://static.mercdn.net/images/member_photo_noimage_thumb.png"
                  }
                  alt={session.user.name || "User"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Button>SignOut</Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button>Signin</Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
