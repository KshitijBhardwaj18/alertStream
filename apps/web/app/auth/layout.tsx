import TestUser from "@/components/test-users";


const AuthLayout = ({children} : {children : React.ReactNode}) => {

    return (
        <div className="h-full flex items-center justify-center ">
            {children}
            <div className="absolute bottom-0 left-0">
            <TestUser />
            </div>

        </div>
    );
}

export default AuthLayout;