import { signIn, auth } from "@/auth";

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
          <button>Signin</button>
        </form>
      </div>
    );

  return <div>{JSON.stringify(session, null, 2)}</div>;
}
