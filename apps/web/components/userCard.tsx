import { FaMailBulk } from "react-icons/fa";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";


interface userCardProps {
    id: string;
    name: string;
    email: string;
    ping: (id:string) => void;
  }


const UserCard: React.FC<userCardProps> = ({ id, email, name,ping }) => {
  
    return (
      <Card className="w-[20rem] flex items-center justify-center flex-col p-5 ">
        
        <CardContent>
          <p className="font-[500] text-xl text-black"> {name}</p>
  
          <p className="f text-lg text-black" >{email}</p>
        </CardContent>
        <Button
          onClick={() => ping(id)}
          className="bg-[#fca063] text-black hover:text-white px-10 "
        >
          ping
        </Button>
      </Card>
    );
  };
  
export default UserCard;
  