import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WebSocketComponent from "@/components/websocket";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div className="p-20 pl-[8rem] flex flex-col">
      <div className="">
        <WebSocketComponent session={session} />
      </div>
    </div>
  );
};

export default SettingsPage;
