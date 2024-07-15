import { Card, CardHeader, CardContent } from "./ui/card";

const TestUser = () => {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-bold">Test Users</h1>
      </CardHeader>

      <CardContent className="">
        <div className="shadow-xl ">
            <p className="font-bold ">Email</p>
          <p className="font-semibold">Kshitij.ghss@gmail.com</p>
          <p className="font-semibold">tothemoon202154@outlook.com</p>
          <p className="font-semibold">haryanakaladka54@gmail.com</p>
          <p className="font-semibold">bhardwajkshitij19@gmail.com</p>
          <p className="font-semibold">bhardwajkshitij20@gmail.com</p>
        </div>

        <div className="shadow-xl pt-3 ">
          <p className="font-bold">Password</p>
          <p className="font-semibold">123456</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestUser;
