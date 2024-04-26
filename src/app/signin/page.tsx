import { signIn, auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const session = await auth();
  if (!session?.user)
    return (
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
    );

  return <div>{JSON.stringify(session, null, 2)}</div>;
}
