import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WebSocketComponent from "@/components/websocket";

const SettingsPage = async () => {
  const session = await auth();

 

 

  return (
    <div className="p-20 pl-[8rem] flex flex-col">
      {/* {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form> */}

      <div className="flex flex-row w-full justify-between items-center  ">
        <p className="text-2xl font-bold  ">Connected Users</p>
        <Button className="mr-[8rem] px-8 bg-[#fca063] text-black hover:text-white">
          Ping ALL
        </Button>
      </div>

      <div className="py-8">

      <Card className="w-[20rem]">
        <CardHeader className="font-bold">
            <p>Your Profile</p>
             
        </CardHeader>
        <CardContent>
            <p> {
                session?.user.name
            }</p>

            <p>
                {
                    session?.user.email
                }
            </p>
            
        </CardContent>
      </Card>

      <WebSocketComponent session={session}/>
      </div>
    </div>
  );
};

export default SettingsPage;
