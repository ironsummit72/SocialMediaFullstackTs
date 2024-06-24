import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcomponents/ui/tabs";
import LoginUsername from "@/pages/Login/LoginUsername";
import LoginEmail from "./LoginEmail";
export default function Login() {
  document.title = "Login";
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Username</TabsTrigger>
          <TabsTrigger value="password">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <LoginUsername />
        </TabsContent>
        <TabsContent value="password">
          <LoginEmail />
        </TabsContent>
      </Tabs>
    </div>
  );
}
